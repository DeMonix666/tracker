import fbDatabase from '@react-native-firebase/database';
import fbAuth from '@react-native-firebase/auth';
import fbMessaging from '@react-native-firebase/messaging';
import fbAnalytics from '@react-native-firebase/analytics';
import fbCrashlytics from '@react-native-firebase/crashlytics';

export const database = fbDatabase();
export const auth = fbAuth();
export const messaging = fbMessaging();
export const analytics = fbAnalytics();
export const crashlytics = fbCrashlytics();
export const messagingStatus = fbMessaging.AuthorizationStatus;

