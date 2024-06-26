import { ClassEntity } from 'src/modules/classes/entities/class.entity';
import { CourseEntity } from 'src/modules/courses/entities/course.entity';
import { RegistrationEntity } from 'src/modules/registration/entities/registration.entity';
import { ProfileEntity } from 'src/modules/roles/entities/profile.entity';
import { RoleEntity } from 'src/modules/roles/entities/role.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export const entities = [CourseEntity, UserEntity, RoleEntity, RegistrationEntity, ProfileEntity, ClassEntity];
