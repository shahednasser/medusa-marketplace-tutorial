import { EntityEventType, MedusaEventHandlerParams, OnMedusaEntityEvent, Service } from 'medusa-extender';

import { BaseService } from "medusa-interfaces";
import { EntityManager } from 'typeorm';
import { OrderService as MedusaOrderService } from "@medusajs/medusa/dist/services";
import { Order } from "./order.entity";
import { OrderRepository } from './order.repository';
import { OrderStatus } from '@medusajs/medusa';
import { User } from "../user/entities/user.entity";

type InjectedDependencies = {
    manager: EntityManager;
    orderRepository: typeof OrderRepository;
    customerService: any;
    paymentProviderService: any;
    shippingOptionService: any;
    shippingProfileService: any;
    discountService: any;
    fulfillmentProviderService: any;
    fulfillmentService: any;
    lineItemService: any;
    totalsService: any;
    regionService: any;
    cartService: any;
    addressRepository: any;
    giftCardService: any;
    draftOrderService: any;
    inventoryService: any;
    eventBusService: any;
    loggedInUser: User;
    orderService: OrderService;
};

@Service({ scope: 'SCOPED', override: MedusaOrderService })
export class OrderService extends MedusaOrderService {
    private readonly manager: EntityManager;
    private readonly container: InjectedDependencies;

    constructor(container: InjectedDependencies) {
        super(container);
    
        this.manager = container.manager;
        this.container = container;
    }

    buildQuery_(selector: object, config: {relations: string[], select: string[]}): object {
        if (this.container.loggedInUser && this.container.loggedInUser.store_id) {
            selector['store_id'] = this.container.loggedInUser.store_id;
        }

        config.select.push('store_id')
        
        config.relations = config.relations ?? []

        config.relations.push("children", "parent", "store")

        return super.buildQuery_(selector, config);
    }
}