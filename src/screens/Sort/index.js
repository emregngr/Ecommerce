/* eslint-disable react-hooks/exhaustive-deps */
import React, {useReducer} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../utils/theme';
import {responsive} from '../../utils/responsive';
import {RadioButton, Button} from '../../components';
import Close from '../../assets/icons/close.svg';
import {combineReducers} from '../../utils/combineReducers';
import {useEcom} from '../../hooks';

const initialState = {
  selectedSortType: null,
};

export const Sort = ({navigation}) => {
  const [formState, setFormState] = useReducer(combineReducers, initialState);
  const {selectedSortType} = formState || {};
  const {cleanSort, primarySort} = useEcom();

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => navigation.pop()}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Close />
          </TouchableOpacity>
          <Text style={styles.title}>Sort</Text>
          <Pressable
            style={styles.clean}
            onPress={() => {
              cleanSort();
              navigation.pop();
            }}>
            <Text style={styles.cleanText}>Clean</Text>
          </Pressable>
        </View>
        <View style={styles.sortContainer}>
          <Text
            style={[
              styles.text,
              {
                fontSize: responsive.fontSize(18),
                marginBottom: responsive.number(10),
              },
            ]}>
            Sort By
          </Text>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => {
              setFormState({selectedSortType: 1});
            }}>
            <RadioButton
              selected={selectedSortType === 1}
              onPress={() => {
                setFormState({selectedSortType: 1});
              }}
            />
            <Text style={styles.text}>Old to new</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => {
              setFormState({selectedSortType: 2});
            }}>
            <RadioButton
              selected={selectedSortType === 2}
              onPress={() => {
                setFormState({selectedSortType: 2});
              }}
            />
            <Text style={styles.text}>New to old</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => {
              setFormState({selectedSortType: 3});
            }}>
            <RadioButton
              selected={selectedSortType === 3}
              onPress={() => {
                setFormState({selectedSortType: 3});
              }}
            />
            <Text style={styles.text}>Price low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => {
              setFormState({selectedSortType: 4});
            }}>
            <RadioButton
              selected={selectedSortType === 4}
              onPress={() => {
                setFormState({selectedSortType: 4});
              }}
            />
            <Text style={styles.text}>Price hight to low</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            label={'Primary'}
            disabled={selectedSortType === null}
            onPress={() => {
              primarySort(selectedSortType);
              navigation.pop();
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    height: responsive.number(48),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.number(16),
  },
  close: {
    position: 'absolute',
    left: responsive.number(24),
  },
  title: {
    color: theme.colors.black,
    fontSize: responsive.fontSize(24),
    lineHeight: responsive.number(28),
    letterSpacing: responsive.number(0.1),
    fontWeight: 'bold',
  },
  clean: {
    position: 'absolute',
    right: responsive.number(24),
  },
  cleanText: {
    color: theme.colors.black,
    fontSize: responsive.fontSize(18),
    lineHeight: responsive.number(24),
    letterSpacing: responsive.number(0.1),
  },
  sortContainer: {
    flex: 1,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsive.number(16),
  },
  text: {
    color: theme.colors.black,
    fontSize: responsive.fontSize(16),
    lineHeight: responsive.number(24),
    letterSpacing: responsive.number(0.1),
    marginLeft: responsive.number(16),
  },
  buttonContainer: {
    padding: responsive.number(16),
  },
  button: {
    width: '100%',
  },
});
