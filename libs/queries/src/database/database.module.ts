import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {
    Comment,
    Evalution,
    Laptop,
    Order,
    OrderDetail,
    Role,
    User,
} from '@app/queries/entities'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'mysql',
                    host: configService.get<string>('database.host'),
                    port: configService.get<number>('database.port'),
                    username: configService.get<string>('database.user'),
                    password: configService.get<string>('database.password'),
                    database: configService.get<string>('database.name'),
                    entities: [
                        Comment,
                        Evalution,
                        Laptop,
                        Order,
                        OrderDetail,
                        Role,
                        User,
                    ],
                    timezone: 'Z',
                    synchronize: configService.get('database.synchronize'),
                    debug: false,
                    logging: configService.get('database.logging'),
                }
            },
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
