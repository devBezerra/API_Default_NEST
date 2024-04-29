import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUsersTable1714146582724 implements MigrationInterface {
  private UsersTable = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'username',
        type: 'VARCHAR',
        length: '255',
        isNullable: false,
      },
      {
        name: 'email',
        type: 'VARCHAR',
        length: '255',
        isNullable: false,
      },
      {
        name: 'password',
        type: 'VARCHAR',
        length: '255',
        isNullable: false,
      },
      {
        name: 'student_id',
        type: 'INTEGER',
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

  private studentIdForeignKey = new TableForeignKey({
    name: 'fk_users_student_id',
    columnNames: ['student_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'students',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.UsersTable);
    await queryRunner.createForeignKeys('users', [this.studentIdForeignKey])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('users', [this.studentIdForeignKey]);
    await queryRunner.dropTable(this.UsersTable);
  }
}
