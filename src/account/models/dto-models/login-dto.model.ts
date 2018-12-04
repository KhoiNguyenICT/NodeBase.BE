import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiModelProperty()
    username: string

    @ApiModelProperty()
    password: string
}