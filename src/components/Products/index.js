import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Product} from '../Product';
import {responsive} from '../../utils/responsive';

export const Products = ({products}) => {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={true}
      indicatorStyle="black"
      data={products}
      keyExtractor={item => item?.id}
      numColumns={2}
      renderItem={({item, index}) => {
        return <Product product={item} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: responsive.number(-50),
    marginHorizontal: responsive.number(16),
  },
  contentContainerStyle: {
    paddingBottom: responsive.number(40),
  },
});
