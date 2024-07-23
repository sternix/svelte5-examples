import movies from "./movies.json";

let movieMap = {};

for (const movie of movies) {
  movieMap[movie.id] = movie;
}

export default movieMap;