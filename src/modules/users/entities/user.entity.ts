import { CourseEntity } from 'src/modules/courses/entities/course.entity';
import { RegistrationEntity } from 'src/modules/registration/entities/registration.entity';
import { RoleEntity } from 'src/modules/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  roles?: RoleEntity[];

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

  checkPassword(plainPassword: string): boolean {
    return !!(plainPassword === this.password);
  }
}
