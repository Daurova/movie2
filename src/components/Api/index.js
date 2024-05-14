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
      };


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
      };
  

}

