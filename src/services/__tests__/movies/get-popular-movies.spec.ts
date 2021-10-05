import { PopularMoviesResponse } from "@app/typings";
import { getMovie } from "../../movie/get-movie";
require('node-fetch');
require('jest-fetch-mock').enableMocks()

test("It grabs popular movies", async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=e4fa39bf6f208cb92054054b1c0398d4`
  );

  const popularMoviesData = (await response.json()) as PopularMoviesResponse;

  expect(popularMoviesData.results.length).toBeGreaterThan(0);
});

// test("It computes first names for users", async () => {
//   const allUsers = await getAllUsers();
//   const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];

//   expect(randomUser.firstName).toBeDefined();
// });
