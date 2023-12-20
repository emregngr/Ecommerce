import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useEcom} from '../../hooks';
import {SearchInput, Products, Button} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../utils/theme';
import {responsive} from '../../utils/responsive';

export const Home = ({navigation}) => {
  const {
    state: {products, isFilter, filteredProducts},
    setState,
    getProducts,
  } = useEcom();

  const onChangeText = t => {
    t.length === 0
      ? getProducts()
      : isFilter
      ? setState({
          filteredProducts: filteredProducts?.filter(product => {
            return product?.name?.toUpperCase().includes(t?.toUpperCase());
          }),
        })
      : setState({
          products: products?.filter(product => {
            return product?.name?.toUpperCase().includes(t?.toUpperCase());
          }),
        });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
      </View>
      <SearchInput onChangeText={onChangeText} />
      <View style={styles.filtersContainer}>
        <Text style={styles.text}>Filters:</Text>
        <Button
          style={styles.button}
          label={'Select Filter'}
          onPress={() => {
            navigation.navigate('Filters');
          }}
        />
      </View>
      <Products products={isFilter ? filteredProducts : products} />
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
  title: {
    color: theme.colors.white,
    fontSize: responsive.fontSize(20),
    lineHeight: responsive.number(28),
    letterSpacing: responsive.number(0.1),
    fontWeight: 'bold',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    padding: responsive.number(16),
  },
  text: {
    color: theme.colors.black,
    fontSize: responsive.fontSize(16),
    lineHeight: responsive.number(24),
    letterSpacing: responsive.number(0.1),
  },
  button: {
    width: responsive.number(120),
  },
});
