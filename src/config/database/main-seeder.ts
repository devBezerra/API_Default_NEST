import { DataSource } from 'typeorm';
import { Seeder, runSeeders } from 'typeorm-extension';
import { CoursesSeed } from './seeds/courses.seed';
import { UsersSeed } from './seeds/users.seed';
import { RolesSeed } from './seeds/roles.seed';
import { ProfileSeed } from './seeds/profiles.seed';
import { RegistrationsSeed } from './seeds/registrations.seed';
import { ClassesSeed } from './seeds/classes.seed';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [CoursesSeed, UsersSeed, RolesSeed, ProfileSeed, RegistrationsSeed, ClassesSeed],
    });
  }
}
