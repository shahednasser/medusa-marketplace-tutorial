import { Service } from 'medusa-extender';

import { CurrencyRepository } from '@medusajs/medusa/dist/repositories/currency'
import { EntityManager } from 'typeorm';
import EventBusService from '@medusajs/medusa/dist/services/event-bus';
import { FindConfig } from '@medusajs/medusa/dist/types/common';
import { Store, User as MedusaUser } from '@medusajs/medusa';
import { UserService as MedusaUserService } from '@medusajs/medusa/dist/services';
import { StoreRepository } from '@medusajs/medusa/dist/repositories/store'
import { User } from '../entities/user.entity';
import UserRepository from '../repositories/user.repository';
import { UserRoles } from '@medusajs/medusa/dist/models/user';
import { MedusaError } from 'medusa-core-utils';

type ConstructorParams = {
	loggedInUser: User;
	manager: EntityManager;
	userRepository: typeof UserRepository;
	eventBusService: EventBusService;
};

type CreateUserInput = {
    id?: string
    email: string
    first_name?: string
    last_name?: string
    api_token?: string
    role?: UserRoles
    metadata?: JSON
    store_id?: string
    new_store?: boolean
};

@Service({ override: MedusaUserService, scope: 'SCOPED' })
export default class UserService extends MedusaUserService {
    private readonly manager: EntityManager;
	private readonly userRepository: typeof UserRepository;
	private readonly eventBus: EventBusService;

    constructor(private readonly container: ConstructorParams) {
        super(container);
        this.manager = container.manager;
		this.userRepository = container.userRepository;
		this.eventBus = container.eventBusService;

    }

    public async retrieve(userId: string, config?: FindConfig<User>): Promise<User> {
        const userRepo = this.manager.getCustomRepository(this.userRepository);
        const validatedId = this.validateId_(userId);
        const query = this.buildQuery_({ id: validatedId }, config);

        const user = await userRepo.findOne(query);

        if (!user) {
            throw new MedusaError(MedusaError.Types.NOT_FOUND, `User with id: ${userId} was not found`);
        }

        return user as User;
    }
}