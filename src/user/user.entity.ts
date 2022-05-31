import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from './user.interface';
import { Verification } from '../verification/verification.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  login: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: UserStatus.INITIAL })
  status: string;

  @OneToMany(() => Verification, (verification) => verification.user)
  verification: Verification;
}
