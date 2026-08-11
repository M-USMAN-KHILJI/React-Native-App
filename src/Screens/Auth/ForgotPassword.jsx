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
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from '../../api/Index'
import { useDispatch } from 'react-redux';
import { setResetEmail } from '../../redux/authSlice';

const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSendCode = () => {
      let isValid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!email.trim() || !emailRegex.test(email)) {
          setEmailError('plz enter your Email user@exmaple.com');
          isValid = false;
      }
      if (isValid) {
          dispatch(setResetEmail(email));
          navigation.navigate('ResetPassword');
      }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View  style={styles.main}>{/*Main View*/}

              <View style={styles.innerView}>{/*Inner View*/}

            <View>
                <AuthHeader title="RESET" />
            </View>

            <View>
                <Text style={styles.toPlay}>
                    Secure access . Kazino Kat 509
                </Text>
            </View>

            <View>
                <Text style={styles.onetime}>
                    Enter your account email. WE will send a one-time
                </Text>
            </View>

            <View>
                <Text style={styles.onetime1}>
                    Verification Code to reset your password
                </Text>
            </View>

            <View style={{marginTop: hp(3)}}>
                <Text style={styles.email}>EMAIL</Text>
            </View>

            <View>
                <CustomInput
                    iconName="envelope"
                    placeholder="Kazino@example.com"
                    value={email}
                    onChangeText={(text) => { setEmail(text); setEmailError(''); }}
                />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <View style={styles.Button}>
                <CustomButton title="Send Verification Code" onPress={handleSendCode}/>
            </View>

        </View>

        <TouchableOpacity activeOpacity={0.9} style={styles.bottomIconContainer} onPress={() => navigation.navigate('Login')}>
           <View style={styles.bottomIcon}>
               <FontAwesome
                 name="chevron-left"
                 size={hp('2.2%')}
                 color={COLORS.textColor}
                 style={styles.backIcon}
               />
             </View>

             <View>
                <Text style={styles.backToSignIn}>
                    Back to Sign In
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
        height : hp(67),
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
        fontSize: FONT_SIZES.h6,
        marginLeft: wp(1.5),
        marginTop: hp(1.5),
    },
    onetime : {
        color : COLORS.toPlay,
        textAlign: 'center',
        fontSize: FONT_SIZES.body,
        marginLeft: wp(1.5),
        marginTop: hp(1.5),
        marginTop : hp(3),
    },
    onetime1 : {
        color : COLORS.toPlay,
        textAlign: 'center',
        fontSize: FONT_SIZES.body,
        marginLeft: wp(1.5),
        marginTop: hp(1),
    },
        email : {
        color : COLORS.textColor,
        fontSize : FONT_SIZES.bodySmall,
        marginTop : hp(1),
        marginLeft : wp(4),
        fontWeight:'bold',
        letterSpacing:wp('0.6')
    },
    errorText: {
        color: 'red',
        fontSize: FONT_SIZES.body,
        marginLeft: wp(8),
        marginTop: hp(0.5),
    },
        Button : {
        marginTop : hp(3),
        marginLeft : wp(5.5)
    },
    bottomIconContainer : {
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        marginTop : hp(3),
        marginLeft : wp(6.5)
    },
    backToSignIn : {
        color : COLORS.textColor,
        fontSize : FONT_SIZES.h6,
        marginLeft : wp(2),
        fontWeight : "bold",
    },
    backIcon : {
        marginTop : hp(0.3)
    }


});
export default ForgotPassword