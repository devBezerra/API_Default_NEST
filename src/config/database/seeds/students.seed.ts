import { StudentEntity } from 'src/modules/students/entities/student.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class StudentsSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(StudentEntity);
    await repository.insert([
      {
        id: 1,
        name: 'Arthurzinho',
      },
      {
        id: 2,
        name: 'Nathanzinho',
      },
    ]);
  }
}
