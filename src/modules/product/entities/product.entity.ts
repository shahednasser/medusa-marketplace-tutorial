import { Column, Entity, Index } from 'typeorm';

import { Entity as MedusaEntity } from 'medusa-extender';
import { Product as MedusaProduct } from '@medusajs/medusa/dist';

@MedusaEntity({ override: MedusaProduct })
@Entity()
export class Product extends MedusaProduct {
	@Index()
	@Column({ nullable: false })
	store_id: string;
}