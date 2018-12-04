import { BaseService } from './../shared/base.service';
import { AccountDto } from './models/dto-models/account-dto.model';
import { AuthService } from './../shared/auth/auth.service';
import { JwtPayload } from './../shared/auth/jwt-payload';
import { LoginResponseDto } from './models/dto-models/login-response-dto.model';
import { LoginDto } from './models/dto-models/login-dto.model';
import { MapperService } from './../shared/mapper/mapper.service';
import { ModelType } from 'typegoose';
import { Account } from './models/account.model';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from './models/dto-models/register-dto.model';
import { genSalt, hash, compare } from 'bcryptjs';
import { HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';

export class AccountService extends BaseService<Account> {
    constructor(
        @InjectModel(Account.modelName)
        private readonly _accountModel: ModelType<Account>,
        private readonly _mapperService: MapperService,
        @Inject(forwardRef(() => AuthService))
        readonly _authService: AuthService,
    ) {
        super();
        this._model = _accountModel;
        this._mapper = _mapperService.mapper;
    }

    async register(dto: RegisterDto) {
        const { username, password, firstName, lastName } = dto;

        const newUser = new this._model();
        newUser.username = username.trim().toLowerCase();
        newUser.firstName = firstName;
        newUser.lastName = lastName;

        const salt = await genSalt(10);
        newUser.password = await hash(password, salt);

        try {
            const result = await this.create(newUser);
            return result.toJSON() as Account;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(dto: LoginDto): Promise<LoginResponseDto> {
        const { username, password } = dto;

        const user = await this.findOne({ username });

        if (!user) {
            throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND);
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
        }

        const payload: JwtPayload = {
            username: user.username,
            role: user.role,
        };

        const token = await this._authService.signPayload(payload);
        const accountDto: AccountDto = await this.map<AccountDto>(user.toJSON());

        return {
            token,
            account: accountDto,
        };
    }
}