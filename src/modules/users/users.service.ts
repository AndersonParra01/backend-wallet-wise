import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseService } from '@shared/service/response.service';
import { ResponseDto } from '@shared/dto/response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => ResponseService))
    private readonly response: ResponseService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<ResponseDto<User>> {
    try {
      console.log('SERVICE', createUserDto);
      const newUser = await this.userRepository.save(createUserDto);
      console.log('CREADO POST', createUserDto);

      return this.response.handlerSuccess(newUser);
    } catch (error) {
      console.log(error);
      this.response.handlerError(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      this.response.handlerError(error);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      // Manejo de errores inesperados
      this.response.handlerError(error);
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseDto<UpdateUserDto>> {
    try {
      const userById = await this.findOne(id);
      if (!userById) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      const userUpdate: any = await this.userRepository.update(
        userById,
        updateUserDto,
      );
      return this.response.handlerSuccess(userUpdate);
    } catch (error) {
      this.response.handlerError(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getUserByEmailAndPassword(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      /* if (!(await user.comparePassword(password))) {
        throw new BadRequestException('Invalid password');
      } */
      return user;
    } catch (error) {
      this.response.handlerError(error);
    }
  }
}
