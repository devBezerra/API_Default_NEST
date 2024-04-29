import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInterface } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findUserByEmailLogin(email: string): Promise<UserInterface> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { email, deletedAt: null },
      });

      return user;
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar esse usuário.' }, HttpStatus.NOT_FOUND);
    }
  }

  async checkUserPassword(id: number, password: string): Promise<void> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id },
        select: ['password', 'email', 'username'],
      });
      if (!user || !password || !user.checkPassword(password)) {
        throw new UnauthorizedException('Estas credenciais estão incorretas.');
      }
    } catch (error) {
      throw error
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
