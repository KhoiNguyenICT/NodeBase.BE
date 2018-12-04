import { BaseModel, schemaOptions } from './../../shared/base.model';
import { prop, ModelType } from 'typegoose';
import { AccountRole } from './account-role.enum';

export class Account extends BaseModel<Account> {
    @prop({
        required: [true, 'Username is required'],
        minlength: [6, 'Must be at least 6 characters'],
        unique: true,
    })
    username: string;

    @prop({
        required: [true, 'Password is required'],
        minlength: [6, 'Must be at least 6 characters'],
    })
    password: string;

    @prop({ enum: AccountRole, default: AccountRole.User })
    role?: AccountRole;

    @prop()
    firstName?: string;

    @prop()
    lastName?: string;

    @prop()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    static get model(): ModelType<Account> {
        return new Account().getModelForClass(Account, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }
}