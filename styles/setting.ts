import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    inputGroup: { marginBottom: 15 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
    },
    button: {
        backgroundColor: "#4ECDC4",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: { color: "white", fontWeight: "bold" },
});

export default styles;
