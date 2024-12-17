import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
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

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
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
      const payload = { sub: user.id, email: user.email };
      return {
        access_Token: this.jwt.sign(payload),
      };
    } catch (error) {
      this.responseService.handlerError(error);
    }
  }
}
