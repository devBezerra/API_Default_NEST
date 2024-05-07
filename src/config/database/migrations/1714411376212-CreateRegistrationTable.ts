import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateRegistrationTable1714146582725 implements MigrationInterface {
  private RegistrationTable = new Table({
    name: 'registrations',
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

  private userIdForeignKey = new TableForeignKey({
    name: 'fk_registrations_user_id',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'CASCADE',
  });

  private courseIdForeignKey = new TableForeignKey({
    name: 'fk_registrations_course_id',
    columnNames: ['course_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'courses',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.RegistrationTable);
    await queryRunner.createForeignKeys('registrations', [this.userIdForeignKey, this.courseIdForeignKey]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('registrations', [this.userIdForeignKey, this.courseIdForeignKey]);
    await queryRunner.dropTable(this.RegistrationTable);
  }
}
