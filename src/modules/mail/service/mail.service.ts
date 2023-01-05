import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendWelcome(email: string, name: string) {
        const url = `${process.env.URL}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Seja bem vindo ao LookBook!',
            template: './welcome',
            context: {
                name: name,
                url,
            },
        });
    }

    async sendRecoverPassword(email: string, name: string, token: string) {
        const url = `${process.env.URL}/auth/recover/${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Opa, vamos redefinir sua senha!',
            template: './resetPassword',
            context: {
                name: name,
                url,
            },
        });
    }

    async sendRecoveredPassword(email: string, name: string) {
        const url = `${process.env.URL}/login`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Sucesso, sua senha foi redefinida!',
            template: './recoveredPassword',
            context: {
                name: name,
                url,
            },
        });
    }
}
