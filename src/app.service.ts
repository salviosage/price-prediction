import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello there!, welcome to the SMART LOGISTICS PRICING MODEL SAAS';
  }
}
