import { AccountRole } from './../../account/models/account-role.enum';

export interface JwtPayload {
    username: string
    role: AccountRole
    iat?: Date
}