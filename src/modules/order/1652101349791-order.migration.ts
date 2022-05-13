import { MigrationInterface, QueryRunner } from 'typeorm';

import { Migration } from 'medusa-extender';

@Migration()
export class OrderMigration1652101349791 implements MigrationInterface {
    name = 'OrderMigration1652101349791';
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = 'ALTER TABLE public."order" ADD COLUMN IF NOT EXISTS "store_id" text; ALTER TABLE public."order" ADD COLUMN IF NOT EXISTS "parent_id" text;';
        await queryRunner.query(query);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        const query = 'ALTER TABLE public."order" DROP COLUMN "store_id"; ALTER TABLE public."order" DROP COLUMN "parent_id";';
        await queryRunner.query(query);
    }
}