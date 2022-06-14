import UserService from "../user/services/user.service";
import _ from "lodash";

export default async (req, res, next, checkPermissions) => {
  const userService = req.scope.resolve('userService') as UserService;
  const loggedInUser = await userService.retrieve(req.user.userId, {
      select: ['id', 'store_id'],
      relations: ['teamRole', 'teamRole.permissions']
  });

  for(const permission of loggedInUser.teamRole.permissions) {
    if (_.isEqual(permission.metadata, checkPermissions)) {
      return next();
    }
  }

  //permission denied
  res.sendStatus(401)
}