import { RegistrationEntity } from "src/modules/registration/entities/registration.entity";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

export class RegistrationsSeed implements Seeder {
    public async run(dataSource: DataSource): Promise<any> {
        const repository = dataSource.getRepository(RegistrationEntity);
        await repository.insert([
            {
                id: 1,
                courseId: 1,
                userId: 3,
            },
            {
                id: 2,
                courseId: 2,
                userId: 3,
            },
        ])
    }
}