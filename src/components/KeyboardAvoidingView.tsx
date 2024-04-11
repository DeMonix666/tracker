import {Platform} from 'react-native';
import {IOSKeyboardAvoidingView} from './IOSKeyboardAvoidingView';
import {KeyboardAvoidingViewCommon} from './KeyboardAvoidingViewCommon';

export const KeyboardAvoidingView =
  Platform.OS === 'ios' ? IOSKeyboardAvoidingView : KeyboardAvoidingViewCommon;
