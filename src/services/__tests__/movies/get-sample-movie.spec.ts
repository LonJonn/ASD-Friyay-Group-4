// This test requires for the node-fetch and mocked modules to be imported
import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';

// Import the service to be tested
import { getMovie } from '@app/services/movie/get-movie';

// Set node-fetch to be used globally during execution of the test
global.fetch = require("node-fetch");

// Load the sample data to be passed into the function
const movieSample = require('./sampeMovieData.json');

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
describe('getMovie test', () => {
  test('getMovie should retrieve the Dont Breathe movie', async () => {
    mocked(fetch).mockImplementation((): Promise<any> => {
      return Promise.resolve({
        json() {
          return Promise.resolve(movieSample);
        }
      });
    });

    // Call the get movie service and await for it to return a processed response
    const movie = await getMovie('300669');

    // Check that the processed movie title matches the expected value
    expect(movie.title).toEqual("Don't Breathe");
    
    // Check that the movie ID matches the exepcted value
    expect(movie.id).toEqual(300669);
    
    // Check that the release status matches the expected value
    expect(movie.status).toEqual("Released");
  })
})
