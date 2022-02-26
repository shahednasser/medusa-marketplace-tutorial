import { Connection, EntitySubscriberInterface, EventSubscriber, RemoveEvent, UpdateEvent } from 'typeorm';
import { eventEmitter, Utils as MedusaUtils, OnMedusaEntityEvent } from 'medusa-extender';
import { Store } from '../entities/store.entity';

@EventSubscriber()
export default class StoreSubscriber implements EntitySubscriberInterface<Store> {
	static attachTo(connection: Connection): void {
		MedusaUtils.attachOrReplaceEntitySubscriber(connection, StoreSubscriber);
	}

	public listenTo(): typeof Store {
		return Store;
	}

	/**
	 * Relay the event to the handlers.
	 * @param event Event to pass to the event handler
	 */
	public async beforeUpdate(event: UpdateEvent<Store>): Promise<void> {
		return await eventEmitter.emitAsync(OnMedusaEntityEvent.Before.UpdateEvent(Store), {
			event,
			transactionalEntityManager: event.manager,
		});
	}

	/**
	 * Relay the event to the handlers.
	 * @param event Event to pass to the event handler
	 */
	public async beforeRemove(event: RemoveEvent<Store>): Promise<void> {
		return await eventEmitter.emitAsync(OnMedusaEntityEvent.Before.RemoveEvent(Store), {
			event,
			transactionalEntityManager: event.manager,
		});
	}
}
