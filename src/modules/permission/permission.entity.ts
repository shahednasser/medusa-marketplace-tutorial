import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { BaseEntity } from "@medusajs/medusa";
import { DbAwareColumn } from "@medusajs/medusa/dist/utils/db-aware-column";
import { Entity as MedusaEntity } from "medusa-extender";
import { Role } from "../role/role.entity";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@MedusaEntity()
@Entity()
export class Permission extends BaseEntity {

  @Column({type: "varchar"})
  name: string;

  @Index()
	@Column({ nullable: true })
	role_id: string;

  @DbAwareColumn({ type: "jsonb", nullable: true })
  metadata: Record<string, unknown>

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "perm")
  }

  @ManyToOne(() => Role, (role) => role.permissions)
	@JoinColumn({ name: 'role_id' })
	role: Role;
}