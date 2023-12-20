/* eslint-disable react-hooks/exhaustive-deps */
import React, {useReducer, useState} from 'react';
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
import {SearchInput, RadioButton, Button} from '../../components';
import Close from '../../assets/icons/close.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {combineReducers} from '../../utils/combineReducers';
import {useEcom} from '../../hooks';

const initialState = {
  selectedSortType: null,
  selectedBrands: [],
  selectedModels: [],
};

export const Filters = ({navigation}) => {
  const [formState, setFormState] = useReducer(combineReducers, initialState);
  const {selectedSortType, selectedBrands, selectedModels} = formState || {};
  const {
    state: {products},
    cleanFilter,
    primaryFilters,
  } = useEcom();

  const [onlyBrands, setOnlyBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState(() => {
    products?.map(product => {
      if (!onlyBrands?.includes(product?.brand)) {
        onlyBrands?.push(product?.brand);
      }
    });
  });

  const [onlyModels, setOnlyModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState(() =>
    products?.map(product => {
      if (!onlyModels?.includes(product?.model)) {
        onlyModels?.push(product?.model);
      }
    }),
  );

  const onChangeBrandText = t => {
    t.length === 0
      ? setFilteredBrands(
          products?.map(product => {
            if (!onlyBrands?.includes(product?.brand)) {
              onlyBrands?.push(product?.brand);
            }
          }),
        )
      : setOnlyBrands(
          onlyBrands?.filter(brand => {
            return brand?.toUpperCase().includes(t?.toUpperCase());
          }),
        );
  };

  const onChangeModelText = t => {
    t.length === 0
      ? setFilteredModels(
          products?.map(product => {
            if (!onlyModels?.includes(product?.model)) {
              onlyModels?.push(product?.model);
            }
          }),
        )
      : setOnlyModels(
          onlyModels?.filter(model => {
            return model?.toUpperCase().includes(t?.toUpperCase());
          }),
        );
  };

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
          <Text style={styles.title}>Filter</Text>
          <Pressable
            style={styles.clean}
            onPress={() => {
              cleanFilter();
              navigation.pop();
            }}>
            <Text style={styles.cleanText}>Clean</Text>
          </Pressable>
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          bounces={false}
          enableOnAndroid>
          <Text style={[styles.text, {marginBottom: responsive.number(10)}]}>
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
          <View style={styles.line} />
          <Text style={[styles.text, {marginBottom: responsive.number(10)}]}>
            Brand
          </Text>
          <SearchInput onChangeText={onChangeBrandText} />
          {onlyBrands?.map((brand, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.radioButton}
                onPress={() => {
                  if (!selectedBrands?.includes(brand)) {
                    setFormState({
                      selectedBrands: [...selectedBrands, ...[brand]],
                    });
                  } else {
                    setFormState({
                      selectedBrands: selectedBrands.filter(
                        selectedBrand => selectedBrand !== brand,
                      ),
                    });
                  }
                }}>
                <RadioButton
                  selected={selectedBrands?.includes(brand)}
                  onPress={() => {
                    if (!selectedBrands?.includes(brand)) {
                      setFormState({
                        selectedBrands: [...selectedBrands, ...[brand]],
                      });
                    } else {
                      setFormState({
                        selectedBrands: selectedBrands.filter(
                          selectedBrand => selectedBrand !== brand,
                        ),
                      });
                    }
                  }}
                />
                <Text style={styles.text}>{brand}</Text>
              </TouchableOpacity>
            );
          })}
          <View style={styles.line} />
          <Text style={[styles.text, {marginBottom: responsive.number(10)}]}>
            Model
          </Text>
          <SearchInput onChangeText={onChangeModelText} />
          {onlyModels?.map((model, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.radioButton}
                onPress={() => {
                  if (!selectedModels?.includes(model)) {
                    setFormState({
                      selectedModels: [...selectedModels, ...[model]],
                    });
                  } else {
                    setFormState({
                      selectedModels: selectedModels.filter(
                        selectedModel => selectedModel !== model,
                      ),
                    });
                  }
                }}>
                <RadioButton
                  selected={selectedModels?.includes(model)}
                  onPress={() => {
                    if (!selectedModels?.includes(model)) {
                      setFormState({
                        selectedModels: [...selectedModels, ...[model]],
                      });
                    } else {
                      setFormState({
                        selectedModels: selectedModels.filter(
                          selectedModel => selectedModel !== model,
                        ),
                      });
                    }
                  }}
                />
                <Text style={styles.text}>{model}</Text>
              </TouchableOpacity>
            );
          })}
        </KeyboardAwareScrollView>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            label={'Primary'}
            disabled={
              selectedSortType === null &&
              selectedBrands.length === 0 &&
              selectedModels.length === 0
            }
            onPress={() => {
              primaryFilters(selectedSortType, selectedBrands, selectedModels);
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
    fontSize: responsive.fontSize(20),
    lineHeight: responsive.number(24),
    letterSpacing: responsive.number(0.1),
  },
  contentContainerStyle: {
    paddingBottom: responsive.number(24),
  },
  text: {
    color: theme.colors.black,
    fontSize: responsive.fontSize(16),
    lineHeight: responsive.number(24),
    letterSpacing: responsive.number(0.1),
    marginLeft: responsive.number(16),
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsive.number(16),
  },
  line: {
    width: '90%',
    alignSelf: 'center',
    height: responsive.number(2),
    backgroundColor: theme.colors.gray,
    borderRadius: responsive.number(8),
    marginVertical: responsive.number(15),
  },
  buttonContainer: {
    padding: responsive.number(16),
  },
  button: {
    width: '100%',
  },
});
