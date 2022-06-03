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

  async createCode(user: User, code: string, expiredAfter?: Date): Promise<Verification> {
    const isCodeAlreadyExist = await this.findCodeByUserId(user.id);

    if (isCodeAlreadyExist) {
      await this.removeCodesByUserId(user.id);
    }

    const result = this.verificationRepository.create({ user, code, expiredAfter });
    await this.verificationRepository.save(result);

    return result;
  }

  async findCodeByUserId(id: number): Promise<Verification> {
    const code = await this.verificationRepository.findOne({ where: { user: id } });

    return code;
  }

  async removeCodesByUserId(id: number): Promise<void> {
    const code = await this.verificationRepository.find({ where: { user: id } });
    await this.verificationRepository.remove(code);
  }
}
