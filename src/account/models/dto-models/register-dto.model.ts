import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { LoginDto } from "./login-dto.model";

export class RegisterDto extends LoginDto {
    @ApiModelPropertyOptional()
    firstName?: string

    @ApiModelPropertyOptional()
    lastName?: string
}