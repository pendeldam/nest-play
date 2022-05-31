import { Body, Controller, Get, HttpException, HttpStatus, Post, Patch, UseGuards, Param, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@User() user) {
    const result = await this.userService.findUserById(user);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);

    return { message: 'User created.', user };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateUser(+id, updateUserDto);

    return { message: 'User updated.', user };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.deleteUser(+id);

    return { message: 'User deleted.', user };
  }
}
