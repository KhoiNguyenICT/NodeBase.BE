import { AccountDto } from './account-dto.model';

export class LoginResponseDto {
    token: string;
    account: AccountDto;
}