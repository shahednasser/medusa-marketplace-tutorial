import { Module } from 'medusa-extender';
import { User } from './entities/user.entity';
import UserRepository from './repositories/user.repository';
import UserService from './services/user.service';
import addStoreIdToUser1644946220401 from './migrations/user.migration';
import { UserRouter } from "./router/user.router";

@Module({
    imports: [
        User,
        UserService,
        UserRepository,
        addStoreIdToUser1644946220401,
        UserRouter
    ]
})
export class UserModule {}