import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function StatsScreen() {
    return (
        <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>📊 Statistiques</Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Aujourd'hui</Text>
                    <Text style={styles.cardValue}>0</Text>
                    <Text style={styles.cardLabel}>Pomodoros complétés</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Cette semaine</Text>
                    <Text style={styles.cardValue}>0</Text>
                    <Text style={styles.cardLabel}>Minutes de focus</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Temps moyen</Text>
                    <Text style={styles.cardValue}>--:--</Text>
                    <Text style={styles.cardLabel}>Par session</Text>
                </View>

                <Text style={styles.comingSoon}>
                    🚧 Fonctionnalité à venir dans la prochaine version
                </Text>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    cardValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    cardLabel: {
        fontSize: 14,
        color: '#999',
    },
    comingSoon: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.8)',
        marginTop: 20,
        fontStyle: 'italic',
    },
});