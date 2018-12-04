import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './models/account.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.modelName, schema: Account.model.schema }]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule { }
