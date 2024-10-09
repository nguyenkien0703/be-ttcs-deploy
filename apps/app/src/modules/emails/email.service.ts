import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { User } from '@app/queries'
import { LaptopResponseData } from '../laptop/laptop.interface'
import configuration from '@app/shares/config/configuration'
import { baseUrlFe } from '@app/shares/utils/base-url-fe'

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmailCreatedOrderSuccessfully(
        user: User,
        laptops: LaptopResponseData[],
        totalAmount: number,
    ) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Create a successful order',
            template: './send-info-create-order',
            context: {
                username: user.name,
                totalAmount: totalAmount,
                // orderedComputers: laptops,
            },
        })
    }

    async sendEmailConfirmResetPassword(user: User) {
        const resetPasswordToken = user.resetPasswordToken,
            emailUser = user.email,
            fePort = configuration().fe.port,
            ipAddress = configuration().fe.ipAddress,
            baseUrl = baseUrlFe(fePort, ipAddress)

        const resetLink = `${baseUrl}/reset-password?token=${resetPasswordToken}`
        if (!emailUser) {
            console.log('koo co email')
            return
        }
        await this.mailerService.sendMail({
            to: emailUser,
            subject: 'Forgotten Password',
            template: './send-reset-password',
            context: {
                email: emailUser,
                username: user.name,
                resetLink: resetLink,
            },
        })
    }
}
