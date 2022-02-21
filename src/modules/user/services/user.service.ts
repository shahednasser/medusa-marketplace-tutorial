import { MedusaAuthenticatedRequest, Service } from 'medusa-extender';

import { CurrencyRepository } from '@medusajs/medusa/dist/repositories/currency'
import { EntityManager } from 'typeorm';
import EventBusService from '@medusajs/medusa/dist/services/event-bus';
import { FindConfig } from '@medusajs/medusa/dist/types/common';
import { User as MedusaUser } from '@medusajs/medusa';
import { UserService as MedusaUserService } from '@medusajs/medusa/dist/services';
import { Store } from '@medusajs/medusa';
import { StoreRepository } from '@medusajs/medusa/dist/repositories/store'
import { User } from '../entities/user.entity';
import UserRepository from '../repositories/user.repository';
import { UserRoles } from '@medusajs/medusa/dist/models/user';

type ConstructorParams = {
	manager: EntityManager;
	userRepository: typeof UserRepository
	eventBusService: EventBusService;
  storeRepository: StoreRepository;
  currencyRepository: CurrencyRepository;
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
  readonly manager: EntityManager;
  userRepository: typeof UserRepository;
  storeRepository: typeof StoreRepository;
  currencyRepository: typeof CurrencyRepository;
  loggedInUser?: User;

	constructor(private readonly container: ConstructorParams) {
		super(container);
		this.manager = container.manager;
    this.userRepository = container.userRepository;
    this.storeRepository_ = container.storeRepository;
    this.currencyRepository_ = container.currencyRepository;

	}

  async create(user: CreateUserInput, password: string): Promise<User> {
      const medusaUser: MedusaUser = await super.create(user, password)
      //reload user
      const userRepo: UserRepository = this.manager.getCustomRepository(this.userRepository)
      const userModel: User = await userRepo.findOne({
        id: medusaUser.id
      })
      const storeRepository: StoreRepository = this.manager.getCustomRepository(this.storeRepository_)
      const currencyRepository: CurrencyRepository = this.manager.getCustomRepository(
        this.currencyRepository_
      )
      
      //create a new store
      const s = await storeRepository.create()
      // Add default currency (USD) to store currencies
      const usd = await currencyRepository.findOne({
        code: "usd",
      })

      if (usd) {
        s.currencies = [usd]
      }

      const store: Store = await storeRepository.save(s)
      userModel.store_id = store.id

      return userRepo.save(userModel)
  }

  setLoggedInUser(user) {
    this.loggedInUser = user;
  }

  getLoggedInUser(): User|null {
    return this.loggedInUser;
  }
}