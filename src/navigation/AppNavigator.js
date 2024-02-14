/* eslint-disable react/no-unstable-nested-components */
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
import {Home} from '../screens/Home';
import {Basket} from '../screens/Basket';
import {Favorites} from '../screens/Favorites';
import {Profile} from '../screens/Profile';
import {ProductDetail} from '../screens/ProductDetail';
import {Tab} from '../components';
import {Sort} from '../screens/Sort';
import {Filter} from '../screens/Filter';
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
            options={{
              animation: 'slide_from_bottom',
              fullScreenGestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="Sort"
            component={Sort}
            options={{animation: 'slide_from_bottom', presentation: 'modal'}}
          />
          <Stack.Screen
            name="Filter"
            component={Filter}
            options={{animation: 'slide_from_bottom', presentation: 'modal'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
