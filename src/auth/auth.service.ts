import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as cryptoRandomString from 'crypto-random-string';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { VerificationService } from '../verification/verification.service';
import { VerificationCodeTTL } from '../verification/verification.interface';
import { comparePassword } from '../utils/helpers/decryptPassword';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private verificationService: VerificationService,
  ) {}

  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.userService.findUserByLogin(login);
    const isPasswordMatch = await comparePassword(password, user.password);

    if (isPasswordMatch) {
      return user;
    }

    return null;
  }

  async loginUser(id: number) {
    const CODE = cryptoRandomString({ length: 4, type: 'numeric' });
    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new NotFoundException();
    }

    const token = this.jwtService.sign({ id });

    const { code } = await this.verificationService.createCode(
      user,
      CODE,
      VerificationCodeTTL.DEFAULT,
    );

    return { code, token };
  }

  async check2fa(userId: number, code: string) {
    const user = await this.userService.findUserById(userId);
    const verification = await this.verificationService.findCodeByUserId(userId);

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
