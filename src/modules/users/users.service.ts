import {
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
import { UserResponseDto } from './dto/user-response.dto';
import { HashPasswordService } from '@shared/service/hash-password.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => ResponseService))
    private readonly response: ResponseService,

    @Inject(forwardRef(() => HashPasswordService))
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  private mapToUserResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  async create(
    createUserDto: CreateUserDto,
  ): Promise<ResponseDto<UserResponseDto>> {
    try {
      console.log('SERVICE', createUserDto);
      const hash = await this.hashPasswordService.hashPassword(
        createUserDto.password,
      );

      const createDataUser = this.userRepository.create({
        ...createUserDto,
        password: hash,
      });
      console.log(createDataUser);
      const newUser = await this.userRepository.save(createDataUser);

      console.log('CREADO POST', createUserDto);

      return this.response.handlerSuccess(this.mapToUserResponse(newUser));
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userById = await this.findOne(id);
      if (!userById) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      const updateUser = this.userRepository.merge(userById, updateUserDto);
      console.log('UPDATE', updateUser);
      return await this.userRepository.save(updateUser);
      /*  return this.response.handlerSuccess(userUpdate); */
    } catch (error) {
      this.response.handlerError(error);
    }
  }

  async remove(id: number) {
    try {
      const userFindById = await this.findOne(id);
      if (!userFindById) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return await this.userRepository.delete(id);
    } catch (error) {
      this.response.handlerError(error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found by email ' + email);
      }

      return user;
    } catch (error) {
      this.response.handlerError(error);
    }
  }
}
