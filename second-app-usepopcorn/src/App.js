import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Seacrh from './components/search/Search';
import NumResults from './components/num-results/NumResults';
import { useMovies } from './hooks/useMovies';
import Main from './components/main/Main';
import Box from './components/box/Box';
import MovieList from './components/movie-list/MovieList';
import MovieDetails from './components/movie-details/MovieDetails';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import WatchedSummary from './components/watched-summary/WatchedSummary';
import WatchedMoviesList from './components/watched-movie-list/WatchedMovieList';

function App() {
  const [query, setQuery] = useState('');
  const { movies, isLoading, error } = useMovies(query);
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useLocalStorageState([], 'watched');

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  return (
    <>
      <Navbar>
        <Seacrh
          query={query}
          setQuery={setQuery}
        />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

export default App;
