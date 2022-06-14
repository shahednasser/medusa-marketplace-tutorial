import { AdminPostInvitesInviteAcceptReq } from "@medusajs/medusa"
import { InviteService } from './invite.service';
import { MedusaError } from 'medusa-core-utils';
import UserService from '../user/services/user.service';
import { validator } from "@medusajs/medusa/dist/utils/validator"

export default async (req, res) => {
  const validated = await validator(AdminPostInvitesInviteAcceptReq, req.body)

  const inviteService: InviteService = req.scope.resolve("inviteService")

  //retrieve invite
  let decoded
  try {
    decoded = inviteService.verifyToken(validated.token)
  } catch (err) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Token is not valid"
    )
  }

  const invite = await inviteService.retrieve(decoded.invite_id);

  let store_id = invite ? invite.store_id : null;

  const user = await inviteService.accept(validated.token, validated.user);
  
  if (store_id) {
    const userService: UserService = req.scope.resolve("userService");
    await userService.addUserToStore(user.id, store_id);
  }

  res.sendStatus(200)
}