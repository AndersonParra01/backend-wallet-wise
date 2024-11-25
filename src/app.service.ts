import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAdress(): string {
    return '1234 Main Street, City, State, Zip';
  }

  getNumber(): number {
    return 12345;
  }
}
