import { EntityEventType, MedusaEventHandlerParams, OnMedusaEntityEvent, Service } from 'medusa-extender';

import { EntityManager } from "typeorm";
import { FindConfig } from '@medusajs/medusa/dist/types/common';
import { ProductService as MedusaProductService } from '@medusajs/medusa/dist/services';
import { Product } from '../entities/product.entity';
import ProductRepository from '../repositories/product.repository';
import { User } from '../../user/entities/user.entity';
import UserService from '../../user/services/user.service';

type ConstructorParams = {
  manager: any;
  productRepository: any;
  productVariantRepository: any;
  productOptionRepository: any;
  eventBusService: any;
  productVariantService: any;
  productCollectionService: any;
  productTypeRepository: any;
  productTagRepository: any;
  imageRepository: any;
  searchService: any;
  userService: UserService;
}

@Service({ scope: 'SCOPED', override: MedusaProductService })
export class ProductService extends MedusaProductService {
    readonly #manager: EntityManager;
    userService: UserService;
    
    constructor(private readonly container: ConstructorParams) {
        super(container);
        this.#manager = container.manager;
        this.userService = container.userService;
    }
    
    @OnMedusaEntityEvent.Before.Insert(Product, { async: true })
    public async attachStoreToProduct(
        params: MedusaEventHandlerParams<Product, 'Insert'>
    ): Promise<EntityEventType<Product, 'Insert'>> {
        const { event } = params;
        const user = this.userService.getLoggedInUser()
        event.entity.store_id = user.store_id;
        return event;
    }

    prepareListQuery_(selector: object, config: object): object {
        const user = this.userService.getLoggedInUser()
        if (user) {
            selector['store_id'] = user.store_id
        }
        
        return super.prepareListQuery_(selector, config);
    }
}