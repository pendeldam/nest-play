import { Column, ManyToOne, Entity, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { VerificationCodeTypes } from './verification.interface';

@Entity()
export class Verification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false, default: VerificationCodeTypes.SMS })
  type: string;

  @Column({ nullable: false })
  expiredAfter: Date;

  @ManyToOne(() => User, (user) => user.verification, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
