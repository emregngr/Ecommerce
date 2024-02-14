import {useContext} from 'react';
import {EcomContext} from '../providers/EcomProvider';

export const useEcom = () => {
  const {
    state,
    setState,
    getProducts,
    primarySort,
    cleanSort,
    primaryFilter,
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
    primarySort,
    cleanSort,
    primaryFilter,
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
