import { RoleEntity } from "src/modules/roles/entities/role.entity";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

export class RolesSeed implements Seeder {
    public async run(dataSource: DataSource): Promise<any> {
        const repository = dataSource.getRepository(RoleEntity);
        await repository.insert([
            {
                id: 1,
                name: 'Admin',
            },
            {
                id: 2,
                name: 'Business',
            },
            {
                id: 3,
                name: 'Student',
            }
        ])
    }
}