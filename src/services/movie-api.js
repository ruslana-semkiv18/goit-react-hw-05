import axios from 'axios';

const url = 'https://api.themoviedb.org/3';
const key = 'b51bd0c5bcf436743fdef9ffe130d3a9';

const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTFiZDBjNWJjZjQzNjc0M2ZkZWY5ZmZlMTMwZDNhOSIsIm5iZiI6MTcyODEyMzEwMC43MTQyNTEsInN1YiI6IjY3MDEwOTQ3ZTg0ZWViMzVhMGY4NDk4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxulwmxslh8FRGagTmPj8c0DErNe2cekprvatiq9W7A'
  },
  params: {
    api_key: key,
  }
};


export const fetchMovieData = async (endPoint) => {
  const response = await axios.get(`${url}${endPoint}`, options);
  return response.data;
};


export const fetchSearchMovies = async (query) => {
  const response = await axios.get(`${url}/search/movie`, {
    ...options,
    params: {
      query,
    },
  });
  return response.data.results;
};

