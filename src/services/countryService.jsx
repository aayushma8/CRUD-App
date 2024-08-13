export const getCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      return data.map(country => country.name.common);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      return [];
    }
  };
  