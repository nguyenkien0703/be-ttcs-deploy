import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@app/queries'

export const UserScope = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        return request.user as User
    },
)
