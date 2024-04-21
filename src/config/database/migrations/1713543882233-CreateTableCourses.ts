import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCourses1713543882233 implements MigrationInterface {
  private CourseTable = new Table({
    name: 'courses',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'description',
        type: 'VARCHAR',
        length: '50',
        isNullable: false,
      },
      {
        name: 'syllabus',
        type: 'TEXT',
        isNullable: true,
      },
      {
        name: 'created_at',
        type: 'TIMESTAMP',
        default: 'NOW()',
      },
      {
        name: 'updated_at',
        type: 'TIMESTAMP',
        default: 'NOW() ON UPDATE CURRENT_TIMESTAMP()',
      },
      {
        name: 'deleted_at',
        type: 'TIMESTAMP',
        isNullable: true,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.CourseTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.CourseTable);
  }
}
