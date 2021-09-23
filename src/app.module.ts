import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdDbModule } from './common/common.module';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [FeaturesModule, ProdDbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
