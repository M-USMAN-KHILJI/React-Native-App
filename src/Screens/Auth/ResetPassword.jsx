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
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from '../../api/Index'
import { useSelector } from 'react-redux';

const ResetPassword = ({navigation}) => {
     const email = useSelector((state) => state.auth.resetEmail);
     const [otp, setOtp] = useState(['', '', '', '', '', '']);
     const [otpError, setOtpError] = useState('');

  const inputs = useRef([]);

  const handleChange = (text, index) => {
    // Only allow one digit
    const value = text.replace(/[^0-9]/g, '');

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    // Go back when backspace is pressed
    if (
      nativeEvent.key === 'Backspace' &&
      otp[index] === '' &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  };


  const handleVerify = () => {
      let isValid = true;
      if (otp.some(digit => digit === '')) {
          setOtpError('Please enter the full verification code');
          isValid = false;
      }
      if (isValid) {
          navigation.navigate('NewPassword');
      }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={styles.main}>{/*main*/}
       
              <View style={styles.innerView}>{/*innerView*/}
                <View>
                  <AuthHeader title="VERIFY" />
                </View>

                <View>
                  <Text style={styles.toPlay}>
                      Password reset . Kazino 509
                  </Text>
                </View>

                <View>
                  <Text style={[styles.toPlay , {marginTop: wp(4.5)}]}>
                      Code sent to {email || 'uk4790907@gmail.com'}
                  </Text>
                </View>

                <View>
                  <Text style={styles.email}>
                      ENTER CODE
                  </Text>
                </View>

                <View>

                           <View style={styles.Inputcontainer}>
                     {otp.map((digit, index) => (
                       <TextInput
                         key={index}
                         ref={(ref) => {
                           inputs.current[index] = ref;
                         }}
                         style={styles.input}
                         value={digit}
                         onChangeText={(text) => handleChange(text, index)}
                         onKeyPress={(event) => handleKeyPress(event, index)}
                         keyboardType="number-pad"
                         maxLength={1}
                         textAlign="center"
                         secureTextEntry={false}
                       />
                     ))}
                   </View>
                   {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}

                </View>

                <View style={styles.Button}>
                  <CustomButton title="Verify" onPress={handleVerify}/>
                </View>

              </View>


              <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()} style={styles.change}>
                <FontAwesome
                     name="chevron-left"
                     size={hp('2.2%')}
                     color={COLORS.textColor}
                     style={styles.backIcon}
                   />
                

                <View>
                  <Text style={styles.changeEmail}>
                      Change email
                  </Text>
                </View>
                
              </TouchableOpacity>
             
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

container: {
        flex: 1,
        backgroundColor : COLORS.outerBackground
    },

    main: {
        backgroundColor: COLORS.outerBackground,
        width : wp(100),
        height : hp(100)
    },

    innerView: {
        backgroundColor: COLORS.cardBackground,
        width : wp(87),
        height : hp(60),
        marginTop: hp(2),
        marginLeft : wp(6.5),
        borderRadius: wp(10),
        borderWidth : wp(0.2),
        borderColor : COLORS.cartBarder,
        shadowColor : COLORS.Black,
        shadowOffset : {
            width : wp(0),
            height : hp(2)
        },
        shadowOpacity: wp(0.2),
        shadowRadius: wp(0.2),
    },
        toPlay: {
        color: COLORS.toPlay,
        textAlign: 'center',
        fontSize: FONT_SIZES.h5,
        marginLeft: wp(1.5),
        marginTop: hp(1.5),
    },
        email : {
        color : COLORS.textColor,
        fontSize : FONT_SIZES.h6,
        marginTop : hp(1),
        marginLeft : wp(4),
        fontWeight:'bold',
        letterSpacing:wp('0.6')
    },
    Inputcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(80),
    marginTop: hp(2),
    marginLeft: wp(4)
  },

  input: {
    width: wp(11),
    height: hp(6),

    borderWidth: wp(0.3),
    borderColor: '#26354F',
    borderRadius: wp(3),

    backgroundColor: '#0D1527',

    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
    errorText: {
        color: 'red',
        fontSize: FONT_SIZES.body,
        marginLeft: wp(4),
        marginTop: hp(1),
    },
    Button : {
        marginTop : hp(3),
        marginLeft : wp(5.5)
    },

    change : {
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        marginTop : hp(3),
        marginLeft : wp(6.5)
    },
    changeEmail : {
        color : COLORS.textColor,
        fontSize : FONT_SIZES.h6,
        marginLeft : wp(2),
        fontWeight : "bold",
    },
    backIcon : {
        marginTop : hp(0.3)
    }

});

export default ResetPassword