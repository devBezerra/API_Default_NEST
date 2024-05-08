import { CourseEntity } from 'src/modules/courses/entities/course.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class CoursesSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(CourseEntity);
    await repository.insert([
      {
        id: 1,
        description: 'Curso Teste',
        syllabus:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictum fusce ut placerat orci. Cras tincidunt lobortis feugiat vivamus at augue eget. Dictum fusce ut placerat orci nulla pellentesque dignissim. Aliquam purus sit amet luctus venenatis lectus. Tortor dignissim convallis aenean et tortor at risus viverra. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Eget arcu dictum varius duis at consectetur. Libero id faucibus nisl tincidunt eget nullam. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas.',
        userId: 2,
      },
      {
        id: 2,
        description: 'Segundo Curso Teste',
        syllabus:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictum fusce ut placerat orci. Cras tincidunt lobortis feugiat vivamus at augue eget. Dictum fusce ut placerat orci nulla pellentesque dignissim. Aliquam purus sit amet luctus venenatis lectus. Tortor dignissim convallis aenean et tortor at risus viverra. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Eget arcu dictum varius duis at consectetur. Libero id faucibus nisl tincidunt eget nullam. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas.',
        userId: 2,
      },
    ]);
  }
}
