import React, { useState, useEffect, useContext , useRef} from 'react';
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
    TouchableWithoutFeedback,
    Keyboard,
    Modal,
    Dimensions,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONT_SIZES } from '../Const/Display.js';
import logo from '../assets/image.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomInput from '../Components/CustomInput.jsx';
import CustomButton from '../Components/CustomButton.jsx';
import GoogleButton from '../Components/GoogleButton.jsx';
import AuthHeader from '../Components/AuthHeader';
import TermsBottomSheet from '../Components/TermsBottomSheet';
import useGoogleSignIn from '../api/Google.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import screenHarder from '../Components/screenHarder.jsx';
import LinearGradient from 'react-native-linear-gradient';

export {
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
}