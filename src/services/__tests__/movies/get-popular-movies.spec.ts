// This test requires for the node-fetch and mocked modules to be imported
import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';

// Import the service to be tested
import { getPopularMovies } from '@app/services/movie/get-popular-movies';

// Set node-fetch to be used globally during execution of the test
global.fetch = require("node-fetch");

// Load the sample data to be passed into the function
const popularMoviesSample = require('./popularMoviesData.json');

// Tell Jest to mock node-fetch
jest.mock('node-fetch', () => {
  return jest.fn();
});

// Clear existing mocks
beforeEach(() => {
  mocked(fetch).mockClear();
});

// The test
// Jest is configured to mock the fetch function in the servic
// When the fetch function is called, the sample data is returned
describe('getPopularMovies test', () => {
  test('getPopularMovies should retrieve 20 popular movies', async () => {
    mocked(fetch).mockImplementation((): Promise<any> => {
      return Promise.resolve({
        json() {
          return Promise.resolve(popularMoviesSample);
        }
      });
    });

    // Call the getPopularMovies function and await for it to return processed results
    const popularMovies = await getPopularMovies();
    
    // Check that the length of the returned array is equal to 20 
    expect(popularMovies).toHaveLength(20);
  })
})
