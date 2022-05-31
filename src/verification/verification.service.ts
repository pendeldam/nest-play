import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Verification } from './verification.entity';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private verificationRepository: Repository<Verification>,
  ) {}

  async createCode(user: User, code: string, expiredAfter?: Date, type?: string): Promise<Verification> {
    const result = this.verificationRepository.create({ user, code, expiredAfter, type });
    await this.verificationRepository.save(result);

    return result;
  }

  async findCodeByUserIdAndType(id: string, type: string): Promise<Verification> {
    const code = await this.verificationRepository.findOne({ where: { user: id, type } });

    return code;
  }

  async removeCodesByUserId(id: string): Promise<void> {
    const code = await this.verificationRepository.find({ where: { user: id } });
    await this.verificationRepository.remove(code);
  }
}
