import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
        marginBottom: 8,
        textShadowColor: "rgba(0,0,0,0.3)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 18,
        color: "rgba(255,255,255,0.9)",
        fontWeight: "500",
    },
    timerContainer: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    circleContainer: {
        marginBottom: 30,
    },
    circle: {
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderWidth: 8,
        borderColor: "rgba(255,255,255,0.3)",
    },
    progressCircle: {
        position: "absolute",
        width: 276,
        height: 276,
        borderRadius: 138,
        borderWidth: 4,
        borderColor: "transparent",
        borderTopColor: "white",
        borderRightColor: "white",
    },
    innerCircle: {
        width: 240,
        height: 240,
        borderRadius: 120,
        backgroundColor: "rgba(255,255,255,0.9)",
        alignItems: "center",
        justifyContent: "center",
    },
    timeText: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#333",
        fontFamily: "monospace",
    },
    sessionText: {
        fontSize: 16,
        color: "#666",
        marginTop: 5,
    },
    progressDots: {
        flexDirection: "row",
        marginBottom: 30,
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginHorizontal: 6,
    },
    dotCompleted: {
        backgroundColor: "white",
    },
    dotEmpty: {
        backgroundColor: "rgba(255,255,255,0.3)",
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 20,
    },
    statItem: {
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.2)",
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 15,
        minWidth: 80,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    statLabel: {
        fontSize: 12,
        color: "rgba(255,255,255,0.8)",
        marginTop: 4,
    },
    controls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    controlButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    primaryButton: {
        backgroundColor: "white",
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    secondaryButton: {
        backgroundColor: "rgba(255,255,255,0.2)",
    },
    controlButtonText: {
        fontSize: 24,
        color: "white",
    },
    primaryButtonText: {
        color: "#333",
        fontSize: 30,
    },
    resetAllButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
    },
    resetAllText: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 14,
    },
});

export default styles;
