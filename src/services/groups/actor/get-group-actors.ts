import { ActorGroup } from ".prisma/client";
import { getActor, GetActorResult } from "@app/services/actor/get-actor";
import { getActorGroup } from "./get-actor-group";

export type GetGroupActorsInput = { id: ActorGroup["id"] };
export type GetGroupActorsResult = GetActorResult[];

export async function getGroupActors(args: GetGroupActorsInput): Promise<GetGroupActorsResult> {
  const actorGroup = await getActorGroup({ id: args.id });
  if (!actorGroup) {
    return [];
  }

  const groupActorsPromises = actorGroup.actorIds.map((actorId) => getActor({ id: actorId }));
  return Promise.all(groupActorsPromises);
}
