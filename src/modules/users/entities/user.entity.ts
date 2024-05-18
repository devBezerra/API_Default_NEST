import { CourseEntity } from 'src/modules/courses/entities/course.entity';
import { RegistrationEntity } from 'src/modules/registration/entities/registration.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ProfileEntity } from 'src/modules/roles/entities/profile.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password?: string;

  @OneToMany(() => ProfileEntity, (profile) => profile.user)
  profiles?: ProfileEntity[];

  @OneToMany(() => CourseEntity, (course) => course.user)
  courses?: CourseEntity[];

  @OneToMany(() => RegistrationEntity, (registration) => registration.user)
  registrations?: RegistrationEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @BeforeInsert()
  async encryptPassword() {
    this.password = await this.encrypt(this.password);
  }

  async checkPassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }

  async encrypt(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
