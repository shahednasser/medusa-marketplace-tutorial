import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

import { Migration } from 'medusa-extender';

@Migration()
export class PermissionMigration1655131601491 implements MigrationInterface {
    name = 'PermissionMigration1655131601491';
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `
        CREATE TABLE "permission" ("id" character varying NOT NULL, 
        "name" character varying NOT NULL, "role_id" character varying NOT NULL, "metadata" jsonb,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now())`;
        await queryRunner.query(query);

        await queryRunner.createPrimaryKey("permission", ["id"])
        await queryRunner.createForeignKey("permission", new TableForeignKey({
            columnNames: ["role_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "role",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }))
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("permission", true);
    }
}