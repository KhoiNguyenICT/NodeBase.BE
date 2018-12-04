import { LoginDto } from './models/dto-models/login-dto.model';
import { LoginResponseDto } from './models/dto-models/login-response-dto.model';
import { Account } from './models/account.model';
import { AccountDto } from './models/dto-models/account-dto.model';
import { AccountService } from './account.service';
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id.helper';
import { RegisterDto } from './models/dto-models/register-dto.model';

@Controller('account')
@ApiUseTags(Account.modelName)
export class AccountController {
    constructor(private readonly _accountService: AccountService) {}

    @Post('register')
    @ApiResponse({ status: HttpStatus.CREATED, type: AccountDto })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Account.modelName, 'Register'))
    async register(@Body() registerDto: RegisterDto): Promise<AccountDto> {
        const { username, password } = registerDto;

        if (!username) {
            throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
        }

        if (!password) {
            throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
        }

        let exist;
        try {
            exist = await this._accountService.findOne({ username });
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (exist) {
            throw new HttpException(`${username} exists`, HttpStatus.BAD_REQUEST);
        }

        const newAccount = await this._accountService.register(registerDto);
        return this._accountService.map<AccountDto>(newAccount);
    }

    @Post('login')
    @ApiResponse({ status: HttpStatus.CREATED, type: LoginResponseDto })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Account.modelName, 'Login'))
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        const fields = Object.keys(loginDto);
        fields.forEach(field => {
            if (!loginDto[field]) {
                throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
            }
        });

        return this._accountService.login(loginDto);
    }
}