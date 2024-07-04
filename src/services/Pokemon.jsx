
export const getAllPokeMan = async (url) => {
      const response = await fetch(url);
      return await response.json();
  };
  
  export const getPokemon = async (url) => {
      const response = await fetch(url);
      return await response.json();
  };
  