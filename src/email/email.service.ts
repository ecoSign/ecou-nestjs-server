import { ConfigType } from '@nestjs/config';
import Mail from 'nodemailer/lib/mailer';
import { Inject, Injectable } from '@nestjs/common';
import emailConfig from '../config/emailConfig';
import * as nodeemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private readonly transporter: Mail;

  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>
  ) {
    this.transporter = nodeemailer.createTransport({
      host: 'smtp.gmail.com',
      // service: 'Gmail' || config.service,
      port: 465,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
      secure: true,
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string
  ) {
    const baseUrl = this.config.baseUrl;
    // const baseUrl = `http://localhost:${process.env.PORT}`;

    const url = `${baseUrl}/v1/users/email-verify?signupVerifyToken=${signupVerifyToken}`;
    // console.log('trans', this.transporter);

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
       가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
