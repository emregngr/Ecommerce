import {useContext} from 'react';
import {EcomContext} from '../providers/EcomProvider';

export const useEcom = () => {
  const {
    state,
    setState,
    getProducts,
    primaryFilters,
    cleanFilter,
    addToFavorites,
    removeFromFavorites,
    getFavoriteInfo,
    addToCart,
    removeFromCart,
    getQuantityInfo,
    saveFavorites,
    saveCart,
    getTotalProduct,
  } = useContext(EcomContext) || {};
  return {
    state,
    setState,
    getProducts,
    primaryFilters,
    cleanFilter,
    addToFavorites,
    removeFromFavorites,
    getFavoriteInfo,
    addToCart,
    removeFromCart,
    getQuantityInfo,
    saveFavorites,
    saveCart,
    getTotalProduct,
  };
};
