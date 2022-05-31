import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { VerificationService } from '../verification/verification.service';
import { VerificationData, VerificationCodeTTL } from '../verification/verification.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private verificationService: VerificationService,
  ) {}

  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.userService.findUserByLogin(login);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async loginUser(id: number) {
    const CODE = '1234';
    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new NotFoundException();
    }

    const token = this.jwtService.sign({ id });
    const { code } = await this.verificationService.createCode(user, CODE, VerificationCodeTTL.DEFAULT);

    return { code, token };
  }

  async check2fa(userId: string, data: VerificationData) {
    const { code, type } = data;
    const user = await this.userService.findUserById(+userId);
    const verification = await this.verificationService.findCodeByUserIdAndType(userId, type);

    if (!user || !verification) {
      throw new NotFoundException();
    }

    if (verification.expiredAfter < new Date()) {
      throw new BadRequestException({ code: 400, message: 'Code has expired.' });
    }

    if (code !== verification.code) {
      throw new BadRequestException({ code: 400, message: 'Invalid code.' });
    }

    await this.verificationService.removeCodesByUserId(userId);

    const token = this.jwtService.sign({ userId }, { expiresIn: '1d' });

    return { token };
  }
}
