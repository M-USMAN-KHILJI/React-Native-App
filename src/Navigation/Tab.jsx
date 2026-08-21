import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONT_SIZES } from '../Const/Display';

const Tab = createMaterialTopTabNavigator();

// Custom Top Tab Bar Component – reusable across screens
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.8}
            onPress={onPress}
            style={[
              styles.tab,
              isFocused ? styles.tabActive : styles.tabInactive,
            ]}
          >
            <Text
              style={[
                styles.tabLabel,
                isFocused ? styles.tabLabelActive : styles.tabLabelInactive,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: wp(5),
    marginTop: hp(1.5),
    gap: wp(2),
  },
  tab: {
    flex: 1,
    paddingVertical: hp(1.6),
    borderRadius: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: COLORS.activeChipBg,
  },
  tabInactive: {
    backgroundColor: COLORS.tabInactiveBg,
    borderWidth: 1,
    borderColor: COLORS.tabInactiveBorder,
  },
  tabLabel: {
    fontSize: hp(1.7),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  tabLabelActive: {
    color: COLORS.activeChipText,
  },
  tabLabelInactive: {
    color: COLORS.grayText,
  },
});

export { CustomTabBar, Tab };
export default CustomTabBar;
