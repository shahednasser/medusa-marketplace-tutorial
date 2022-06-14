import { AttachUserSubscriberMiddleware } from './middlewares/userSubscriber.middleware';
import { LoggedInUserMiddleware } from "./middlewares/loggedInUser.middleware";
import { Module } from 'medusa-extender';
import { User } from './entities/user.entity';
import { UserMigration1655132360987 } from './1655132360987-user.migration';
import UserRepository from './repositories/user.repository';
import { UserRouter } from "./routers/user.router";
import UserService from './services/user.service';
import addStoreIdToUser1644946220401 from './user.migration';

@Module({
    imports: [
        User,
        UserService,
        UserRepository,
        addStoreIdToUser1644946220401,
        UserRouter,
        LoggedInUserMiddleware,
        AttachUserSubscriberMiddleware, 
        UserMigration1655132360987]
})
export class UserModule {}