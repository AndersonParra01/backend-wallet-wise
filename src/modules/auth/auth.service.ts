import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { HashPasswordService } from '@shared/service/hash-password.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseService } from '@shared/service/response.service';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    @Inject(forwardRef(() => ResponseService))
    private readonly responseService: ResponseService,

    @Inject(forwardRef(() => HashPasswordService))
    private readonly hashPasswordService: HashPasswordService,

    private readonly jwt: JwtService,
  ) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    const isPasswordValid = await this.hashPasswordService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(login: LoginDto) {
    try {
      const user = await this.validateUser(login.email, login.password);
      console.log('VALIDATE', user);
      const payload = { sub: user.id, email: user.email };
      return {
        accessToken: this.jwt.sign(payload),
      };
    } catch (error) {
      this.responseService.handlerError(error);
    }
  }
}
