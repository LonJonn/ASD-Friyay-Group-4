import {
  createActorGroup,
  CreateActorGroupInput,
  CreateActorGroupResult,
} from "@app/services/groups/actor/create-actor-group";
import { getActorGroups, SummarisedActorGroup } from "@app/services/groups/actor/get-actor-groups";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

export interface ActorGroupPostBody extends Pick<CreateActorGroupInput["data"], "emoji" | "name"> {}

export type GetActorGroupsResponse = SummarisedActorGroup[];
export type CreateActorGroupResponse = CreateActorGroupResult;

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }

  if (req.method === "GET") {
    const actorGroups = (await getActorGroups({ userId: session.uid! })) as GetActorGroupsResponse;
    return res.send(actorGroups);
  }

  if (req.method === "POST") {
    const actorGroupDetails = req.body as ActorGroupPostBody;
    const newActorGroup = (await createActorGroup({
      data: {
        name: actorGroupDetails.name,
        emoji: actorGroupDetails.emoji,
        ownerId: session.uid!,
      },
    })) as CreateActorGroupResponse;

    return res.send(newActorGroup);
  }

  return res.status(404).end();
};

export default handler;
