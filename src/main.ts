import { Medusa } from 'medusa-extender';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { resolve } from 'path';
import express = require('express');

async function bootstrap() {
    const expressInstance = express();
    
    const rootDir = resolve(__dirname) + '/../';
    await new Medusa(rootDir, expressInstance).load([
      UserModule,
      ProductModule
    ]);
    
    expressInstance.listen(9000, () => {
        console.info('Server successfully started on port 9000');
    });
}

bootstrap();