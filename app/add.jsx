import { View, TextInput, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function AddScreen() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();
    const navigation = useNavigation();

    const handleAdd = () => {
        if (!title.trim()) return;

        const newTodo = {
            id: Date.now().toString(),
            title: title.trim(),
            description: description.trim(),
            done: false,
            createdAt: new Date().toISOString(),
        };

        router.replace({
            pathname: "/",
            params: {
                newTodo: JSON.stringify(newTodo),
            },
        });
    };

    useEffect(() => {
        navigation.setParams({ onDone: handleAdd });
    }, [title, description]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Title"
                />
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Description"
                    multiline
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        backgroundColor: "white"
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "flex-start"
    }
});

