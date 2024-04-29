import { UserEntity } from "src/modules/users/entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

export class UsersSeed implements Seeder {
    public async run(dataSource: DataSource): Promise<any> {
        const repository = dataSource.getRepository(UserEntity);
        await repository.insert([
            {
                id: 1,
                username: 'Administrador',
                email: 'admin@admin.com',
                password: '12345',
            }
        ])
    }
}