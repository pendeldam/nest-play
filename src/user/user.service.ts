import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from '../utils/helpers/hashPassword';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findUserByLogin(login: string): Promise<User> {
    return this.userRepository.findOne({ where: { login } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const isUserLoginExist = await this.findUserByLogin(createUserDto.login);

    if (isUserLoginExist) {
      throw new HttpException('Such login already exist', HttpStatus.BAD_REQUEST);
    }

    const { login, password, email } = createUserDto;
    const hash = await hashPassword(password);

    const user = this.userRepository.create({ password: hash, login, email });
    await this.userRepository.save(user);

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.update(id, updateUserDto);

    return this.findUserById(id);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.findUserById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(id);

    return user;
  }
}
