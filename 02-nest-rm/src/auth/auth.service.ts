import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import mongoose from 'mongoose';
import { LoginDTO } from './dto/login-auth.dto';
import { comparePassword } from '@/helpers/utils';
import { JwtService } from '@nestjs/jwt';
import { access, stat } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const isCheckedPassword = await comparePassword(pass, user.password);
    if (!user || !isCheckedPassword) {
      return null;
    }
    return user;
  }

  async signIn(user: any): Promise<any> {
    try {
      const payload = {
        sub: user._id,
        email: user.email,
        role: user.role,
      };
      const access_token = this.jwtService.sign(payload);
      return {
        message: 'Login successfully',
        access_token: `Bearer ${access_token}`,
      };
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestException('User not found');
      }
      throw error;
    }
  }
}
