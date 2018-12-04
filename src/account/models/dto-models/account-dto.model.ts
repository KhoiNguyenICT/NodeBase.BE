import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from '../../../shared/base.model';
import { AccountRole } from '../account-role.enum';
import { EnumToArray } from '../../../shared/utilities/enum-to-array';

export class AccountDto extends BaseDto {
    @ApiModelProperty()
    username: string;

    @ApiModelPropertyOptional()
    firstName?: string;

    @ApiModelPropertyOptional()
    lastName?: string;

    @ApiModelPropertyOptional()
    fullName?: string;

    @ApiModelPropertyOptional({ enum: EnumToArray(AccountRole) })
    role?: AccountRole;
}