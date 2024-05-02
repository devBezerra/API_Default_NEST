import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateuserCourseTable1714146582725 implements MigrationInterface {
  private userCourseTable = new Table({
    name: 'users_courses',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'user_id',
        type: 'INTEGER',
      },
      {
        name: 'course_id',
        type: 'INTEGER',
      },
    ],
  });

  private userIdForeignKey = new TableForeignKey({
    name: 'fk_users_courses_user_id',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'CASCADE',
  });

  private courseIdForeignKey = new TableForeignKey({
    name: 'fk_users_courses_course_id',
    columnNames: ['course_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'courses',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.userCourseTable);
    await queryRunner.createForeignKeys('users_courses', [this.userIdForeignKey, this.courseIdForeignKey]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('users_courses', [this.userIdForeignKey, this.courseIdForeignKey]);
    await queryRunner.dropTable(this.userCourseTable);
  }
}
