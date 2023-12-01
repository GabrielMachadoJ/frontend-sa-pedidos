import { createContext, useContext, useEffect, useState } from "react";
import { apiLaudelino } from "../service/api";

const RestauranteContext = createContext();

export function RestauranteProvider({ children }) {
  const [restaurantes, setRestaurantes] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const getRestaurants = async (categoria = null) => {
    try {
      let url = `/restaurantes?pagina=${page}`;
  
      if (categoria === null) {
        const response = await apiLaudelino.get(url);
        const totalDePaginas = response.data?.totalDePaginas;
        setTotalPage(totalDePaginas);
  
        const restaurants = response.data?.listagem;
        if (restaurants.length > 0) {
          setRestaurantes(restaurants);
        }
      } else {
        url += `&id-categoria=${categoria}`;
        const response = await apiLaudelino.get(url);
        const totalDePaginas = response.data?.totalDePaginas;
        setTotalPage(totalDePaginas);
  
        const restaurants = response.data?.listagem;
        if (restaurants.length > 0) {
          setRestaurantes(restaurants);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    getRestaurants();
  }, [page]); 

  return (
    <RestauranteContext.Provider value={{ getRestaurants, restaurantes, totalPage, isLoading, page, setPage }}>
      {children}
    </RestauranteContext.Provider>
  );
}

export const useRestauranteContext = () => useContext(RestauranteContext);
