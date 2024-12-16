// response.dto.ts
export class ResponseDto<T> {
  code: number;
  status: string;
  message: string;
  data?: T;

  constructor(code: number, status: string, message: string, data?: T) {
    this.code = code;
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static success<T>(
    code: number = 200,
    status: string = 'OK',
    message: string = 'Transacción realizada correctamente',
    data?: T,
  ): ResponseDto<T> {
    return new ResponseDto(code, status, message, data);
  }

  static error<T>(
    code: number,
    message: string = 'Ocurrió un error inesperado',
    data?: T,
  ): ResponseDto<T> {
    return new ResponseDto(code, 'Error', message, data);
  }
}
