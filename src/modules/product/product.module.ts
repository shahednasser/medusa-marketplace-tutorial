import AttachProductSubscribersMiddleware from './middlewares/product.middleware';
import { Module } from 'medusa-extender';
import { Product } from './entities/product.entity';
import ProductRepository from './repositories/product.repository';
import { ProductService } from './services/product.service';
import { ProductsRouter } from './product.router';
import addStoreIdToProduct1645034402086 from './product.migration';

@Module({
    imports: [
      Product,
      ProductRepository,
      ProductService,
      addStoreIdToProduct1645034402086,
      AttachProductSubscribersMiddleware,
      // ProductsRouter
    ]
})
export class ProductModule {}