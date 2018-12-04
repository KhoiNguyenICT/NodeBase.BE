import { Account } from '../../account/models/account.model';
import { AccountService } from './../../account/account.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { sign, SignOptions } from 'jsonwebtoken';
import { Configuration } from '../configuration/configuration.enum';
import { ConfigurationService } from '../configuration/configuration.service';
import { JwtPayload } from './jwt-payload';
import { InstanceType } from 'typegoose';

@Injectable()
export class AuthService {
    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;

    constructor(
        @Inject(forwardRef(() => AccountService))
        readonly _accountService: AccountService,
        private readonly _configurationService: ConfigurationService,
    ) {
        this.jwtOptions = { expiresIn: '12h' };
        this.jwtKey = _configurationService.get(Configuration.JWT_KEY);
    }

    async signPayload(payload: JwtPayload): Promise<string> {
        return sign(payload, this.jwtKey, this.jwtOptions);
    }

    async validatePayload(payload: JwtPayload): Promise<InstanceType<Account>> {
        return this._accountService.findOne({ username: payload.username.toLowerCase() });
    }
}