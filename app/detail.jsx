import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function DetailScreen() {
    const { id, done, description, createdAt } = useLocalSearchParams();
    const router = useRouter();

    const handleToggleDone = () => {
        router.replace({
            pathname: "/",
            params: {
                toggleId: id,
            },
        });
    };

    const handleDelete = () => {
        router.replace({
            pathname: "/",
            params: {
                deleteId: id,
            },
        });
    };

    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString({
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : null;

    return (
        <View style={styles.container}>
            <View style={styles.content}>

                {description ? (
                    <View>
                        <Text style={styles.title}>Todo details:</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                ) : null}

                <Text style={styles.statusText}>
                    <Text style={styles.bold}>Status:</Text> {done === "true" ? "Done" : "Not done"}
                </Text>

                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        done === "true" ? styles.undoButton : styles.doneButton,
                    ]}
                    onPress={handleToggleDone}
                >
                    {done === "true" ? (
                        <Text style={styles.buttonText}> Undo</Text>
                    ) : (
                        <Text style={styles.buttonText}> Done</Text>
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                {formattedDate && (
                    <Text style={styles.dateText}><Text style={styles.bold}>Added:</Text> {formattedDate}</Text>
                )}

                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    content: {
        flex: 1,
        paddingHorizontal: 40,
        paddingVertical: 20,
        justifyContent: "center"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: "center",
    },
    statusText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: "center",
    },
    bold: {
        fontWeight: "bold",
    },
    toggleButton: {
        backgroundColor: "blue",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignSelf: "center",
        marginBottom: 20,
    },
    doneButton: {
        backgroundColor: "green",
    },
    undoButton: {
        backgroundColor: "crimson",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    },
    footer: {
        marginTop: "auto",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20, 
        backgroundColor: "lightgray"

    },
    dateText: {
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: "crimson",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
});
