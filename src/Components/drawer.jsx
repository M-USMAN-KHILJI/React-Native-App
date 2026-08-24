import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import { COLORS, FONT_SIZES } from '../Const/Display';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

// Map route names to drawer menu item names
const routeToMenuName = {
  Home: 'Home',
  Shop: 'Shop',
  Multiplayer: 'Multiplayer',
  Notifaction: 'Notifications',
};


const { width } = Dimensions.get('window');

const menuItems = [
  { name: 'Home', icon: 'home-outline' },
  { name: 'Shop', icon: 'storefront-outline' },
  { name: 'Collection', icon: 'layers-outline' },
  { name: 'Multiplayer', icon: 'account-multiple-outline' },
  { name: 'Events', icon: 'ticket-outline' },
  { name: 'Friends', icon: 'account-group-outline' },
  { name: 'Leaderboard', icon: 'trophy-outline' },
  { name: 'Round history', icon: 'history' },
  { name: 'Purchases', icon: 'receipt-outline' },
  { name: 'Profile', icon: 'account-circle-outline' },
  { name: 'Game Rules', icon: 'script-text-outline' },
  { name: 'Notifications', icon: 'bell-outline' },
  { name: 'Settings', icon: 'cog-outline' },
];

const DRAWER_WIDTH = width * 0.75; 

const CustomDrawer = ({ visible, onClose, onItemPress, onSignOut, navigation }) => {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const user = useSelector(state => state.auth.user);
  const credentials = useSelector(state => state.auth.credentials);

  const displayName = user?.name || credentials?.username || 'Guest';
  const displayEmail = user?.email || credentials?.email || 'No email provided';
  const initials = displayName.substring(0, 2).toUpperCase();

  const route = useRoute();
  const activeMenuName = routeToMenuName[route.name] || 'Home';

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Dark area outside drawer */}
        <Pressable style={styles.overlay} onPress={onClose} />

        {/* Drawer */}
        <Animated.View
          style={[
            styles.drawer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* Profile Header */}
          <View style={styles.containerheader}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileText}>{initials}</Text>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.username}>{displayName}</Text>
              <Text style={styles.email}>{displayEmail}</Text>
            </View>
          </View>

          {/* Menu List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.menuContent}
          >
            <Text style={styles.sectionTitle}>LOUNGE</Text>

            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.name}
                activeOpacity={0.7}
                onPress={() => {
                  if (item.name === 'Shop') {
                    onClose();
                    navigation?.navigate('Shop');
                  } else if (item.name === 'Home') {
                    onClose();
                    navigation?.navigate('Home');
                  } else if (item.name === 'Multiplayer') {
                    onClose();
                    navigation?.navigate('Multiplayer');
                  } else if (item.name === 'Notifications') {
                    onClose();
                    navigation?.navigate('Notifaction');
                  }
                  else {
                    if (onItemPress) onItemPress(item.name);
                  }
                }}
                style={[
                  styles.menuItem,
                  item.name === activeMenuName && styles.activeMenuItem,
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={hp('3.2%')}
                  color={COLORS.eyeIcon}
                  style={styles.icon}
                />

                <Text
                  style={[
                    styles.menuText,
                    item.name === activeMenuName && styles.activeMenuText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Sign Out Button */}
          <View style={styles.signOutContainer}>
            <TouchableOpacity
              style={styles.signOutButton}
              activeOpacity={0.8}
              onPress={() => {
                onClose();
                navigation?.navigate('Login');
              }}
            >
              <Text style={styles.signOutText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.background,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },

  drawer: {
    width: DRAWER_WIDTH,
    height: hp(100),
    backgroundColor: COLORS.homebackground,
    paddingTop: 50,
    paddingHorizontal: 18,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  containerheader: {
    width: wp(50),
    height: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileCircle: {
    width: wp(20),
    height: wp(20),
    marginLeft: wp(-2),
    borderRadius: wp(10.5),
    backgroundColor: '#08233D',
    borderWidth: 1,
    borderColor: '#3C5368',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileText: {
    color: '#FFEBA3',
    fontSize: hp(2.7),
    fontWeight: '600',
  },

  userInfo: {
    marginLeft: wp(2),
  },

  username: {
    color: '#FFEBA3',
    fontSize: FONT_SIZES.h6,
    fontWeight: '700',
    marginBottom: hp(1.2),
  },

  email: {
    color: '#B7B2C4',
    fontSize: hp('1.7%'),
    fontWeight: '400',
  },

  menuContent: {
    paddingTop: hp('1%'),
    paddingHorizontal: wp('4%'),
    // paddingBottom: hp('12%'),
  },

  sectionTitle: {
    color: '#C7C1D0',
    fontSize: hp('2.1%'),
    letterSpacing: 2,
    marginLeft: wp('2.5%'),
    marginBottom: hp('2.5%'),
    marginTop: hp('1%'),
  },

  menuItem: {
    height: hp(5),
    width: wp(100),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3.5%'),
    marginBottom: hp(1.2),
    borderRadius: wp('7%'),
    marginLeft: wp(-3),
  },

  activeMenuItem: {
    borderWidth: 1,
    borderColor: COLORS.eyeIcon,
    backgroundColor: 'rgba(30, 20, 65, 0.55)',
    height: hp(6),
    width: wp(63),
    marginBottom: hp(1.5),
  },

  icon: {
    width: wp('10%'),
    // marginRight: wp('3%'),
    textAlign: 'center',
  },

  menuText: {
    color: COLORS.eyeIcon,
    // fontSize: hp('2.5%'),
    // fontWeight: '500',
    letterSpacing: 0.2,
  },

  activeMenuText: {
    color: COLORS.eyeIcon,
    // fontWeight: '600',
  },

  signOutContainer: {
    paddingBottom: hp('2%'),
    paddingTop: hp('1%'),
  },

  signOutButton: {
    height: hp(6),
    borderRadius: wp('8%'),
    backgroundColor: '#E2B52F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },

  signOutText: {
    color: '#120D24',
    fontSize: hp('2.5%'),
    fontWeight: '700',
    letterSpacing: 1,
  },
});