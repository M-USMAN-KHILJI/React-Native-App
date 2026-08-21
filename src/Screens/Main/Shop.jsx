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
    MaterialCommunityIcons
} from '../../api/Index'

const Shop = ({ navigation }) => {
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
            <Text style={styles.headerTitle}>SHOP</Text>
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
        <Text style={styles.pageTitle}>Kazino Store</Text>
        <Text style={styles.pageSubtitle}>
          Browse energy packs and cosmetics. Equipped items carry into your next table.
        </Text>

        {/* Energy Packs Card */}
        <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate("EnergyPacks")}>
          <View style={styles.iconContainerYellow}>
            <MaterialCommunityIcons name="circle-slice-6" size={24} color="#f7c873" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Energy Packs</Text>
            <Text style={styles.cardDescription}>Top up your energy to keep playing multiplayer matches.</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.gold} />
        </TouchableOpacity>

        {/* Cosmetic Items Card */}
        <TouchableOpacity style={styles.card} activeOpacity={0.8}>
          <View style={styles.iconContainerGreen}>
            <MaterialCommunityIcons name="palette" size={24} color="#4ade80" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Cosmetic Items</Text>
            <Text style={styles.cardDescription}>Card decks, avatars, table felts, card backs, and seat frames.</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.gold} />
        </TouchableOpacity>
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
    fontSize: wp(8),
    fontWeight: 'bold',
    marginBottom: hp(1.5),
  },
  pageSubtitle: {
    color: COLORS.grayText,
    fontSize: wp(3.8),
    lineHeight: hp(2.5),
    marginBottom: hp(5),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4a4560',
    borderRadius: wp(6),
    paddingVertical: hp(2.5),
    paddingHorizontal: wp(5),
    marginBottom: hp(2.5),
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  iconContainerYellow: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: 'rgba(247, 200, 115, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
    borderWidth: 1,
    borderColor: 'rgba(247, 200, 115, 0.3)',
  },
  iconContainerGreen: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.3)',
  },
  cardTextContainer: {
    flex: 1,
    paddingRight: wp(4),
  },
  cardTitle: {
    color: COLORS.gold,
    fontSize: wp(4.5),
    fontWeight: 'bold',
    marginBottom: hp(0.5),
  },
  cardDescription: {
    color: COLORS.grayText,
    fontSize: wp(3.2),
    lineHeight: hp(2),
  }
});

export default Shop;