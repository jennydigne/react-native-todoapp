import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import Feather from '@expo/vector-icons/Feather';

export default function DoneButton() {
    const route = useRoute();

    const handlePress = () => {
        const onDone = route.params?.onDone;
        if (typeof onDone === "function") {
            onDone();
        } else {
            console.warn("No onDone function was found");
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Feather name="check" size={24} color="white" />
        </TouchableOpacity>
    );
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
});
