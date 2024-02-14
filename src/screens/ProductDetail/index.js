/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../utils/theme';
import {responsive} from '../../utils/responsive';
import FastImage from 'react-native-fast-image';
import ArrowBack from '../../assets/icons/arrowBack.svg';
import {Button} from '../../components';
import StarActive from '../../assets/icons/star-active.svg';
import StarInActive from '../../assets/icons/star-inactive.svg';
import {useEcom} from '../../hooks';
import Minus from '../../assets/icons/minus.svg';
import Plus from '../../assets/icons/plus.svg';

export const ProductDetail = ({navigation, route}) => {
  const {product} = route?.params;

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

  const {id, image, description, brand, name, model, price} = product || {};

  useEffect(() => {
    setIsFavorites(getFavoriteInfo(id));
    saveFavorites();
  }, [addToFavorites, removeFromFavorites]);

  useEffect(() => {
    setQuantity(getQuantityInfo(id));
    saveCart();
  }, [addToCart, removeFromCart]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.close}
          onPress={() => navigation.pop()}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
          <ArrowBack />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
        {isFavorites ? (
          <TouchableOpacity
            style={styles.star}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={() => removeFromFavorites(product)}>
            <StarActive />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.star}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={() => addToFavorites(product)}>
            <StarInActive />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainerStyle}>
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
        <View>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>Description:</Text>
          <Text style={styles.text}>{description}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>Price:</Text>
          <Text style={styles.text}>{price}</Text>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    backgroundColor: theme.colors.primary,
    height: responsive.number(64),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.number(16),
  },
  close: {
    position: 'absolute',
    left: responsive.number(24),
  },
  title: {
    color: theme.colors.white,
    fontSize: responsive.fontSize(20),
    lineHeight: responsive.number(28),
    letterSpacing: responsive.number(0.1),
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: responsive.number(16),
  },
  contentContainerStyle: {
    paddingBottom: responsive.number(24),
  },
  star: {
    position: 'absolute',
    right: responsive.number(24),
    zIndex: 999,
  },
  image: {
    width: '100%',
    height: responsive.number(225),
    alignSelf: 'center',
    marginHorizontal: responsive.number(16),
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
  buttonContainer: {
    flexDirection: 'row',
    padding: responsive.number(16),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: responsive.number(160),
    height: responsive.number(43),
  },
  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: responsive.number(8),
    backgroundColor: '#F1F3F5',
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
