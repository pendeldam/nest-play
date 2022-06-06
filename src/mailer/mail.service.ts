import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  public async send(recipient: string, code: string) {
    this.mailerService.sendMail({
      to: recipient,
      subject: 'Confirmation code',
      template: 'confirmation',
      context: {
        code,
      },
    });
  }
}
