import { Pressable,Text,StyleSheet } from "react-native";
import { Colors,FontSize } from "@/constants/theme";

type ButtonProps = {
    title: string,
    onPress?: () =>void
};

export default function Button({
    title,
    onPress,
}:ButtonProps){
    return(
        <Pressable
            style={({pressed})=>[
                styles.button,
                pressed && styles.pressed
            ]}
            onPress={onPress}
            >
                <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: Colors["light"].accent,
        borderRadius: 14,
        justifyContent:"center",
        alignItems:"center",
        padding: 14
    },
    pressed:{
        opacity:0.8,
    },
    text:{
        color: Colors.light.text,
        fontSize:FontSize.xl,
        fontWeight:"800"
    }
})