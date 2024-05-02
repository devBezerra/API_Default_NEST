import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUserRolesTable1714412263263 implements MigrationInterface {
  private usersRoleTable = new Table({
    name: 'users_roles',
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
        name: 'role_id',
        type: 'INTEGER',
      },
    ],
  });

  private userIdForeignKey = new TableForeignKey({
    name: 'fk_users_roles_user_id',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'CASCADE',
  });

  private roleIdForeignKey = new TableForeignKey({
    name: 'fk_users_roles_role_id',
    columnNames: ['role_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'roles',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.usersRoleTable);
    await queryRunner.createForeignKeys('users_roles', [this.userIdForeignKey, this.roleIdForeignKey]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('users_roles', [this.userIdForeignKey, this.roleIdForeignKey]);
    await queryRunner.dropTable(this.usersRoleTable);
  }
}
