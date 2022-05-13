import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { Entity as MedusaEntity } from "medusa-extender";
import { Order as MedusaOrder } from "@medusajs/medusa";
import { Store } from "../store/entities/store.entity";

@MedusaEntity({override: MedusaOrder})
@Entity()
export class Order extends MedusaOrder {
	@Index()
	@Column({ nullable: true })
	store_id: string;

	@Index()
	@Column({ nullable: false })
	parent_id: string;

	@ManyToOne(() => Store, (store) => store.orders)
	@JoinColumn({ name: 'store_id' })
	store: Store;

	@ManyToOne(() => Order, (order) => order.children)
	@JoinColumn({ name: 'parent_id' })
	parent: Order;
    
	@OneToMany(() => Order, (order) => order.parent)
	@JoinColumn({ name: 'id', referencedColumnName: 'parent_id' })
	children: Order[];
}