import { useState } from "react";
import axios from "axios";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchGetProducts = async () => {
    try {
      const url = "https://fakestoreapi.com/products/";
      const { data, status } = await axios(url);
      if (status === 200) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    products,
    fetchGetProducts,
  };
};

export default useProducts;
