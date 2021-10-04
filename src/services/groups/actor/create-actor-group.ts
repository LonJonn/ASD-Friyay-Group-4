import { ActorGroup, Prisma } from ".prisma/client";
import { db } from "@app/lib/db";

export type CreateActorGroupInput = Prisma.ActorGroupCreateArgs;
export type CreateActorGroupResult = ActorGroup;

export async function createActorGroup(
  args: CreateActorGroupInput
): Promise<CreateActorGroupResult> {
  const createdActorGroup = await db.actorGroup.create(args);
  return createdActorGroup;
}
