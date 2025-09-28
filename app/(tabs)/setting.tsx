import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Platform, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTimerSettings } from "@/app/contexts/TimerSettingsContext";
import styles from '../../styles/setting'

export default function SettingsScreen() {
    const { workTime, shortBreak, longBreak, setWorkTime, setShortBreak, setLongBreak } = useTimerSettings();

    const [work, setWork] = useState((workTime / 60).toString());
    const [shortB, setShortB] = useState((shortBreak / 60).toString());
    const [longB, setLongB] = useState((longBreak / 60).toString());

    const saveSettings = () => {
        setWorkTime(parseInt(work, 10) * 60);
        setShortBreak(parseInt(shortB, 10) * 60);
        setLongBreak(parseInt(longB, 10) * 60);
        Keyboard.dismiss(); // 👈 ferme le clavier

    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <Text style={styles.title}>⚙️ Paramètres</Text>

                    <View style={styles.inputGroup}>
                        <Text>Temps de travail (minutes)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={work}
                            onChangeText={setWork}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text>Pause courte (minutes)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={shortB}
                            onChangeText={setShortB}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text>Pause longue (minutes)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={longB}
                            onChangeText={setLongB}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={saveSettings}>
                        <Text style={styles.buttonText}>💾 Sauvegarder</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
