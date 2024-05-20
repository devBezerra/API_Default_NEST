import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateClassesTable1716205668884 implements MigrationInterface {
  private classesTable = new Table({
    name: 'classes',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'title',
        type: 'VARCHAR',
        length: '255',
        isNullable: false,
      },
      {
        name: 'url',
        type: 'VARCHAR',
        length: '255',
        isNullable: true,
      },
      {
        name: 'course_id',
        type: 'INTEGER',
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

  private courseIdForeignKey = new TableForeignKey({
    name: 'fk_classes_course_id',
    columnNames: ['course_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'courses',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.classesTable);
    await queryRunner.createForeignKey('classes', this.courseIdForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('classes', this.courseIdForeignKey);
    await queryRunner.dropTable(this.classesTable);
  }
}
