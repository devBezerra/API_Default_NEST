import { ClassEntity } from 'src/modules/classes/entities/class.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class ClassesSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(ClassEntity);
    await repository.insert([
      {
        id: 1,
        courseId: 1,
        title: 'Título teste 1',
        url: 'www.google.com'
      },
      {
        id: 2,
        courseId: 1,
        title: 'Título teste 2',
        url: 'www.google.com'
      },
      {
        id: 3,
        courseId: 1,
        title: 'Título teste 3',
        url: 'www.google.com'
      },
      {
        id: 4,
        courseId: 1,
        title: 'Título teste 4',
        url: 'www.google.com'
      },
      {
        id: 5,
        courseId: 1,
        title: 'Título teste 5',
        url: 'www.google.com'
      },
    ]);
  }
}
