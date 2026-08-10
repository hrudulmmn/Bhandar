import {
    NativeModules,
    PermissionsAndroid,
    Platform,
} from "react-native";

export interface SMSMessage {
  id: string;
  address: string;
  body: string;
  date: number;
}

interface SMSReaderNativeModule {
  hasPermission(): Promise<boolean>;
  getMessages(maxCount: number): Promise<SMSMessage[]>;
}

const SMSReader =
  NativeModules.SMSReader as SMSReaderNativeModule;

export async function requestSMSPermission(): Promise<boolean> {
  if (Platform.OS !== "android") {
    return false;
  }

  const granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_SMS
  );

  if (granted) {
    return true;
  }

  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_SMS,
    {
      title: "Bhandar SMS Permission",
      message:
        "Bhandar needs access to your SMS to identify UPI transactions.",
      buttonPositive: "Allow",
      buttonNegative: "Deny",
    }
  );

  return result === PermissionsAndroid.RESULTS.GRANTED;
}

export async function readSMS(
  maxCount = 200
): Promise<SMSMessage[]> {
  if (Platform.OS !== "android") {
    throw new Error(
      "SMS reading is only supported on Android."
    );
  }

  const permission = await requestSMSPermission();

  if (!permission) {
    throw new Error("READ_SMS permission was denied.");
  }

  if (!SMSReader) {
    throw new Error(
      "SMSReader native module is unavailable. Rebuild the Android app."
    );
  }

  return SMSReader.getMessages(maxCount);
}