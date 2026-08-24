import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import CustomDrawer from '../../Components/drawer';
import EnergyBar from '../../Components/energyBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { COLORS } from '../../Const/Display';

const COLORS = {
  background2: '#150f2b',
  homeCardBackground: '#1b1440',
  gold: '#e8c976',
  goldDark: '#a9873f',
  white: '#ffffff',
  grayText: '#9a92b8',
  green: '#1e4d3a',
  greenDark: '#12332a',
  navy: '#1a2a4a',
  navyDark: '#0f1c33',
  maroon: '#3d1220',
  maroonDark: '#20090f',
  practiceGreen: '#1c3d33',
};

const Home = ({ navigation }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isEnergyVisible, setIsEnergyVisible] = useState(false);

  const [energy, setEnergy] = useState(300); // Starting at 300 to show the timer
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    let timer = null;
    if (energy < 370) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setEnergy((prevEnergy) => Math.min(prevEnergy + 5, 370));
            return 300; // Reset timer to 5 minutes
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [energy]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const energyPercentage = Math.min((energy / 370) * 100, 100);

  const floatAnim = useRef(new Animated.Value(0)).current;

  // Derive X movement directly from Y movement for perfect sync
  const floatAnimX = floatAnim.interpolate({
    inputRange: [0, 0],
    outputRange: [-5, 5] // -20 (Up) -> -5 (Back), 0 (Down) -> 5 (Forward)
  });

  useEffect(() => {
    // Up and down animation (X is synced automatically via interpolation)
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -20,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomDrawer visible={isDrawerVisible} onClose={() => setIsDrawerVisible(false)} navigation={navigation} /> */}
      <CustomDrawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        navigation={navigation}
      />
      <EnergyBar
        visible={isEnergyVisible} 
        onClose={() => setIsEnergyVisible(false)} 
        energy={energy} 
        timeLeft={timeLeft} 
        formatTime={formatTime} 
        energyPercentage={energyPercentage} 
      />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconButton} onPress={() => setIsDrawerVisible(true)}>
            <FontAwesome name="bars" size={hp(2.6)} color={COLORS.gold} />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerSubtitle}>HAITIAN CARD LOUNGE</Text>
            <Text style={styles.headerTitle}>KAZINO</Text>
          </View>

          <TouchableOpacity activeOpacity={0.7} style={styles.iconButton} onPress={() => navigation.navigate('Notifaction')}>
            <FontAwesome name="bell" size={hp(2.6)} color={COLORS.gold} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Lounge Energy */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => setIsEnergyVisible(true)}>
        <View style={styles.energyCard}>
          <View style={styles.energyTopRow}>
            <View style={styles.energyLeft}>
              <View style={styles.energyIconCircle}>
                <FontAwesome name="bolt" size={hp(2)} color={COLORS.gold} />
              </View>
              <View>
                <Text style={styles.energyLabel}>LOUNGE ENERGY</Text>
                <View style={styles.energyValueRow}>
                  <Text style={styles.energyValue}>{energy}</Text>
                  <Text style={styles.energyMax}> / 370</Text>
                </View>
              </View>
            </View>

            <View style={styles.energyRight}>
              {energy >= 370 ? (
                <View style={styles.fullBadge}>
                  <FontAwesome name="check-circle" size={hp(1.5)} color={COLORS.gold} />
                  <Text style={styles.fullBadgeText}> FULL</Text>
                </View>
              ) : (
                <View style={styles.timerBadge}>
                  <FontAwesome name="clock-o" size={hp(1.5)} color={COLORS.gold} />
                  <Text style={styles.timerBadgeText}>{formatTime(timeLeft)}</Text>
                </View>
              )}
              <Text style={styles.perMatch}>10 / match</Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#f2dd88ea', '#debe56' , '#bc9b37' , '#8c733c']}
                style={[styles.progressFill, { width: `${energyPercentage}%` }]}
                />
          </View>
        </View>
        </TouchableOpacity>

        {/* Multiplayer Card */}
        <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('Multiplayer')}>
          <Animated.Image
            source={require('../../assets/fair.png')}
            style={[styles.largeImage, { transform: [{ translateY: floatAnim }, { translateX: floatAnimX }] }]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Shop + Collections */}
        <View style={styles.rowCardsContainer}>
          <TouchableOpacity style={styles.smallCardContainer} onPress={() => navigation.navigate("Shop")}>
            <Animated.Image
              source={require('../../assets/shop.png')}
              style={[styles.smallImage, { transform: [{ translateY: floatAnim }, { translateX: floatAnimX }] }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallCardContainer}>
            <Animated.Image
              source={require('../../assets/colation.png')}
              style={[styles.smallImage, { transform: [{ translateY: floatAnim }, { translateX: floatAnimX }] }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Practice Match */}
        <TouchableOpacity activeOpacity={0.85} style={styles.practiceButton}>
          <FontAwesome name="android" size={hp(2.4)} color={COLORS.gold} />
          <Text style={styles.practiceButtonText}>Practice Match</Text>
        </TouchableOpacity>
        <Text style={styles.practiceCaption}>
          Jump straight into a 2-player game against the system.{'\n'}Free — no energy required.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background2,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2),
  },
  iconButton: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    borderWidth: 1,
    borderColor: COLORS.goldDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -hp(0.5),
    right: -wp(1),
    backgroundColor: '#e0402f',
    width: hp(2.2),
    height: hp(2.2),
    borderRadius: hp(1.1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: hp(1.2),
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerSubtitle: {
    color: COLORS.grayText,
    fontSize: hp(1.3),
    letterSpacing: wp(0.8),
  },
  headerTitle: {
    color: COLORS.gold,
    fontSize: hp(3.2),
    fontWeight: 'bold',
    letterSpacing: wp(0.6),
  },
  energyCard: {
    marginTop: hp(3),
    backgroundColor: COLORS.homeCardBackground,
    borderWidth: 1,
    borderColor: COLORS.goldDark,
    borderRadius: wp(4),
    padding: wp(4),
  },
  energyTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  energyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  energyIconCircle: {
    width: hp(5.5),
    height: hp(5.5),
    borderRadius: hp(2.75),
    borderWidth: 1,
    borderColor: COLORS.goldDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  energyLabel: {
    color: COLORS.grayText,
    fontSize: hp(1.2),
    letterSpacing: wp(0.5),
  },
  energyValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  energyValue: {
    color: COLORS.gold,
    fontSize: hp(3),
    fontWeight: 'bold',
  },
  energyMax: {
    color: COLORS.grayText,
    fontSize: hp(1.8),
  },
  energyRight: {
    alignItems: 'flex-end',
  },
  fullBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.goldDark,
    borderRadius: wp(5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
  },
  fullBadgeText: {
    color: COLORS.gold,
    fontSize: hp(1.3),
    fontWeight: 'bold',
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.grayText,
    borderRadius: wp(5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
  },
  timerBadgeText: {
    color: COLORS.grayText,
    fontSize: hp(1.3),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  perMatch: {
    color: COLORS.grayText,
    fontSize: hp(1.2),
    marginTop: hp(0.5),
  },
  progressTrack: {
    height: hp(0.8),
    backgroundColor: '#3a3260',
    borderRadius: hp(0.4),
    marginTop: hp(2),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.gold,
  },
  cardContainer: {
    marginTop: hp(2),
    alignItems: 'center',
    width: '100%',
  },
  largeImage: {
    width: wp(90),
    height: hp(25),
    borderRadius : wp(12)
  },
  multiplayerButton: {
    marginTop: hp(2),
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    borderWidth: 1,
    borderColor: COLORS.goldDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  smallCardContainer: {
    width: wp(43),
    alignItems: 'center',
  },
  smallImage: {
    width: '100%',
    height: hp(30),
  },
  smallCardButton: {
    width: hp(4.5),
    height: hp(4.5),
    borderRadius: hp(2.25),
    borderWidth: 1,
    borderColor: COLORS.goldDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  practiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.practiceGreen,
    borderWidth: 1,
    borderColor: COLORS.goldDark,
    borderRadius: wp(8),
    height: hp(7),
    marginTop: hp(3),
  },
  practiceButtonText: {
    color: COLORS.gold,
    fontSize: hp(2.2),
    fontWeight: 'bold',
    marginLeft: wp(2),
  },
  practiceCaption: {
    color: COLORS.grayText,
    fontSize: hp(1.3),
    textAlign: 'center',
    marginTop: hp(1.5),
  },
});

export default Home;