import { Module } from '@nestjs/common';
import { ResponseService } from './service/response.service';

@Module({
  providers: [ResponseService],
  exports: [ResponseService],
})
export class SharedModule {}
