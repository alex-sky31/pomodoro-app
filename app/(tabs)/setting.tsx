import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
    KeyboardAvoidingView, StatusBar, ScrollView
} from "react-native";
import styles from '../../styles/setting'
import {useTimerSettings} from "@/app/contexts/TimerSettingsContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
    const { workTime, shortBreak, longBreak, setWorkTime, setShortBreak, setLongBreak } = useTimerSettings();

    const [modalVisible, setModalVisible] = useState(false);
    const [currentType, setCurrentType] = useState<"work" | "short" | "long">("work");
    const [value, setValue] = useState("");

    const openModal = (type: "work" | "short" | "long", currentVal: number) => {
        setCurrentType(type);
        setValue(String(currentVal / 60)); // convertir secondes → minutes
        setModalVisible(true);
    };

    const saveValue = () => {
        const num = parseInt(value, 10);
        if (isNaN(num) || num <= 0) return;
        if (currentType === "work") setWorkTime(num * 60);
        if (currentType === "short") setShortBreak(num * 60);
        if (currentType === "long") setLongBreak(num * 60);
        setModalVisible(false);
    };

    const cards = [
        {
            key: "work",
            title: "Temps de travail",
            desc: "La plupart des études indiquent qu’un cerveau peut rester hautement concentré 4 à 6 heures par jour en blocs de 90–120 minutes.",
            value: workTime,
        },
        {
            key: "short",
            title: "Micro-pauses actives",
            desc: "5 min est suffisant pour se détendre",
            value: shortBreak,
        },
        {
            key: "long",
            title: "Pause longue",
            desc: "Apres 90–120 min de travail concentré, 15–20 min de pause",
            value: longBreak,
        },
    ];
    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle='light'/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <Text style={styles.header}>⚙️ Paramètres Pomodoro</Text>

                {/* Card Work Time */}
                {cards.map((card) => (
                    <View key={card.key} style={styles.card}>
                        <Text style={styles.cardTitle}>{card.title}</Text>
                        <Text style={styles.cardDesc}>{card.desc}</Text>
                        <Text style={styles.cardValue}>{Math.floor(card.value / 60)} min</Text>
                        <TouchableOpacity
                            style={styles.editBtn}
                            onPress={() => openModal(card.key as "work" | "short" | "long", card.value)}
                        >
                            <Text style={styles.editBtnText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                {/* Modal pour éditer la valeur */}
                <Modal visible={modalVisible} transparent animationType="slide">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Modifier le temps</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    keyboardType="numeric"
                                    value={value}
                                    onChangeText={setValue}
                                    autoFocus
                                />
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity style={styles.modalBtn} onPress={() => setModalVisible(false)}>
                                        <Text style={styles.modalBtnText}>Annuler</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.modalBtn, styles.modalSaveBtn]} onPress={saveValue}>
                                        <Text style={[styles.modalBtnText, { color: "white" }]}>Sauvegarder</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

            </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
        </ScrollView>
    );
}

