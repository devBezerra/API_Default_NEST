import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateStudentCourseTable1713788426964 implements MigrationInterface {
  private studentCourseTable = new Table({
    name: 'students_courses',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'student_id',
        type: 'INTEGER',
      },
      {
        name: 'course_id',
        type: 'INTEGER',
      },
    ],
  });

  private studentIdForeignKey = new TableForeignKey({
    name: 'fk_students_courses_student_id',
    columnNames: ['student_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'students',
    onDelete: 'CASCADE',
  });

  private courseIdForeignKey = new TableForeignKey({
    name: 'fk_students_courses_course_id',
    columnNames: ['course_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'courses',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.studentCourseTable);
    await queryRunner.createForeignKeys('students_courses', [this.studentIdForeignKey, this.courseIdForeignKey]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('students_courses', [this.studentIdForeignKey, this.courseIdForeignKey]);
    await queryRunner.dropTable(this.studentCourseTable);
  }
}
