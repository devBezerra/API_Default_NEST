import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class UsersRolesSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const query = `
        INSERT INTO users_roles
        (id, user_id, role_id)
        VALUES 
        (1, 1, 1),
        (2, 2, 2),
        (3, 3, 3);
        `;
      console.log(query)
    await dataSource.query(query);
  }
}
