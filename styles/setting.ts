import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    content: {
        padding: 20,
        paddingTop: 60,
    },
    container: {
        flex: 1,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,

        backgroundColor: "#121212", // fond sombre uniforme
    },
    header: {
        fontSize: 24,
        color: "#FFD700", // texte jaune clair pour contraste
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        backgroundColor: "rgba(255,255,255,0.05)", // effet translucide pour glassmorphism
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff", // texte clair
    },
    cardDesc: {
        fontSize: 14,
        color: "#ccc", // texte secondaire
        marginVertical: 5,
    },
    cardValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4ECDC4", // couleur accent pour la valeur
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
        color: "#121212",
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)", // plus sombre pour focus modal
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#1E1E1E", // fond sombre modal
        borderRadius: 15,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        color: "#FFD700",
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        textAlign: "center",
        color: "#fff",
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
        borderColor: "#333",
    },
    modalSaveBtn: {
        backgroundColor: "#4ECDC4",
        borderColor: "transparent",
    },
    modalBtnText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
    },
});

export default styles;
