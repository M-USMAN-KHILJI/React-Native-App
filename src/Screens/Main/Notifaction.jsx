// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { COLORS, FONT_SIZES } from '../../Const/Display';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import CustomDrawer from '../../Components/drawer';

import {
        View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Button,
    Platform,
    KeyboardAvoidingView,
    Alert,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard,
    wp,
    hp,
    COLORS,
    FONT_SIZES,
    logo,
    SafeAreaView,
    FontAwesome,
    CustomInput,
    CustomButton,
    GoogleButton,
    React,
    useState,
    useEffect,
    useContext,
    AuthHeader,
    useRef,
    TermsBottomSheet,
    useGoogleSignIn,
    Modal,
    Dimensions,
    MaterialCommunityIcons,
    screenHarder,
    LinearGradient,
    CustomDrawer
} from "../../api/Index.js";

const Notifaction = ({ navigation }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomDrawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        navigation={navigation}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.menuButton}
          onPress={() => setIsDrawerVisible(true)}
        >
          <MaterialCommunityIcons name="menu" size={hp(3)} color={COLORS.eyeIcon} />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerSubtitle}>HAITIAN CARD LOUNGE</Text>
          <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
        </View>
      </View>

      {/* Activity Section Header */}
      <View style={styles.activityRow}>
        <View>
          <Text style={styles.activityLabel}>ACTIVITY</Text>
          <Text style={styles.emptyLabel}>Empty</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.deleteAllButton}
          onPress={handleDeleteAll}
        >
          <Text style={styles.deleteAllText}>Delete All</Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          {/* Bell Icon Circle */}
          <View style={styles.bellCircle}>
            <MaterialCommunityIcons name="bell-outline" size={hp(4)} color={COLORS.textColor} />
          </View>

          <Text style={styles.emptyTitle}>No notifications yet</Text>
          <Text style={styles.emptyMessage}>
            Friend requests, events, and match updates will{'\n'}show up here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Text style={styles.notificationText}>{item.message}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.outerBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingTop: hp(1.5),
    paddingBottom: hp(1),
  },
  menuButton: {
    width: hp(4.5),
    height: hp(4.5),
    borderRadius: hp(2.75),
    borderWidth: 1,
    borderColor: COLORS.eyeIcon,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    marginLeft: wp(4),
  },
  headerSubtitle: {
    color: COLORS.toPlay,
    fontSize: hp(1.4),
    letterSpacing: wp(0.6),
  },
  headerTitle: {
    color: COLORS.textColor,
    fontSize: FONT_SIZES.h4,
    fontWeight: 'bold',
    letterSpacing: wp(0.3),
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginTop: hp(2),
  },
  activityLabel: {
    color: COLORS.toPlay,
    fontSize: hp(1.4),
    letterSpacing: wp(0.5),
  },
  emptyLabel: {
    color: COLORS.textColor,
    fontSize: hp(2),
    fontWeight: '600',
    marginTop: hp(0.3),
  },
  deleteAllButton: {
    borderWidth: 1,
    borderColor: '#e04040',
    borderRadius: wp(5),
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.8),
  },
  deleteAllText: {
    color: '#e04040',
    fontSize: hp(1.6),
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(10),
  },
  bellCircle: {
    width: hp(8),
    height: hp(8),
    borderRadius: hp(4),
    backgroundColor: 'rgba(247, 214, 115, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2.5),
  },
  emptyTitle: {
    color: COLORS.textColor,
    fontSize: hp(2.2),
    fontWeight: 'bold',
    marginBottom: hp(1),
  },
  emptyMessage: {
    color: COLORS.toPlay,
    fontSize: hp(1.6),
    textAlign: 'center',
    lineHeight: hp(2.5),
  },
  listContent: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  notificationItem: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cartBarder,
    borderRadius: wp(3),
    padding: wp(4),
    marginBottom: hp(1.5),
  },
  notificationText: {
    color: COLORS.white,
    fontSize: hp(1.7),
  },
});

export default Notifaction;