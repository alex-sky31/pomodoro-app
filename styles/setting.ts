import {StyleSheet} from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f2f2f2",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    cardDesc: {
        fontSize: 14,
        color: "#555",
        marginVertical: 5,
    },
    cardValue: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5,
    },
    editBtn: {
        marginTop: 10,
        backgroundColor: "#4ECDC4",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignSelf: "flex-start",
    },
    editBtnText: {
        color: "white",
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        textAlign: "center",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    modalSaveBtn: {
        backgroundColor: "#4ECDC4",
        borderColor: "transparent",
    },
    modalBtnText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default styles;
