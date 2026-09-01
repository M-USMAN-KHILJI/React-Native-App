import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONT_SIZES } from '../Const/Display';
import Overview from '../Screens/Main/Overview';
import Statistics from '../Screens/Main/Statistics';
import Collection from '../Screens/Main/Collection';
import CustomButton from '../Components/CustomButton';
const Tab = createMaterialTopTabNavigator();

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

const renderTabBar = (props) => <CustomTabBar {...props} />;

const ProfileTabs = () => (
  <Tab.Navigator
    initialRouteName="Overview"
    tabBar={renderTabBar}
    screenOptions={{
      swipeEnabled: true,
      tabBarStyle: styles.tabBarStyle,
      tabBarIndicatorStyle: { backgroundColor: 'transparent' },
      lazy: true,
    }}
  >
    <Tab.Screen >
      {
        props => <CustomButton title="Overview" onPress={() => props.navigation.navigate("Overview")} />
      }
    </Tab.Screen>
    <Tab.Screen name="Statistics" component={Statistics} options={{ tabBarLabel: 'Statistics' }} />
    <Tab.Screen name="Collection" component={Collection} options={{ tabBarLabel: 'Collection' }} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: wp(0),
    marginTop: hp(1),
    gap: wp(3),
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  tab: {
    flex: 1,
    paddingVertical: hp(1.5),
    borderRadius: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  tabActive: {
    backgroundColor: COLORS.activeChipBg,
    borderColor: COLORS.goldenBtn,
  },
  tabInactive: {
    backgroundColor: 'transparent',
    borderColor: COLORS.goldenBtn,
  },
  tabLabel: {
    fontSize: FONT_SIZES.bodyLarge,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: COLORS.activeChipText,
  },
  tabLabelInactive: {
    color: COLORS.gold,
  },
});

export { CustomTabBar, Tab, ProfileTabs };
export default ProfileTabs;
