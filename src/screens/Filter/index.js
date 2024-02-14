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
  selectedBrands: [],
  selectedModels: [],
};

export const Filter = ({navigation}) => {
  const [formState, setFormState] = useReducer(combineReducers, initialState);
  const {selectedBrands, selectedModels} = formState || {};
  const {
    state: {products},
    cleanFilter,
    primaryFilter,
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
    t?.length === 0
      ? setFilteredBrands(
          products?.map(product => {
            if (!onlyBrands?.includes(product?.brand)) {
              onlyBrands?.push(product?.brand);
            }
          }),
        )
      : setOnlyBrands(
          onlyBrands?.filter(brand => {
            return brand?.toLowerCase().includes(t?.toLowerCase());
          }),
        );
  };

  const onChangeModelText = t => {
    t?.length === 0
      ? setFilteredModels(
          products?.map(product => {
            if (!onlyModels?.includes(product?.model)) {
              onlyModels?.push(product?.model);
            }
          }),
        )
      : setOnlyModels(
          onlyModels?.filter(model => {
            return model?.toLowerCase().includes(t?.toLowerCase());
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
          <Text
            style={[
              styles.text,
              {
                fontSize: responsive.fontSize(18),
                marginBottom: responsive.number(10),
              },
            ]}>
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
          <Text
            style={[
              styles.text,
              {
                fontSize: responsive.fontSize(18),
                marginBottom: responsive.number(10),
              },
            ]}>
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
              selectedBrands.length === 0 && selectedModels.length === 0
            }
            onPress={() => {
              primaryFilter(selectedBrands, selectedModels);
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
  contentContainerStyle: {
    paddingBottom: responsive.number(24),
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
