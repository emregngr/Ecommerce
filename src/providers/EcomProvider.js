import React, {createContext, useReducer} from 'react';
import {combineReducers} from '../utils/combineReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANTS} from '../enums';

const EcomContext = createContext();
const {Provider, Consumer: EcomConsumer} = EcomContext || {};

const initialState = {
  loading: false,
  products: [],
  isSort: false,
  isFilter: false,
  sortedProducts: [],
  filteredProducts: [],
  favorites: [],
  cartProducts: [],
  totalProduct: null,
  totalPrice: null,
};

const EcomProvider = ({children}) => {
  const [state, setState] = useReducer(combineReducers, initialState);

  const getProducts = async () => {
    const response = await fetch(
      'https://5fc9346b2af77700165ae514.mockapi.io/products',
    );
    const data = await response.json();
    setState({products: data});
  };

  const primarySort = selectedSortType => {
    setState({
      isSort: true,
      isFilter: false,
      sortedProducts: state?.products
        ?.slice()
        ?.sort((a, b) =>
          selectedSortType === 1
            ? new Date(a?.createdAt) - new Date(b?.createdAt)
            : selectedSortType === 2
            ? new Date(b?.createdAt) - new Date(a?.createdAt)
            : selectedSortType === 3
            ? a?.price - b?.price
            : selectedSortType === 4
            ? b?.price - a?.price
            : a - b,
        ),
    });
  };

  const cleanSort = () => {
    setState({
      isSort: false,
    });
  };

  const primaryFilter = (selectedBrands, selectedModels) => {
    setState({
      isFilter: true,
      isSort: false,
      filteredProducts: state?.products?.filter(product =>
        selectedBrands.length !== 0 && selectedModels.length !== 0
          ? selectedBrands.includes(product?.brand) &&
            selectedModels.includes(product?.model)
          : selectedBrands.length !== 0
          ? selectedBrands.includes(product?.brand)
          : selectedModels.length !== 0
          ? selectedModels.includes(product?.model)
          : product,
      ),
    });
  };

  const cleanFilter = () => {
    setState({
      isFilter: false,
    });
  };

  const addToFavorites = product => {
    setState({
      favorites: [...state?.favorites, ...[product]],
    });
  };

  const removeFromFavorites = product => {
    setState({
      favorites: state?.favorites?.filter(
        favorite => favorite?.id !== product?.id,
      ),
    });
  };

  const getFavoriteInfo = productId => {
    const filteredFavorite = state?.favorites?.filter(
      favorite => favorite?.id === productId,
    )?.length;
    return filteredFavorite === 1 ? true : false;
  };

  const addToCart = async product => {
    setState({
      cartProducts: [...state?.cartProducts, ...[product]],
    });
    getTotalProduct();
  };

  const removeFromCart = async product => {
    const temporaryCartProducts = state?.cartProducts;
    temporaryCartProducts?.splice(
      state?.cartProducts?.findIndex(item => item?.id === product?.id),
      1,
    );
    setState({
      cartProducts: temporaryCartProducts,
    });
    getTotalProduct();
  };

  const getQuantityInfo = productId => {
    const quantity = state?.cartProducts?.filter(
      cartItem => cartItem?.id === productId,
    )?.length;
    return quantity;
  };

  const getTotalProduct = () => {
    setState({
      totalProduct: state?.cartProducts?.length,
    });
  };

  const saveFavorites = async () => {
    try {
      await AsyncStorage.setItem(
        CONSTANTS.FAVORITES_PRODUCTS,
        JSON.stringify(state?.favorites),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const saveCart = async () => {
    try {
      await AsyncStorage.setItem(
        CONSTANTS.CART_PRODUCTS,
        JSON.stringify(state?.cartProducts),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
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

  return <Provider value={value}>{children}</Provider>;
};

export {EcomProvider, EcomContext, EcomConsumer};
