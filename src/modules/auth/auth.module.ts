import { Module } from 'medusa-extender';
import { LoggedInUserMiddleware } from "./middlewares/loggdeInUser.middleware.js";

@Module({
	imports: [LoggedInUserMiddleware],
})
export class AuthModule {}
