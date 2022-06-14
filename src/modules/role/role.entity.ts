import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { BaseEntity } from "@medusajs/medusa";
import { Entity as MedusaEntity } from "medusa-extender";
import { Permission } from '../permission/permission.entity';
import { Store } from "../store/entities/store.entity";
import { User } from "../user/entities/user.entity";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@MedusaEntity()
@Entity()
export class Role extends BaseEntity {

  @Column({type: "varchar"})
  name: string;

  @Index()
	@Column({ nullable: true })
	store_id: string;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "role")
  }

  @OneToMany(() => Permission, (permission) => permission.role)
	@JoinColumn({ name: 'id', referencedColumnName: 'role_id' })
	permissions: Permission[];

  @OneToMany(() => User, (user) => user.teamRole)
	@JoinColumn({ name: 'id', referencedColumnName: 'role_id' })
	users: User[];

  @ManyToOne(() => Store, (store) => store.roles)
	@JoinColumn({ name: 'store_id' })
	store: Store;
}