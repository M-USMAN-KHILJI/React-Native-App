import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    CustomButton,
    React,
    useState,
    COLORS,
    wp,
    hp
} from '../../api/Index'
import ScreenHarder from '../../Components/screenHarder'
import LinearGradient from 'react-native-linear-gradient';

const PublicMatch = ({navigation}) => {
  const [selectedPlayers, setSelectedPlayers] = useState(2);

  return (
   <SafeAreaView style={styles.continner}>

    <ScreenHarder title={"PUBLIC MATCH"} subtitle={"HAITIAN CARD LOUNGE"} onPress={() => navigation.goBack() } />
    <View style={styles.content}>
      <Text style={styles.pageTitle}>Quick Match</Text>
      <Text style={styles.pageSubtitle}>
        Choose a public table size. You will only match with players who picked the same option.
      </Text>

      <View style={styles.pillsContainer}>
        {[2, 3, 4].map(num => {
          const isSelected = selectedPlayers === num;

          if (isSelected) {
            return (
              <LinearGradient
                key={num}
                colors={['#c3971ea8', '#d5b139', '#ddb941']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.pill}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.pillTouchable}
                  onPress={() => setSelectedPlayers(num)}
                >
                  <Text style={[styles.pillText, styles.pillTextSelected]}>
                    {num} players
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            );
          }

          return (
            <TouchableOpacity
              key={num}
              activeOpacity={0.8}
              style={styles.pill}
              onPress={() => setSelectedPlayers(num)}
            >
              <Text style={styles.pillText}>
                {num} players
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.Button}>
        <CustomButton title="Find Match" buttonStyle={styles.find}  />
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backBtnText}>&larr; Back to lobby</Text>
      </TouchableOpacity>
    </View>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    continner : {
        flex : 1,
        backgroundColor : COLORS.outerBackground
    },
    content: {
        paddingHorizontal: wp(6),
        paddingTop: hp(4),
    },
    pageTitle: {
        color: COLORS.goldenBtn,
        fontSize: wp(6),
        fontWeight: 'bold',
        marginBottom: hp(1),
    },
    pageSubtitle: {
        color: COLORS.subtitleGray,
        fontSize: wp(3.8),
        lineHeight: hp(2.5),
        marginBottom: hp(4),
    },
    pillsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(5),
    },
    pill: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.goldenBtn,
        borderRadius: wp(10),
        marginHorizontal: wp(1),
        overflow: 'hidden',
    },
    pillTouchable: {
        flex: 1,
        paddingVertical: hp(1.5),
        alignItems: 'center',
    },
    pillText: {
        color: COLORS.btnTextWhite,
        fontSize: wp(3.5),
        fontWeight: '500',
        paddingVertical: hp(1.5),
        textAlign: 'center',
    },
    pillTextSelected: {
        color: COLORS.btnTextBlack,
        paddingVertical: 0,
    },
    backBtn: {
        alignItems: 'center',
    },
    backBtnText: {
        color: COLORS.goldenBtn,
        fontSize: wp(4),
        fontWeight: '500',
    },
    Button : {
        marginLeft: hp(1.5),
        marginBottom : hp(2)
    },
      find : {
        width : wp(81),
    }
})
export default PublicMatch