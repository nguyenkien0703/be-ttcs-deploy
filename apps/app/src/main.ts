import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { ConfigService } from '@nestjs/config'
import { ResponseTransformInterceptor } from '@app/shares/interceptors/response.interceptor'
import { Logger, ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from '@app/shares/exeption-filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { hashPassword } from '@app/shares/utils/bcrypt'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const config = app.get<ConfigService>(ConfigService)
    const globalPrefix = config.get('api.prefix')
    app.enableCors()
    app.setGlobalPrefix(globalPrefix)
    app.useGlobalInterceptors(new ResponseTransformInterceptor())
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    )
    app.useGlobalFilters(new HttpExceptionFilter())

    // app.useGlobalGuards(new JwtAuthGuard());
    // app.useGlobalGuards(new RoleGuard(new Reflector()));

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Cocokitene API docs')
        .setDescription('Cocokitene API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
    })

    const port = config.get('api.port')
    console.log(await hashPassword('nguyenkien'))
    await app.listen(port)
    Logger.log(`🚀 Api application is running on: ${await app.getUrl()}`)
}
bootstrap()
