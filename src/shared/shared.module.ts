import { AuthService } from './auth/auth.service';
import { AccountModule } from './../account/account.module';
import { Module, Global } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { MapperService } from './mapper/mapper.service';
import { JwtStrategyService } from './auth/strategies/jwt-strategy/jwt-strategy.service';

@Global()
@Module({
  providers: [ConfigurationService, MapperService, AuthService, JwtStrategyService],
  exports: [ConfigurationService, MapperService, AuthService],
  imports: [AccountModule],
})
export class SharedModule {}
