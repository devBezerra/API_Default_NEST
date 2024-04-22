import { DataSource } from "typeorm";
import { Seeder, runSeeders } from "typeorm-extension";
import { CoursesSeed } from "./seeds/courses.seed";
import { StudentsSeed } from "./seeds/students.seed";

export class MainSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<any> {
        await runSeeders(dataSource, {
            seeds: [CoursesSeed, StudentsSeed]
        })
    }
}