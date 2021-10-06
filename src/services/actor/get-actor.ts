import { Actor } from "@app/typings";

export type GetActorInput = {
  id: string;
};

export type GetActorResult = Actor; //| undefined;

export async function getActor(input: GetActorInput): Promise<GetActorResult> {
  const actorUrl = `https://api.themoviedb.org/3/person/${input.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const res = await fetch(actorUrl);

  // if (res.status !== 200) {
  //   return;
  // }

  const data = await res.json();

  return {
    ...data,
    birthday: new Date(data.birthday),
  };
}
