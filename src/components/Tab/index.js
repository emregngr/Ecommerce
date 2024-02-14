import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {responsive} from '../../utils/responsive';
import {theme} from '../../utils/theme';
import {useEcom} from '../../hooks';
import HomeActiveIcon from '../../assets/icons/tab/home-active.svg';
import HomeInActiveIcon from '../../assets/icons/tab/home-inactive.svg';
import BasketActiveIcon from '../../assets/icons/tab/basket-active.svg';
import BasketInActiveIcon from '../../assets/icons/tab/basket-inactive.svg';
import FavoritesActiveIcon from '../../assets/icons/tab/favorites-active.svg';
import FavoritesInActiveIcon from '../../assets/icons/tab/favorites-inactive.svg';
import ProfileActiveIcon from '../../assets/icons/tab/profile-active.svg';
import ProfileInActiveIcon from '../../assets/icons/tab/profile-inactive.svg';

const Touchable =
  Platform.OS === 'android'
    ? TouchableNativeFeedback
    : TouchableWithoutFeedback;

export const Tab = ({state, navigation}) => {
  const {index: currentIndex = 0} = state || {};

  const {
    state: {totalProduct},
  } = useEcom();

  const handlePress = route => {
    navigation.navigate(route);
  };

  return (
    <View style={[styles.container]}>
      <TabButton
        onPress={() => handlePress('Home')}
        icon={currentIndex === 0 ? <HomeActiveIcon /> : <HomeInActiveIcon />}
      />
      <TabButton
        onPress={() => handlePress('Basket')}
        icon={
          currentIndex === 1 ? <BasketActiveIcon /> : <BasketInActiveIcon />
        }
        badge={totalProduct}
      />
      <TabButton
        onPress={() => handlePress('Favorites')}
        icon={
          currentIndex === 2 ? (
            <FavoritesActiveIcon />
          ) : (
            <FavoritesInActiveIcon />
          )
        }
      />
      <TabButton
        onPress={() => handlePress('Profile')}
        icon={
          currentIndex === 3 ? <ProfileActiveIcon /> : <ProfileInActiveIcon />
        }
      />
    </View>
  );
};

const TabButton = ({icon, onPress, badge}) => {
  const {bottom} = useSafeAreaInsets();
  const containerStyle = {
    paddingBottom: bottom === 0 ? responsive.number(10) : bottom,
  };

  return (
    <Touchable
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple(theme.colors.primary, false)}>
      <View style={[styles.buttonContainer, containerStyle]}>
        <View style={styles.tabIconContainer}>{icon}</View>
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: responsive.number(15),
  },
  tabIconContainer: {
    justifyContent: 'flex-end',
  },
  badge: {
    position: 'absolute',
    top: responsive.number(10),
    right: responsive.number(20),
    justifyContent: 'center',
    alignItems: 'center',
    width: responsive.number(20),
    height: responsive.number(20),
    backgroundColor: theme.colors.red,
    borderRadius: responsive.number(50),
  },
  badgeText: {
    color: theme.colors.white,
    fontSize: responsive.fontSize(11),
    lineHeight: responsive.number(14),
    letterSpacing: responsive.number(0.1),
    fontWeight: 'bold',
  },
});
