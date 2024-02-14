import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {responsive} from '../../utils/responsive';
import {theme} from '../../utils/theme';
import SearchIcon from '../../assets/icons/search.svg';

export const SearchInput = ({onChangeText}) => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef(null);

  return (
    <View
      style={[
        styles.searchButtonContainer,
        {
          paddingRight: isFocus ? responsive.number(80) : responsive.number(16),
        },
      ]}>
      <View style={styles.searchButton}>
        <SearchIcon />
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            placeholder={'Search'}
            placeholderTextColor={theme.colors.gray}
            onChangeText={onChangeText}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </View>
      </View>
      <Pressable
        style={styles.cancel}
        onPress={() => {
          Keyboard.dismiss();
          setIsFocus(false);
        }}
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
        <Text>Cancel</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  searchButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#F1F3F5',
    marginHorizontal: responsive.number(16),
    marginBottom: responsive.number(16),
    paddingHorizontal: responsive.number(20),
    borderRadius: responsive.number(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    height: responsive.number(42),
    paddingLeft: responsive.number(16),
    justifyContent: 'center',
  },
  textInput: {
    color: theme.colors.black,
    fontSize: responsive.fontSize(16),
    lineHeight: responsive.number(18),
    letterSpacing: responsive.number(0.1),
  },
  cancel: {
    marginBottom: responsive.number(16),
  },
});
