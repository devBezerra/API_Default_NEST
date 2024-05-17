import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'users_roles' })
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'role_id' })
  roleId: number;

  @ManyToOne(() => UserEntity, (user) => user.profiles)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.profiles)
  @JoinColumn({ name: 'role_id' })
  role?: RoleEntity;
}
