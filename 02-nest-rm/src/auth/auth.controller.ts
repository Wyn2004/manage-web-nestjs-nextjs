import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from './decorator/auth.decorator';
import { RegisterDTO } from './dto/register-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  signIn(@Request() req: any) {
    return this.authService.signIn(req.user);
  }

  @Public()
  @Post('register')
  signUp(@Body() body: RegisterDTO) {
    return this.authService.signUp(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('mail')
  testMail() {
    try {
      this.mailerService.sendMail({
        to: 'testmailthang@gmail.com',
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest MailerModule ✔',
        text: 'welcome',
        html: '<b>welcome</b>',
      });
      return 'Email sent successfully';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
