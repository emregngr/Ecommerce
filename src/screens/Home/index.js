import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useEcom} from '../../hooks';
import {SearchInput, Products} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../utils/theme';
import {responsive} from '../../utils/responsive';
import Sort from '../../assets/icons/sort.svg';
import Filter from '../../assets/icons/filter.svg';

export const Home = ({navigation}) => {
  const {
    state: {products, isSort, isFilter, sortedProducts, filteredProducts},
    setState,
    getProducts,
  } = useEcom();

  const onChangeText = t => {
    t?.length === 0
      ? (getProducts(), setState({isSort: false, isFilter: false}))
      : isSort
      ? setState({
          sortedProducts: sortedProducts?.filter(product => {
            return product?.name?.toLowerCase().includes(t?.toLowerCase());
          }),
        })
      : isFilter
      ? setState({
          filteredProducts: filteredProducts?.filter(product => {
            return product?.name?.toLowerCase().includes(t?.toLowerCase());
          }),
        })
      : setState({
          products: products?.filter(product => {
            return product?.name?.toLowerCase().includes(t?.toLowerCase());
          }),
        });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
      </View>
      <SearchInput onChangeText={onChangeText} />
      <View style={styles.insideContainer}>
        <Text style={styles.productsText}>Products</Text>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.sortContainer}
            onPress={() => {
              navigation.navigate('Sort');
            }}>
            <Sort width={24} height={24} />
            <Text style={styles.text}>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterContainer}
            onPress={() => {
              navigation.navigate('Filter');
            }}>
            <Filter width={24} height={24} />
            <Text style={styles.text}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Products
        products={
          isSort ? sortedProducts : isFilter ? filteredProducts : products
        }
      />
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
  insideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    padding: responsive.number(16),
  },
  productsText: {
    color: theme.colors.black,
    fontSize: responsive.fontSize(18),
    lineHeight: responsive.number(24),
    letterSpacing: responsive.number(0.1),
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: responsive.number(10),
    color: theme.colors.black,
    fontSize: responsive.fontSize(16),
    lineHeight: responsive.number(24),
    letterSpacing: responsive.number(0.1),
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: responsive.number(32),
  },
  button: {
    width: responsive.number(120),
  },
});
