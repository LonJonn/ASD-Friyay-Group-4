import { db } from "@app/lib/db";
import { ActorGroup } from ".prisma/client";

export type GetActorGroupInput = { id: ActorGroup["id"] };
export type GetActorGroupResult = ActorGroup | null;

export async function getActorGroup(args: GetActorGroupInput): Promise<GetActorGroupResult> {
  const getActorGroup = await db.actorGroup.findUnique({ where: args });
  return getActorGroup;
}
