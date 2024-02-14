/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {theme} from '../../utils/theme';
import {responsive} from '../../utils/responsive';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Button} from '../Button';
import StarActive from '../../assets/icons/star-active.svg';
import StarInActive from '../../assets/icons/star-inactive.svg';
import {useEcom} from '../../hooks';
import Minus from '../../assets/icons/minus.svg';
import Plus from '../../assets/icons/plus.svg';
import dayjs from 'dayjs';

export const Product = ({product}) => {
  const navigation = useNavigation();

  const [quantity, setQuantity] = useState(0);
  const [isFavorites, setIsFavorites] = useState(false);

  const {
    addToFavorites,
    removeFromFavorites,
    getFavoriteInfo,
    addToCart,
    removeFromCart,
    getQuantityInfo,
    saveFavorites,
    saveCart,
  } = useEcom();

  const {id, image, brand, name, model, createdAt, price} = product || {};

  useEffect(() => {
    setIsFavorites(getFavoriteInfo(id));
    saveFavorites();
  }, [addToFavorites, removeFromFavorites]);

  useEffect(() => {
    setQuantity(getQuantityInfo(id));
    saveCart();
  }, [addToCart, removeFromCart]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ProductDetail', {product})}>
      <TouchableOpacity
        style={styles.star}
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
        onPress={() => {
          isFavorites ? removeFromFavorites(product) : addToFavorites(product);
        }}>
        {isFavorites ? <StarActive /> : <StarInActive />}
      </TouchableOpacity>
      <FastImage source={{uri: image}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>Brand: </Text>
        <Text style={styles.text} numberOfLines={1}>
          {brand}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>Name: </Text>
        <Text style={styles.text} numberOfLines={1}>
          {name}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>Model: </Text>
        <Text style={styles.text} numberOfLines={1}>
          {model}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>Date: </Text>
        <Text style={styles.text} numberOfLines={1}>
          {dayjs(createdAt).format('YYYY-MM-DD')}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>Price: </Text>
        <Text style={styles.text} numberOfLines={1}>
          {price}
        </Text>
      </View>
      {quantity === 0 ? (
        <Button
          label={'Add to Cart'}
          style={styles.button}
          onPress={() => addToCart(product)}
        />
      ) : (
        <View style={styles.numberContainer}>
          <TouchableOpacity
            style={styles.minusPlusContainer}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={() => removeFromCart(product)}>
            <Minus />
          </TouchableOpacity>
          <View style={styles.numberTextContainer}>
            <Text style={styles.numberText}>{quantity}</Text>
          </View>
          <TouchableOpacity
            style={styles.minusPlusContainer}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={() => addToCart(product)}>
            <Plus />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '47%',
    margin: responsive.number(5),
    padding: responsive.number(10),
    paddingBottom: responsive.number(60),
    borderRadius: responsive.number(8),
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  star: {
    position: 'absolute',
    top: responsive.number(6),
    right: responsive.number(6),
    zIndex: 999,
  },
  image: {
    width: responsive.number(130),
    height: responsive.number(130),
    alignSelf: 'center',
    marginBottom: responsive.number(10),
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    color: theme.colors.black,
    fontSize: responsive.fontSize(16),
    lineHeight: responsive.number(24),
    letterSpacing: responsive.number(0.1),
  },
  button: {
    height: responsive.number(43),
    alignSelf: 'center',
    position: 'absolute',
    bottom: responsive.number(10),
  },
  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: responsive.number(8),
    backgroundColor: '#F1F3F5',
    alignSelf: 'center',
    position: 'absolute',
    bottom: responsive.number(10),
  },
  minusPlusContainer: {
    width: responsive.number(40),
    height: responsive.number(43),
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberTextContainer: {
    width: responsive.number(50),
    height: responsive.number(43),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  numberText: {
    color: theme.colors.white,
    fontSize: responsive.fontSize(16),
    lineHeight: responsive.number(24),
    letterSpacing: responsive.number(0.1),
  },
});
