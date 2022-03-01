import { Store as MedusaStore } from '@medusajs/medusa/dist';
import { Entity, JoinColumn, OneToMany } from 'typeorm';
import { Entity as MedusaEntity } from 'medusa-extender';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

@MedusaEntity({ override: MedusaStore })
@Entity()
export class Store extends MedusaStore {
	@OneToMany(() => User, (user) => user.store)
	@JoinColumn({ name: 'id', referencedColumnName: 'store_id' })
	members: User[];

	@OneToMany(() => Product, (product) => product.store)
	@JoinColumn({ name: 'id', referencedColumnName: 'store_id' })
	products: Product[];
}
