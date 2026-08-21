import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  React,
  COLORS,
  FONT_SIZES,
  wp,
  hp,
  MaterialCommunityIcons,
  LinearGradient
} from '../../api/Index';

const EnergyPacks = ({ navigation }) => {
  const packs = [
    { id: '1', title: 'test seq', subtitle: 'eee', amount: '+25', price: '$2.00' },
    { id: '2', title: 'test', subtitle: 'frffr', amount: '+25', price: '$2.00' },
    { id: '3', title: 'test2', subtitle: 'wfggw', amount: '+25', price: '$2.00' },
    { id: '4', title: 'test1', subtitle: 'wwwwwwwwwwwww', amount: '+25', price: '$2.00' },
    { id: '5', title: 'Classic Kazino', subtitle: 'refil', amount: '+25', price: '$23.00' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header with Energy Pill */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <View style={styles.iconback}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={30}
                color={COLORS.eyeIcon}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.headerTextCon}>
            <Text style={styles.headerSubtitle}>HAITIAN CARD LOUNGE</Text>
            <Text style={styles.headerTitle}>ENERGY PACKS</Text>
          </View>
        </View>

        <View style={styles.energyPill}>
          <MaterialCommunityIcons name="lightning-bolt" size={16} color={COLORS.gold} />
          <Text style={styles.energyText}>
            370 <Text style={styles.energyMax}>/370</Text>
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Energy Pack Wallet</Text>
        <Text style={styles.pageSubtitle}>
          Top up lounge energy for cosmetics and matches.
        </Text>

        <View style={styles.listContainer}>
          {packs.map((pack) => (
            <View key={pack.id} style={styles.card}>
              <View style={styles.cardLeft}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="lightning-bolt" size={hp(3)} color={COLORS.gold} />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{pack.title}</Text>
                  <Text style={styles.cardSubtitle} numberOfLines={1}>
                    {pack.subtitle}
                  </Text>
                </View>
              </View>

              <View style={styles.cardRight}>
                <Text style={styles.amountText}>{pack.amount}</Text>
                <LinearGradient
                  colors={['#c3971ea8', '#d5b139', '#ddb941']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buyButtonGradient}
                >
                  <TouchableOpacity activeOpacity={0.8} style={styles.buyButton} >
                    <Text style={styles.buyButtonText}>{pack.price}</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.homebackground,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: wp(5),
    paddingTop: hp(1),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconback: {
    marginLeft: wp(4),
    borderWidth: wp(0.3),
    width: wp(11),
    height: hp(5),
    borderColor: COLORS.eyeIcon,
    paddingLeft: wp(1),
    paddingTop: hp(0.5),
    borderRadius: wp(20),
  },
  headerTextCon: {
    marginLeft: wp(4),
  },
  headerSubtitle: {
    color: COLORS.toPlay,
    letterSpacing: wp(0.6),
    fontSize: wp(2.8),
  },
  headerTitle: {
    color: COLORS.eyeIcon,
    fontSize: FONT_SIZES.h4,
    fontWeight: 'bold',
    letterSpacing: wp(0.5),
  },
  energyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.goldDark,
    borderRadius: wp(5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    backgroundColor: 'rgba(232, 201, 118, 0.1)',
  },
  energyText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: wp(3.5),
    marginLeft: wp(1),
  },
  energyMax: {
    color: COLORS.grayText,
    fontSize: wp(3),
    fontWeight: 'normal',
  },
  content: {
    paddingHorizontal: wp(6),
    paddingTop: hp(4),
  },
  pageTitle: {
    color: COLORS.gold,
    fontSize: wp(7.5),
    fontWeight: 'bold',
    marginBottom: hp(1),
  },
  pageSubtitle: {
    color: COLORS.grayText,
    fontSize: wp(3.5),
    lineHeight: hp(2.2),
    marginBottom: hp(3),
  },
  listContainer: {
    paddingBottom: hp(5),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#4a4560',
    borderRadius: wp(4),
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(3),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
    borderWidth: 1,
    borderColor: 'rgba(247, 200, 115, 0.3)',
  },
  cardTextContainer: {
    flex: 1,
    paddingRight: wp(2),
  },
  cardTitle: {
    color: COLORS.gold,
    fontSize: wp(4),
    fontWeight: 'bold',
    marginBottom: hp(0.5),
  },
  cardSubtitle: {
    color: COLORS.grayText,
    fontSize: wp(3.2),
  },
  cardRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    color: COLORS.gold,
    fontSize: wp(4),
    fontWeight: 'bold',
    marginBottom: hp(0.5),
  },
  buyButtonGradient: {
    borderRadius: wp(5),
    overflow: 'hidden',
  },
  buyButton: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(0.8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: COLORS.Black,
    fontSize: wp(3.5),
    fontWeight: 'bold',
  },
});

export default EnergyPacks;