import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as {
      error?: string;
      message?: string | string[];
      statusCode?: number;
    };

    response.status(status).json({
      success: false,
      message: error.message || '요청 처리 중 오류가 발생했습니다.',
      data: null,
    });
  }
}
