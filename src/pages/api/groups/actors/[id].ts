import { ActorGroup } from ".prisma/client";
import {
  deleteActorGroup,
  DeleteActorGroupInput,
  DeleteActorGroupResult,
} from "@app/services/groups/actor/delete-movie-group";
import { getActorGroup } from "@app/services/groups/actor/get-actor-group";
import { getActorGroups } from "@app/services/groups/actor/get-actor-groups";
import { getGroupActors, GetGroupActorsResult } from "@app/services/groups/actor/get-group-actors";
import {
  updateActorGroup,
  UpdateActorGroupInput,
} from "@app/services/groups/actor/update-actor-group";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { DeleteMovieGroupBody } from "../movies/[id]";

export type GetActorGroupResponse = ActorGroup & {
  actors: GetGroupActorsResult;
};

export type DeleteActorGroupResponse = DeleteActorGroupResult;
export interface DeleteActorGroupBody extends Pick<DeleteActorGroupInput["where"], "id"> {}
export type UpdateActorGroupBody = UpdateActorGroupInput["data"];

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }

  const id = req.query.id as string;

  const actorGroups = await getActorGroups({ userId: session.uid! });
  var isTheOwner;

  actorGroups.forEach((actorGroup) => {
    if (actorGroup.id == id) {
      isTheOwner = true;
    }
  });

  if (!isTheOwner) {
    return res.status(404).end();
  }

  if (req.method === "GET") {
    const id = req.query.id as string;

    const actorGroup = await getActorGroup({ id });
    const groupActors = await getGroupActors({ id });
    //asign the additional attribute if group actor to the actorGroup and return
    Object.assign(actorGroup, { actors: groupActors });

    return res.send(actorGroup);
  }

  if (req.method === "PUT") {
    //grab the id from the request and add it to the body object passed into the updateActorGroup service
    const actorGroupId = req.query.id as string;
    const updatedActorGroupBody = req.body as UpdateActorGroupBody;
    const updatedActorGroup = await updateActorGroup({
      where: { id: actorGroupId },
      data: updatedActorGroupBody,
    });
    return res.send(updatedActorGroup);
  }

  if (req.method === "DELETE") {
    //grab the id from the body and send it in the object of the deleteActorGroup service
    const actorGroupDetails = req.body as DeleteMovieGroupBody;
    const deletedResult = (await deleteActorGroup({
      where: { id: actorGroupDetails.id },
    })) as DeleteActorGroupResponse;
    return res.send(deletedResult);
  }

  return res.status(404).end();
};

export default handler;
