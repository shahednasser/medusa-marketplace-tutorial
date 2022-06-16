import { Router } from 'medusa-extender';
import listProductsHandler from '@medusajs/medusa/dist/api/routes/admin/products/list-products';
import permissionGuard from '../permission/permission.guard';
import wrapHandler from '@medusajs/medusa/dist/api/middlewares/await-middleware';

@Router({
    routes: [
        {
            requiredAuth: true,
            path: '/admin/products',
            method: 'get',
            handlers: [
              permissionGuard([
                {path: "/admin/products"}
              ]),
              wrapHandler(listProductsHandler)
            ],
        },
    ],
})
export class ProductsRouter {}