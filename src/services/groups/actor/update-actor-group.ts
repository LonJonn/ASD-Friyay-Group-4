import { ActorGroup, Prisma } from ".prisma/client";
import { db } from "@app/lib/db";

export type UpdateActorGroupInput = {
  where: { id: ActorGroup["id"] };
  data: Prisma.ActorGroupUpdateInput;
};
export type UpdateActorGroupResult = ActorGroup;

export async function updateActorGroup(
  args: UpdateActorGroupInput
): Promise<UpdateActorGroupResult> {
  const updatedActorGroup = await db.actorGroup.update(args);
  return updatedActorGroup;
}
