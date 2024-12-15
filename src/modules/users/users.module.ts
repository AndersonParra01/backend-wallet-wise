import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@shared/database/database.module';
import { User } from '../../models/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DatabaseModule.registerSchema('Users', User)],
  exports: [UsersService],
})
export class UsersModule {}
