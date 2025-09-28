import React, { useState, useEffect, useRef } from "react";
import { BlurView } from 'expo-blur';

import { LinearGradient } from "expo-linear-gradient";
import styles from "../../styles/PomodoroStyles";
import { useTimerSettings } from "@/app/contexts/TimerSettingsContext";
import {
  View, Text, TouchableOpacity, Alert, Vibration, StatusBar, Linking,  StyleSheet
} from 'react-native';
import {Video} from "expo-av";
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {router, useFocusEffect, useRouter} from "expo-router";
import {useTimerState} from "@/app/contexts/TimerStateContext";

export default function PomodoroScreen() {
  const { workTime, shortBreak, longBreak } = useTimerSettings();

  const [timeLeft, setTimeLeft] = useState<number>(workTime);
  const [isWorkTime, setIsWorkTime] = useState<boolean>(true);
  const [completedPomodoros, setCompletedPomodoros] = useState<number>(0);
  const [totalSessions, setTotalSessions] = useState<number>(0);
  const { isRunning, setIsRunning } = useTimerState();

  const router = useRouter();

  const intervalRef = useRef< NodeJS.Timeout | string | number | undefined>(undefined);
  // Gestion du timer

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const navigation = useNavigation();

  useEffect(() => {
    setIsRunning(isRunning); // met à jour les params
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(isWorkTime ? workTime : (completedPomodoros % 4 === 0 ? longBreak : shortBreak));
    }
  }, [workTime, shortBreak, longBreak]);
  const playVibration = () =>     Vibration.vibrate([500, 500, 500]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    playVibration();

    // 👇 vibration quand le timer se termine
    if (isWorkTime) {
      const newCompleted = completedPomodoros + 1;
      setCompletedPomodoros(newCompleted);

      const isLongBreak = newCompleted % 4 === 0;
      const breakTime = isLongBreak ? longBreak : shortBreak;
      const breakType = isLongBreak ? "longue pause" : "pause courte";

      setTimeLeft(breakTime);
      setIsWorkTime(false);

      Alert.alert("🍅 Pomodoro terminé !", `Excellent travail ! Temps pour une ${breakType}.`, [
        { text: "OK", onPress: () => setIsRunning(true) },
      ]);
    } else {
      setTimeLeft(workTime);
      setIsWorkTime(true);
      setTotalSessions((prev) => prev + 1);

      Alert.alert("⏰ Pause terminée !", "Prêt pour un nouveau Pomodoro ?", [
        { text: "Pas encore", style: "cancel" },
        { text: "C'est parti !", onPress: () => setIsRunning(true) },
      ]);
    }
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isWorkTime ? workTime : completedPomodoros % 4 === 0 ? longBreak : shortBreak);
  };

  const skipSession = () => {
    Alert.alert("Passer cette session ?", "Êtes-vous sûr ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Passer", onPress: () => setTimeLeft(0) },
    ]);
  };

  const getProgressPercentage = (): number => {
    const totalTime = isWorkTime ? workTime : completedPomodoros % 4 === 0 ? longBreak : shortBreak;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const renderProgressDots = () => {
    return Array.from({ length: 4 }).map((_, i) => (
        <View
            key={i}
            style={[styles.dot, i < completedPomodoros % 4 ? styles.dotCompleted : styles.dotEmpty]}
        />
    ));
  };



  const resetAll = () => {
    Alert.alert("Réinitialiser tout ?", "Cela va remettre à zéro vos progrès.", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Réinitialiser",
        onPress: () => {
          setIsRunning(false);
          setTimeLeft(workTime);
          setIsWorkTime(true);
          setCompletedPomodoros(0);
          setTotalSessions(0);
        },
      },
    ]);
  };



  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
  };

  return (
      <View style={styles.container}>

        <StatusBar hidden={isRunning} />
        <Video
            source={require('../../assets/background.mp4')} // ta vidéo locale
            rate={0.8}                 // vitesse normale
            volume={0}                  // silencieuse
            isMuted                     // muet
            resizeMode="cover"          // couvre tout le container
            shouldPlay
            isLooping={false}// démarre automatiquement
            useNativeControls={false}   // ⚡ pas de play/pause à l’écran
            style={StyleSheet.absoluteFill} // remplit tout le parent

        />

        <View style={{...StyleSheet.absoluteFillObject, backgroundColor:'rgba(0,0,0,0.3)'}} />

        <View style={styles.header}>
          <Text style={styles.title}>🍅 Pomodoro Timer</Text>
          <Text style={styles.subtitle}>{isWorkTime ? "Temps de travail" : "Temps de pause"}</Text>
        </View>


        <View style={styles.timerContainer}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              {/* Cercle de progression */}
              <View
                  style={[
                    styles.progressCircle,
                    { transform: [{ rotate: `${(getProgressPercentage() * 360) / 100}deg` }] },
                  ] as any}
              />

              {/* Cercle intérieur avec effet glace */}
              <BlurView intensity={80} tint="light" style={styles.innerCircle}>
                <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
                <Text style={styles.sessionText}>Session {Math.floor(totalSessions / 2) + 1}</Text>
              </BlurView>
            </View>
          </View>

          <View style={styles.progressDots}>{renderProgressDots()}</View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{completedPomodoros}</Text>
              <Text style={styles.statLabel}>Focus Run</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{totalSessions}</Text>
              <Text style={styles.statLabel}>Break Sessions</Text>
            </View>
          </View>

        </View>
        <View
            style={[
              styles.controls,
              { marginTop: isRunning ? 20 : 15, marginBottom: isRunning ? 5 : 20 },
            ]}
        >
          {/* Reset */}
          <TouchableOpacity
              style={[styles.controlButton, styles.secondaryButton, styles.smallBtn]}
              onPress={resetTimer}
          >
            <Text style={styles.controlButtonText}>🔄</Text>
          </TouchableOpacity>

          {/* Play / Pause */}
          <TouchableOpacity
              style={[styles.controlButton, styles.primaryButton, styles.smallBtn]}
              onPress={toggleTimer}
          >
            <Text style={[styles.controlButtonText, styles.primaryButtonText]}>
              {isRunning ? "⏸️" : "▶️"}
            </Text>
          </TouchableOpacity>

          {/* Skip */}
          <TouchableOpacity
              style={[styles.controlButton, styles.secondaryButton, styles.smallBtn]}
              onPress={skipSession}
          >
            <Text style={styles.controlButtonText}>⏭️</Text>
          </TouchableOpacity>
        </View>


        {!isRunning && <TouchableOpacity
            style={[styles.resetAllButton, {marginBottom: isRunning ? 20 : 30}]}
            onPress={resetAll}
        >
          <Text style={styles.resetAllText}>Réinitialiser tout</Text>
        </TouchableOpacity>}
      </View>
  );
}
