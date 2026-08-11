import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS, FONT_SIZES } from '../Const/Display';
import LinearGradient from 'react-native-linear-gradient';

const TermsBottomSheet = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.bottomSheet}>

          {/* Drag Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Header Row */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <FontAwesome name="file-text-o" size={hp(2.5)} color={COLORS.textColor} />
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.title}>Terms & Conditions</Text>
                <Text style={styles.subtitle}>Kazino · legal information</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome name="times" size={hp('2.2%')} color={COLORS.textColor} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

          <View style={styles.border}>{/*MAin*/}

            <View style={styles.lineContainer}>{/*line*/}

            <View style={styles.FirstLine}/>
              
               <View style={styles.desContainer}>
                <Text style={styles.des}>Welcome to Kazino. These Terms & Conditions
                 
                 govern your use of our application and services. By
                 
                 creating an account or signing in, you acknowledge
                 
                 that you have read and agree to be bound by these
                 
                 terms.
                 
                 </Text>
               </View>

            </View>

            <View>{/*LINE 2*/}

              <View style={styles.lineContainer}>
                <View style={styles.FirstLine2}/>

                <View>
                  <Text style={styles.des}>
                    You must be of legal age in your jurisdiction to use
                    Kazino. You are responsible for maintaining the
                    confidentiality of your account credentials and for all
                    activity that occurs under your account.
                  </Text>
                </View>


              </View>

            </View>


            <View>{/*Line 3*/}

              <View style={styles.lineContainer}>

                <View style={styles.FirstLine2} />

                <View>
                  <Text style={styles.des}>
                    Kazino provides entertainment services subject to
                    applicable laws. We may update these terms from
                    time to time; continued use of the app after changes
                    constitutes acceptance of the revised terms.
                  </Text>
                </View>



              </View>
             
             <View>{/*Line4*/}

              <View style={styles.lineContainer}>

                <View style={styles.FirstLine2} />

                <View>
                  <Text style={styles.des}>
                   For questions about these terms, please contact
                   support through the channels provided in the app. If
                  you do not agree with any part of these terms, you
                  should discontinue use of the service.
                  </Text>
                </View>



              </View>

             </View>

              

            </View>



          </View>

          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButtonContainer}>
            <LinearGradient
              colors={['#F2D067', '#C5A028']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.closeBtn}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#0f2846',
    width: wp(100),
    height: hp(60),
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    paddingHorizontal: wp(5),
    paddingBottom: hp(3),
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: hp('1.2%'),
  },
  handle: {
    width: wp('10%'),
    height: hp('0.5%'),
    backgroundColor: '#555',
    borderRadius: wp('2%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
    paddingBottom: hp('1.5%'),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: wp(11),
    height: hp(5.5),
    borderRadius: wp('2.5%'),
    backgroundColor: '#2F3336',
    borderWidth: 0.8,
    borderColor:COLORS.textColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  title: {
    color: COLORS.textColor,
    fontSize: FONT_SIZES.h5,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.toPlay || '#8899aa',
    fontSize: FONT_SIZES.body * 0.85,
    marginTop: hp('0.3%'),
  },
  closeButton: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    borderWidth: 1,
    borderColor: COLORS.inputBorder || '#2a3a5c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginBottom: hp('2%'),
    
  },
  paragraphContainer: {
    flexDirection: 'row',
    marginBottom: hp('2%'),
    paddingRight: wp('2%'),
  },
  goldBar: {
    width: wp('1%'),
    backgroundColor: '#F2D067',
    borderRadius: wp('0.5%'),
    marginRight: wp('3.5%'),
  },
  text: {
    flex: 1,
    color: COLORS.toPlay || '#8899aa',
    fontSize: FONT_SIZES.body,
    lineHeight: hp('3%'),
  },
  closeButtonContainer: {
    marginTop: hp('0.5%'),
  },
  closeBtn: {
    height: hp('6.5%'),
    borderRadius: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#0D1527',
    fontSize: FONT_SIZES.h5,
    fontWeight: 'bold',
  },
    border : {
    backgroundColor : '#041934',
    borderWidth : wp(0.1),
    borderColor : COLORS.textColor,
    borderRadius : wp(3),
    padding : wp(3),
    height : hp(60),
  },
  FirstLine : {
    backgroundColor : '#a89b3d',
    width : wp(1),
    height : hp(14),
    marginTop : hp(1.5),
    borderRadius : wp(3),
  },
  des : {
    color : COLORS.toPlay,
    fontSize : FONT_SIZES.body,
    lineHeight : hp(2.5),
    marginTop : hp(1.5),
    marginRight : wp(2),
  },
  lineContainer : {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    gap : wp(3)
  },
  FirstLine2 : {
  backgroundColor : '#a89b3d',
    width : wp(1),
    height : hp(11),
    marginTop : hp(2),
    borderRadius : wp(3),
  }

});

export default TermsBottomSheet;
