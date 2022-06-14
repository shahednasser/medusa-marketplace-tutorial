import { Router } from 'medusa-extender';
import listProductsHandler from '@medusajs/medusa/dist/api/routes/admin/products/list-products';
import permissionMiddleware from './../permission/permission.middleware';
import wrapHandler from '@medusajs/medusa/dist/api/middlewares/await-middleware';

@Router({
    routes: [
        {
            requiredAuth: true,
            path: '/admin/products',
            method: 'get',
            handlers: [
              (req, res, next) => {
                permissionMiddleware(req, res, next, {test: true})
              },
              wrapHandler(listProductsHandler)
            ],
        },
    ],
})
export class ProductsRouter {}