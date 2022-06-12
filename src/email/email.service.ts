import Mail from 'nodemailer/lib/mailer';
import * as nodeemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodeemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string
  ) {
    const baseUrl = `http://localhost:${process.env.PORT}`;

    const url = `${baseUrl}/v1/users/email-verify?signupVerifyToken=${signupVerifyToken}`;
    console.log('trans', this.transporter);
    
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
