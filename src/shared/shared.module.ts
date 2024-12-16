import { Module } from '@nestjs/common';
import { ResponseService } from './service/response.service';
import { HashPasswordService } from './service/hash-password.service';

@Module({
  providers: [ResponseService, HashPasswordService],
  exports: [ResponseService, HashPasswordService],
})
export class SharedModule {}
