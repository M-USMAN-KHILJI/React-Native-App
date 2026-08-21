import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenHarder from '../../Components/screenHarder';
import { COLORS } from '../../Const/Display';
import SentTab from './Sent';
import ReceivedTab from './Resived';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createMaterialTopTabNavigator();

// ──────────── Custom Top Tab Bar ────────────
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={tabBarStyles.container}>
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

        if (isFocused) {
          return (
            <LinearGradient
              key={route.key}
              colors={['#c3971ea8', '#d5b139', '#ddb941']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={tabBarStyles.tab}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={tabBarStyles.tabTouchable}
              >
                <Text style={[tabBarStyles.tabLabel, tabBarStyles.tabLabelActive]}>
                  {label}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.8}
            onPress={onPress}
            style={[tabBarStyles.tab, tabBarStyles.tabInactive]}
          >
            <Text style={[tabBarStyles.tabLabel, tabBarStyles.tabLabelInactive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const tabBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: wp(5),
    marginTop: hp(1.5),
    gap: wp(2),
  },
  tab: {
    flex: 1,
    borderRadius: wp(8),
    overflow: 'hidden',
  },
  tabTouchable: {
    flex: 1,
    paddingVertical: hp(1.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabInactive: {
    paddingVertical: hp(1.6),
    alignItems: 'center',
    justifyContent: 'center',
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

// ──────────── Main Challenges Screen ────────────
const Challenges = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ScreenHarder
        title="CHALLENGES"
        subtitle="HAITIAN CARD LOUNGE"
        onPress={() => navigation.goBack()}
      />

      {/* Top Tab Navigator */}
      <View style={styles.tabContainer}>
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{
            lazy: true,
            swipeEnabled: true,
          }}
        >
          <Tab.Screen
            name="Sent"
            component={SentTab}
            options={{ tabBarLabel: 'SENT' }}
          />
          <Tab.Screen
            name="Received"
            component={ReceivedTab}
            options={{ tabBarLabel: 'RECEIVED' }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.homebackground,
  },
  tabContainer: {
    flex: 1,
    marginTop: hp(1),
  },
});

export default Challenges;