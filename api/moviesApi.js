import axios from 'axios';

const BASE_URL = 'https://api.rapidmock.com/api/vikuman/v1';

export const fetchMoviesAndShows = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movies/all`);
    return response.data; // Assuming the API returns a list of movies/shows
  } catch (error) {
    console.error('Error fetching movies and shows:', error.message);
    throw error; // Rethrow the error for handling in the UI
  }
};