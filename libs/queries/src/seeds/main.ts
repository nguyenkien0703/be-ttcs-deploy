import { NestFactory } from '@nestjs/core'
import { Seeder } from '@app/queries/seeds/seeder'
import { SeederModule } from '@app/queries/seeds/seeder.module'

async function bootstrap() {
    const appContext = await NestFactory.createApplicationContext(SeederModule)
    const seeder = appContext.get(Seeder)
    await seeder.seed()
}

bootstrap()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.error('Error occurred:', error) // In ra lỗi ở đây
        process.exit(1)
    })
