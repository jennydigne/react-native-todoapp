import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Feather from '@expo/vector-icons/Feather';

export default function AddButton() {

    const router = useRouter();

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/add")}
        >
            <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "mediumblue",
        borderRadius: 5,
        minWidth: 35,
        minHeight: 35, 
        alignItems: "center", 
        justifyContent: "center", 
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
})

