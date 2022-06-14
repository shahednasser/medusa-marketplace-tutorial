import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Entity as MedusaEntity } from 'medusa-extender';
import { User as MedusaUser } from '@medusajs/medusa/dist';
import { Role } from '../../role/role.entity';
import { Store } from '../../store/entities/store.entity';

@MedusaEntity({ override: MedusaUser })
@Entity()
export class User extends MedusaUser {
	@Index()
	@Column({ nullable: false })
	store_id: string;

	@ManyToOne(() => Store, (store) => store.members)
	@JoinColumn({ name: 'store_id' })
	store: Store;

	@Index()
	@Column({ nullable: false })
	role_id: string;

	@ManyToOne(() => Role, (role) => role.users)
	@JoinColumn({ name: 'role_id' })
	teamRole: Role;
}
