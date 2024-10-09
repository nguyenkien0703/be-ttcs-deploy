import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common'
import { httpErrors } from '@app/shares/exeption-filter'
import { verifyAccessJWT } from '@app/shares/utils/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest()
            const bearerHeader = request.headers.authorization
            if (!bearerHeader) {
                throw new HttpException(
                    httpErrors.UNAUTHORIZED,
                    HttpStatus.UNAUTHORIZED,
                )
            }
            const bearer = bearerHeader.split(' ')
            const token = bearer[1]
            const payload = await verifyAccessJWT(token)

            if (payload) {
                request.user = payload
                return true
            }
            return false
        } catch (error) {
            throw new HttpException(
                httpErrors.UNAUTHORIZED,
                HttpStatus.UNAUTHORIZED,
            )
        }
    }
}
