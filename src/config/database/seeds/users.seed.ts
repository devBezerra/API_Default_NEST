import { UserEntity } from 'src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class UsersSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(UserEntity);
    await repository.insert([
      {
        id: 1,
        username: 'Administrador',
        email: 'admin@admin.com',
        password: '$2b$10$c4Ih40uLWO4OENbZh8eTU.rQjxP4QEGxsHHKZfssVkxRFkrcC8OnK',
      },
      {
        id: 2,
        username: 'Nathanzinho LTDA',
        email: 'nathan@nathan.com',
        password: '$2b$10$c4Ih40uLWO4OENbZh8eTU.rQjxP4QEGxsHHKZfssVkxRFkrcC8OnK',
      },
      {
        id: 3,
        username: 'Arthurzinho',
        email: 'arthur@arthur.com',
        password: '$2b$10$c4Ih40uLWO4OENbZh8eTU.rQjxP4QEGxsHHKZfssVkxRFkrcC8OnK',
      },
    ]);
  }
}
