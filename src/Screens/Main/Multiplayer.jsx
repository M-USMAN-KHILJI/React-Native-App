import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../Const/Display';
import ScreenHarder from '../../Components/screenHarder'

const Multiplayer = ({navigation}) => {
  return (
   <SafeAreaView style={styles.continner}>


           <ScreenHarder title={"MULTIPLAYER"} subtitle={"HAITIAN CARD LOUNGE"} onPress={() => navigation.goBack() } />



    <View style={styles.main1}>
        <View style={styles.headerContainer}>
            <Text style={styles.pageTitle}>Select Mode</Text>
            <Text style={styles.pageSubtitle}>Play against others globally or host a private match with friends.</Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={() => navigation.navigate("PublicMatch")}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="earth" size={24} color="#f7c873" />
            </View>
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Public Match</Text>
                <Text style={styles.cardDescription}>Play with global players at your skill level.</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={() => navigation.navigate('PrivateMatch')}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="account-group" size={24} color="#f7c873" />
            </View>
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Private Match</Text>
                <Text style={styles.cardDescription}>Create your own room and invite your friends to join.</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ffffff" />
        </TouchableOpacity>
    </View>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    continner : {
        flex : 1,
        backgroundColor : COLORS.homebackground
    },

    main1 : {
        flex: 1,
        paddingHorizontal: wp(6),
        paddingTop: hp(3),
    },
    headerContainer: {
        marginBottom: hp(5),
    },
    pageTitle: {
        color: '#f7c873',
        fontSize: wp(8),
        fontWeight: 'bold',
        marginBottom: hp(1.5),
    },
    pageSubtitle: {
        color: '#b0aeb3',
        fontSize: wp(4),
        lineHeight: hp(2.5),
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6c6b75', // Less prominent border, somewhat like image
        borderRadius: wp(10),
        paddingVertical: hp(2.5),
        paddingHorizontal: wp(5),
        marginBottom: hp(3),
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },
    iconContainer: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        backgroundColor: 'rgba(247, 200, 115, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(4),
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        color: '#f7c873',
        fontSize: wp(4.5),
        fontWeight: 'bold',
        marginBottom: hp(0.5),
    },
    cardDescription: {
        color: '#b0aeb3',
        fontSize: wp(3.5),
        lineHeight: hp(2),
        paddingRight: wp(4),
    }
})

export default Multiplayer