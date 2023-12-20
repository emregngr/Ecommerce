/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANTS} from '../enums';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {theme} from '../utils/theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Home} from '../containers/Home';
import {Basket} from '../containers/Basket';
import {Favorites} from '../containers/Favorites';
import {Profile} from '../containers/Profile';
import {ProductDetail} from '../containers/ProductDetail';
import {Tab} from '../components';
import {Filters} from '../containers/Filters';
import {useEcom} from '../hooks';

const BottomTab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <Tab {...props} />}>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Basket" component={Basket} />
      <BottomTab.Screen name="Favorites" component={Favorites} />
      <BottomTab.Screen name="Profile" component={Profile} />
    </BottomTab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const {
    state: {cartProducts},
    setState,
    getProducts,
    getTotalProduct,
  } = useEcom();

  useEffect(() => {
    const getSavedCartProducts = async () => {
      try {
        const savedCartProducts = JSON.parse(
          (await AsyncStorage.getItem(CONSTANTS.CART_PRODUCTS)) || [],
        );
        setState({
          cartProducts: savedCartProducts,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getSavedCartProducts();
  }, []);

  useEffect(() => {
    const getSavedFavorites = async () => {
      try {
        const savedFavorites = JSON.parse(
          (await AsyncStorage.getItem(CONSTANTS.FAVORITES_PRODUCTS)) || [],
        );
        setState({
          favorites: savedFavorites,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getSavedFavorites();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getTotalProduct();
  }, [cartProducts]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            presentation: 'containedTransparentModal',
            headerShown: false,
            animation: 'fade',
            contentStyle: {
              backgroundColor: theme.colors.overlay,
            },
          }}>
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Filters"
            component={Filters}
            options={{animation: 'slide_from_bottom', presentation: 'modal'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
