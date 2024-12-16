import { ResponseDto } from './../dto/response.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  handlerSuccess<T>(data: T): ResponseDto<T> {
    console.log('handler data', data);
    const message: string = 'Transacción realizada correctamente';
    return ResponseDto.success<T>(200, 'OK', message, data);
  }

  handlerError(error: any): never {
    console.error('handler error', {
      Message: error.message,
      Code: error.code,
      Detail: error.detail,
      Constraint: error.constraint,
    });
    console.log(error);

    let code: number;
    let message: string;
    let detail: string;

    // Manejo dinámico según propiedades del error
    if (error.name === 'QueryFailedError') {
      if (error.detail?.includes('already exists')) {
        code = HttpStatus.BAD_REQUEST;
        message = error.message;
        detail = error.detail;
      } else if (error.constraint) {
        code = HttpStatus.BAD_REQUEST;
        message = `${error.message} ${error.constraint}`;
        detail = error.detail;
      } else {
        code = HttpStatus.INTERNAL_SERVER_ERROR;
        message = error.message;
        detail = error.detail;
      }
    } else if (error.status) {
      // Errores de validación personalizados
      code = error.status;
      message = error.message;
      detail = error.detail;
    } else if (error instanceof Error) {
      // Errores generales
      code = HttpStatus.INTERNAL_SERVER_ERROR;
      message = error.message || 'An unexpected error occurred.';
    } else {
      // Fallback para errores desconocidos
      code = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Unknown error.';
      detail = error.message;
    }

    // Lanzar la excepción correctamente
    throw new HttpException(
      { code: code, message, detail: detail || null || error.error },
      code,
    );
  }
}
