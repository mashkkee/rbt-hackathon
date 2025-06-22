const UNSPLASH_ACCESS_KEY = 'V5FbIIJPljAaL1s65Q6EWA92E1IpI9hwWeJX6BWh0DE'; // direktno

export const getImageForCity = async (cityName) => {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cityName)}-city&orientation=landscape&per_page=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Image API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results[0]?.urls?.regular || null;
  } catch (error) {
    console.error(`Greška prilikom dohvatanja slike za "${cityName}":`, error);
    return null;
  }
};
