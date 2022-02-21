import {
    MedusaAuthenticatedRequest,
    MedusaMiddleware,
    Middleware,
} from 'medusa-extender';
import { NextFunction, Request, Response } from 'express';

import UserService from '../services/user.service';
import jwt from 'jsonwebtoken';

@Middleware({ requireAuth: true, routes: [{ method: 'all', path: '*' }] })
export default class AdminMiddleware implements MedusaMiddleware {

  public consume(req: MedusaAuthenticatedRequest | Request, res: Response, next: NextFunction): void | Promise<void> {
    const userService: UserService = req.scope.resolve('userService');
    let user = req.user;
    if (!user) {
      user = jwt.decode(req.session.jwt);
      if (user && user.userId) {
        userService.retrieve(user.userId)
          .then((userModel) => {
            userService.setLoggedInUser(userModel);
            return next();
          })
      } else {
        return next();
      }
    } else {
      userService.retrieve(user.userId)
        .then((userModel) => {
          userService.setLoggedInUser(userModel);
          return next();
        })
    }
  }
}