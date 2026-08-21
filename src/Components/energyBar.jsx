import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  ScrollView,
  Dimensions,
} from 'react-native';
import { COLORS, FONT_SIZES } from '../Const/Display';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const SHEET_HEIGHT = hp(65);

const EnergyBar = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SHEET_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  // PanResponder for swipe-down-to-close
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          // User swiped down enough, close
          Animated.timing(slideAnim, {
            toValue: SHEET_HEIGHT,
            duration: 250,
            useNativeDriver: true,
          }).start(() => onClose());
        } else {
          // Snap back
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Tap outside to close */}
        <TouchableOpacity style={styles.overlayTouch} activeOpacity={1} onPress={onClose} />

        {/* Bottom Sheet */}
        <Animated.View
          style={[
            styles.bottomSheet,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Drag Handle */}
          <View {...panResponder.panHandlers} style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Header Row */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.headerIconCircle}>
                <FontAwesome name="bolt" size={hp(2.2)} color="#e8c976" />
              </View>
              <View>
                <Text style={styles.headerTitle}>Lounge Energy</Text>
                <Text style={styles.headerSubtitle}>Power your multiplayer and ranked matches</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={hp(2.5)} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

            {/* Energy Card */}
            <View style={styles.energyCard}>
              <View style={styles.energyTopRow}>
                <View style={styles.energyIconCircle}>
                  <FontAwesome name="bolt" size={hp(2.5)} color="#e8c976" />
                </View>
                <View>
                  <View style={styles.energyValueRow}>
                    <Text style={styles.energyValue}>370</Text>
                    <Text style={styles.energyMax}> / 370</Text>
                  </View>
                  <Text style={styles.energyAvailable}>ENERGY AVAILABLE</Text>
                </View>
              </View>

              {/* Progress Bar */}
              {/* <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: '100%' }]} />
              </View> */}
              <LinearGradient
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              colors={['#f2dd88ea', '#debe56' , '#bc9b37' , '#8c733c']}
                              style={styles.progressFill}
                              />

              {/* Badges Row */}
              <View style={styles.badgesRow}>
                <View style={styles.badgePill}>
                  <MaterialCommunityIcons name="battery-charging" size={wp(4)} color="#e8c976" />
                  <Text style={styles.badgePillText}>Fully charged</Text>
                </View>
                <View style={styles.badgePill}>
                  <MaterialCommunityIcons name="eye" size={wp(4)} color="#e8c976" />
                  <Text style={styles.badgePillText}>10 per match</Text>
                </View>
              </View>
            </View>

            {/* How it works */}
            <Text style={styles.sectionTitle}>How it works</Text>
            <Text style={styles.sectionBody}>
              Energy is used when you start multiplayer matches and buy cosmetics. Practice mode is always free. You regenerate 5 energy every 60 minutes, up to your max of 370.
            </Text>

            {/* Buttons */}
            <LinearGradient
              colors={['#F2D067', '#C5A028']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.goldenButton}
            >
              <TouchableOpacity activeOpacity={0.8} style={styles.goldenButtonInner}>
                <MaterialCommunityIcons name="play-circle" size={wp(5)} color="#0D1527" />
                <Text style={styles.goldenButtonText}>ENERGY FULL</Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity activeOpacity={0.8} style={styles.outlineButton}>
              <MaterialCommunityIcons name="shopping-outline" size={wp(5)} color="#e8c976" />
              <Text style={styles.outlineButtonText}>GET ENERGY PACKS</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Practice Match on Home never consumes energy.
            </Text>

          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  overlayTouch: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: COLORS.outerBackground || '#0B111D',
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    paddingHorizontal: wp(5),
    paddingBottom: hp(3),
    maxHeight: SHEET_HEIGHT,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: hp(1.5),
  },
  handle: {
    width: wp(10),
    height: hp(0.5),
    backgroundColor: '#555',
    borderRadius: wp(2),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2.5),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIconCircle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: 'rgba(232, 201, 118, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: wp(4.5),
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#9a92b8',
    fontSize: wp(3.2),
    marginTop: hp(0.3),
  },
  closeButton: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    borderWidth: 1,
    borderColor: '#3a3260',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: hp(2),
  },
  energyCard: {
    backgroundColor: COLORS.cardBackground || '#0F1624',
    borderWidth: 1,
    borderColor: '#2A2C38',
    borderRadius: wp(5),
    padding: wp(5),
    marginBottom: hp(3),
  },
  energyTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  energyIconCircle: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: 'rgba(232, 201, 118, 0.15)',
    borderWidth: 1,
    borderColor: '#a9873f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
  },
  energyValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  energyValue: {
    color: '#e8c976',
    fontSize: wp(8),
    fontWeight: 'bold',
  },
  energyMax: {
    color: '#9a92b8',
    fontSize: wp(4),
  },
  energyAvailable: {
    color: '#9a92b8',
    fontSize: wp(3),
    letterSpacing: wp(0.3),
    marginTop: hp(0.3),
  },
  progressTrack: {
    height: hp(0.8),
    backgroundColor: '#3a3260',
    borderRadius: hp(0.4),
    overflow: 'hidden',
    marginBottom: hp(2),
  },
  progressFill: {
    width: wp(79),
    height: hp(0.8),
    borderRadius: hp(0.6),
    marginBottom: hp(2),
    
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3260',
    borderRadius: wp(5),
    paddingVertical: hp(0.7),
    paddingHorizontal: wp(3),
    marginRight: wp(2),
  },
  badgePillText: {
    color: '#9a92b8',
    fontSize: wp(3),
    marginLeft: wp(1.5),
  },
  sectionTitle: {
    color: '#e8c976',
    fontSize: wp(4.5),
    fontWeight: 'bold',
    marginBottom: hp(1),
  },
  sectionBody: {
    color: '#9a92b8',
    fontSize: wp(3.5),
    lineHeight: hp(2.5),
    marginBottom: hp(3),
  },
  goldenButton: {
    borderRadius: wp(8),
    marginBottom: hp(2),
  },
  goldenButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(7),
  },
  goldenButtonText: {
    color: '#0D1527',
    fontSize: wp(4),
    fontWeight: 'bold',
    marginLeft: wp(2),
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e8c976',
    borderRadius: wp(8),
    height: hp(7),
    marginBottom: hp(2.5),
  },
  outlineButtonText: {
    color: '#e8c976',
    fontSize: wp(4),
    fontWeight: 'bold',
    marginLeft: wp(2),
  },
  footerText: {
    color: '#6a6480',
    fontSize: wp(3.2),
    textAlign: 'center',
  },
});

export default EnergyBar;
