import { ProfileEntity } from 'src/modules/roles/entities/profile.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class ProfileSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(ProfileEntity);
    await repository.insert([
      {
        id: 1,
        roleId: 1,
        userId: 1,
      },
      {
        id: 2,
        roleId: 2,
        userId: 2,
      },
      {
        id: 3,
        roleId: 3,
        userId: 3,
      },
    ]);
  }
}
