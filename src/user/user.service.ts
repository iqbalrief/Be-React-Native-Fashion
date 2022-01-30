import { BadRequestException, Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './Models/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto) {
    const user = new User();
    console.log(dto);

    if (dto.password !== dto.retypedPassword) {
      throw new BadRequestException(['Passwords are not identical']);
    }

    const existingUser = await this.userRepository.findOne({
      where: [{ email: dto.email }],
    });

    if (existingUser) {
      throw new BadRequestException(['username or email is already taken']);
    }

    user.email = dto.email;
    user.password = await bcrypt.hash(dto.password, 10);

    this.userRepository.create(user);
    await this.userRepository.save(user);
    return user;
  }

  async update(id, rt) {
    await this.userRepository.update(id, { hashedRt: rt });
  }

  async findOne(dto) {
    return this.userRepository.findOne(dto);
  }


  async updateUser(updateUserDto: UpdateUserDto) {
      return this.userRepository.save({...updateUserDto});
  }

  async findById(userId) {
    return this.userRepository.findOne(userId);
  }

}
