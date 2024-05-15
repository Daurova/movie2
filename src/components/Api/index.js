const apiKey = '7e14147cbafc9f8e4f095ea26ebf8692';

export default class Service {
  async getGanres() {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`);
      if (response.ok) {
        const data = await response.json();
        const genre = data.genres;
        return genre;
      } else {
        console.error('Failed to create guest session');
      }
    } catch (error) {
      console.error('Error creating guest session:', error);
    }
  }

  async createGuestSession() {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`);
      if (response.ok) {
        const data = await response.json();
        return data.guest_session_id;
      } else {
        console.error('Failed to create guest session');
      }
    } catch (error) {
      console.error('Error creating guest session:', error);
    }
  }

  async searchMovies(searchQuery) {
    console.log(searchQuery);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery.value}&page=${searchQuery?.page ?? 1}&per_page=20`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch movies');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }

  async rateMovie(searchQuery) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTE0MTQ3Y2JhZmM5ZjhlNGYwOTVlYTI2ZWJmODY5MiIsInN1YiI6IjY2MzIzNmQ3YWQ1OWI1MDEyODZjYTdjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.50trAargRmCN6qwVT2HJIVnC64YOxwQxmzyS9VREfPQ',
      },
      body: JSON.stringify({
        value: `${searchQuery.valueRate}`,
      }),
    };
    const guestSessionId = localStorage.getItem('sessionId');
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${searchQuery.movieId}/rating?guest_session_id=${guestSessionId}`,
      options
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error('Failed to fetch movies');
    }

    localStorage.setItem('movieRatedId', searchQuery.movieId);
    localStorage.setItem('myRating', searchQuery.valueRate);
  }

  async getRatedMovies(searchQuery) {
    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${searchQuery.guestSessionId}/rated/movies?api_key=${apiKey}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch movies');
    }
  }
}
