import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

interface ExceptionResponse {
    message: string
    code: string
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()
        const { code, message, ...rest } =
            exception.getResponse() as ExceptionResponse
        response.status(status).json({
            code: code,
            statusCode: status || HttpStatus.INTERNAL_SERVER_ERROR,
            info: {
                message: message,
                ...rest,
            },
            path: request.url,
        })
    }
}
