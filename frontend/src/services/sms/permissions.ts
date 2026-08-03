import {
    PermissionsAndroid,
    Platform,
} from "react-native";

export async function requestSMSPermission() {

    if (Platform.OS !== "android")
        return false;

    const granted =
        await PermissionsAndroid.request(

            PermissionsAndroid.PERMISSIONS.READ_SMS,

            {

                title:"SMS Permission",

                message:
                "Bhandar reads transaction SMS to build your unified passbook.",

                buttonPositive:"Allow",

                buttonNegative:"Cancel",

            }

        );

    return (
        granted===PermissionsAndroid.RESULTS.GRANTED
    );

}

export async function hasSMSPermission(){

    if(Platform.OS!=="android")
        return false;

    return PermissionsAndroid.check(

        PermissionsAndroid.PERMISSIONS.READ_SMS

    );

}