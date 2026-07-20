import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../constants/theme";
import AppButton from "../components/ui/appButton";

export default function SplashScreen() {

  const router = useRouter();

  useEffect(() => {

    const timer = setTimeout(() => {

      // optional auto navigate

    },2000);

    return ()=>clearTimeout(timer);

  },[]);

  return (

    <View style={styles.container}>

      <View style={styles.logo}>

        <Text style={styles.logoText}>B</Text>

      </View>

      <Text style={styles.title}>BHANDAR</Text>

      <Text style={styles.subtitle}>
        YOUR UNIFIED UPI PASSBOOK
      </Text>

      <View style={styles.chips}>

        <View style={styles.chip}>
          <Text style={styles.chipText}>GPay</Text>
        </View>

        <View style={styles.chip}>
          <Text style={styles.chipText}>PhonePe</Text>
        </View>

        <View style={styles.chip}>
          <Text style={styles.chipText}>Paytm</Text>
        </View>

        <View style={styles.chip}>
          <Text style={styles.chipText}>BHIM</Text>
        </View>

      </View>

      <AppButton
        title="Get Started"
        onPress={() => router.replace("/home")}
      />

      <Text style={styles.footer}>
        All your UPI history. One place.
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:Colors.light.background,
justifyContent:"center",
padding:25
},

logo:{
height:90,
width:90,
alignSelf:"center",
borderRadius:24,
backgroundColor:Colors.light.accent,
justifyContent:"center",
alignItems:"center",
marginBottom:25
},

logoText:{
fontSize:46,
fontWeight:"700",
color:"white"
},

title:{
fontSize:34,
fontWeight:"800",
color:"white",
alignSelf:"center"
},

subtitle:{
color:"#999",
alignSelf:"center",
marginBottom:40,
marginTop:8
},

chips:{
flexDirection:"row",
justifyContent:"center",
flexWrap:"wrap",
marginBottom:40
},

chip:{
borderWidth:1,
borderColor:"#555",
paddingHorizontal:14,
paddingVertical:7,
borderRadius:20,
margin:5
},

chipText:{
color:"#ccc"
},

footer:{
marginTop:25,
color:"#666",
alignSelf:"center"
}

});