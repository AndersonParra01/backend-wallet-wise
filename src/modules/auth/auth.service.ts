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
import { TokenDto } from './dto/token.dto';
import { User } from '@models/user.entity';
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

  async login(login: LoginDto): Promise<TokenDto> {
    try {
      const user = await this.validateUser(login.email, login.password);
      const generateAccessToken = this.generateAccessToken(user);
      const generateRefreshToken = this.generateRefreshToken(user);

      return {
        access_Token: generateAccessToken,
        refresh_token: generateRefreshToken,
      };
    } catch (error) {
      this.responseService.handlerError(error);
    }
  }

  generateAccessToken(user: User): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwt.sign(payload, { expiresIn: '1m' });
  }

  generateRefreshToken(user: User): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwt.sign(payload, { expiresIn: '2m' });
  }

  async refreshAccessToken(refreshToken: string): Promise<TokenDto> {
    try {
      const payload = this.jwt.verify(refreshToken);
      const user = await this.userService.findOne(payload.userId);

      const userWhitoutPassword = { ...user.data, password: undefined };

      const accessToken = this.generateAccessToken(userWhitoutPassword);
      const newRefreshToken = this.generateRefreshToken(userWhitoutPassword);

      return { access_Token: accessToken, refresh_token: newRefreshToken };
    } catch (error) {
      this.responseService.handlerError(error);
    }
  }
}
