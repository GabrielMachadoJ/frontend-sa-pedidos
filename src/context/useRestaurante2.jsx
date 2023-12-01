import { createContext, useContext, useEffect, useState } from "react";
import { apiLaudelino } from "../service/api";

const RestauranteContext = createContext();

export function RestauranteProvider({ children }) {
  const [ restaurantes, setRestaurantes] = useState([]);
  const [ totalPage, setTotalPage] = useState(0);
  const [ isLoading, setIsLoading] = useState(false);
  const [ page, setPage] = useState(0);

  useEffect(() => {
    const getRestaurants = async (categoria = null) => {
      try {
  
        let url = `/restaurantes?pagina=${page}`;
  
        const categoriaSelecionada = categoria;
        if (categoriaSelecionada != null) {
          url += `&id-categoria=${categoriaSelecionada}`;
        }
        const response = await apiLaudelino.get(url);
        const totalDePaginas = response.data?.totalDePaginas;
        setTotalPage(totalDePaginas);
  
        const restaurants = response.data?.listagem;
        if (restaurants.length > 0) {
          setRestaurantes(restaurants);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getRestaurants();
  }, [])

  return (
    <RestauranteProvider.Provider value={{ getRestaurants, restaurantes, totalPage, isLoading }}>
      {children}
    </RestauranteProvider.Provider>
  );
}

export const useRestauranteContext = () =>  useContext(RestauranteContext);


