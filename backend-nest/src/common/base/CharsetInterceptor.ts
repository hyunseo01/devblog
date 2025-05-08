import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class CharsetInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    return next.handle();
  }
}
