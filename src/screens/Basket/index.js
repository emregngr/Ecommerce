import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {useEcom} from '../../hooks';
import {CartProduct, Button} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../utils/theme';
import {responsive} from '../../utils/responsive';

export const Basket = () => {
  const {
    state: {cartProducts},
  } = useEcom();

  const onlyProducts = [];
  const cartProductsWithQuantity = cartProducts
    .map(cartProduct => {
      if (!onlyProducts.includes(cartProduct?.id)) {
        onlyProducts.push(cartProduct?.id);
        const quantity = cartProducts?.filter(
          innerCartProduct => innerCartProduct?.id === cartProduct?.id,
        ).length;

        return {
          ...cartProduct,
          quantity,
        };
      }
    })
    .filter(filterItem => filterItem);

  const getTotalPrice = () => {
    return cartProductsWithQuantity
      ?.reduce(
        (previousTotal, cartProduct) =>
          previousTotal + Number(cartProduct?.price) * cartProduct?.quantity,
        0,
      )
      ?.toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Basket</Text>
      </View>
      <FlatList
        style={styles.flatlistContainercontainer}
        contentContainerStyle={styles.contentContainerStyle}
        data={cartProductsWithQuantity}
        keyExtractor={item => item?.id}
        renderItem={({item, index}) => {
          return <CartProduct product={item} />;
        }}
      />
      <View style={styles.buttonContainer}>
        <View>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>Total:</Text>
          <Text style={styles.text}>{getTotalPrice()}</Text>
        </View>
        <Button label={'Complete'} style={styles.button} />
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
    marginBottom: responsive.number(28),
  },
  title: {
    color: theme.colors.white,
    fontSize: responsive.fontSize(20),
    lineHeight: responsive.number(28),
    letterSpacing: responsive.number(0.1),
    fontWeight: 'bold',
  },
  flatlistContainer: {
    marginBottom: responsive.number(-50),
    marginHorizontal: responsive.number(16),
  },
  contentContainerStyle: {
    paddingBottom: responsive.number(40),
  },
  text: {
    color: theme.colors.black,
    fontSize: responsive.fontSize(16),
    lineHeight: responsive.number(24),
    letterSpacing: responsive.number(0.1),
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: responsive.number(16),
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    width: responsive.number(160),
  },
});
