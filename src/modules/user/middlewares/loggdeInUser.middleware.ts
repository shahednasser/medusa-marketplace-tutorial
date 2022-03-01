import { MedusaAuthenticatedRequest, MedusaMiddleware, Middleware } from 'medusa-extender';
import { NextFunction, Response } from 'express';
import UserService from '../../user/services/user.service';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from "jsonwebtoken";

@Middleware({ requireAuth: true, routes: [{ method: "all", path: '*' }] })
export class LoggedInUserMiddleware implements MedusaMiddleware {
    public async consume(req: MedusaAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        const userService = req.scope.resolve('userService') as UserService;
        const userData: JwtPayload | string = jwt.decode(req?.session?.jwt);
        if (typeof userData === 'object' && !!userData?.userId) {
            const loggedInUser = await userService.retrieve(userData.userId, {
                select: ['id', 'store_id'],
            });
            req.scope.register({
                loggedInUser: {
                    resolve: () => loggedInUser,
                },
            });
        }
        next();
    }
}