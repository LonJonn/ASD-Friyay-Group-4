import { ActorGroup, Prisma } from ".prisma/client";
import { db } from "@app/lib/db";

export type DeleteActorGroupInput = Prisma.ActorGroupDeleteArgs;
export type DeleteActorGroupResult = ActorGroup;

export async function deleteActorGroup(
  args: DeleteActorGroupInput
): Promise<DeleteActorGroupResult> {
  const deleteActorResult = await db.actorGroup.delete(args);

  return deleteActorResult;
}
