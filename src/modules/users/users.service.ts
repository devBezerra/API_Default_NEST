import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInterface } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { AuthUserInterface } from 'src/authentication/interfaces/auth-user.interface';
import { UserWithPasswordsInterface } from './interfaces/user-with-password.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserInterface[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar os usuários.' }, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number): Promise<UserInterface> {
    try {
      const entitie = this.usersRepository
        .createQueryBuilder('u')
        .select(['u', 'c.id', 'c.description', 'rg.id', 'rgc.id', 'rgc.description', 'r'])
        .leftJoin('u.courses', 'c', 'c.user_id = u.id')
        .leftJoin('u.registrations', 'rg', 'rg.user_id = u.id')
        .leftJoin('rg.course', 'rgc', 'rg.course_id = rgc.id')
        .leftJoin('u.users_roles', 'p', 'p.user_id = u.id')
        .leftJoin('p.role', 'r', 'r.id = p.role_id')
        .where('u.id = :id', { id });

      const user: UserInterface = await entitie.getOneOrFail();
      return user;
    } catch (error) {
      console.log(error)
      throw new HttpException({ message: 'Não foi possível encontrar esse usuário.' }, HttpStatus.NOT_FOUND);
    }
  }

  async findUserByEmail(email: string, user: UserInterface): Promise<UserInterface> {
    try {
      const id = user.id || 0;
      return await this.usersRepository.findOne({
        where: {
          email,
          id: Not(id),
        },
      });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar esse usuário.' }, HttpStatus.NOT_FOUND);
    }
  }

  async findUserByEmailLogin(email: string): Promise<UserInterface> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { email, deletedAt: null },
        relations: ['roles'],
      });

      return user;
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar esse usuário.' }, HttpStatus.NOT_FOUND);
    }
  }

  async getMe(user: AuthUserInterface): Promise<UserInterface> {
    try {
      return await this.findOne(user.id);
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
      if (!user || !password || !(await user.checkPassword(password))) {
        throw new UnauthorizedException('Estas credenciais estão incorretas.');
      }
    } catch (error) {
      throw error;
    }
  }

  async create(data: CreateUserDto): Promise<{ user: UserInterface; message: string }> {
    try {
      const entity: UserEntity = Object.assign(new UserEntity(), data);
      const user: UserWithPasswordsInterface = await this.usersRepository.save(entity);
      this.removePasswords(user);
      return { user, message: 'O usuário foi criado com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível criar esse usuário.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: number,
    data: UpdateUserDto,
  ): Promise<{ user: UserInterface; message: string }> {
    try {
      const entity: UserEntity = Object.assign(new UserEntity(), { ...data, id });
      await this.usersRepository.save(entity);
      const user = await this.findOne(id);
      return { user, message: 'O usuário foi atualizado com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível atualizar o usuário.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.usersRepository.softDelete(id);
      return { message: 'Usuário excluído com sucesso!' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível excluir o usuário' }, HttpStatus.BAD_REQUEST);
    }
  }

  removePasswords(user: UserWithPasswordsInterface): void {
    delete user.password;
    delete user.confirmPassword;
  }
}
