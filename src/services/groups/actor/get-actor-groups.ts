import { db } from "@app/lib/db";
import { ActorGroup, MovieGroup, User } from ".prisma/client";
import { getActor } from "@app/services/actor/get-actor";

export type GetActorGroupsInput = { userId: User["id"] };
export type GetActorGroupsResult = SummarisedActorGroup[];

export interface SummarisedActorGroup {
  id: ActorGroup["id"];
  emoji: ActorGroup["emoji"];
  name: ActorGroup["name"];
  imageBackdrop: string;
  actorIds: string[];
}

export async function getActorGroups(args: GetActorGroupsInput): Promise<GetActorGroupsResult> {
  const actorGroups = await db.actorGroup.findMany({ where: { ownerId: args.userId } });

  const summarisedActorGroups = actorGroups.map(
    async (actorGroup): Promise<SummarisedActorGroup> => {
      var imageBackdrop = "https://via.placeholder.com/1000";
      if (actorGroup.actorIds.length > 0) {
        const actorData = await getActor({
          id: actorGroup.actorIds[actorGroup.actorIds.length - 1],
        });
        imageBackdrop = actorData!.profile_path;
      }

      return {
        id: actorGroup.id,
        emoji: actorGroup.emoji,
        imageBackdrop: imageBackdrop,
        name: actorGroup.name,
        actorIds: actorGroup.actorIds,
      };
    }
  );
  return await Promise.all(summarisedActorGroups);
}
