import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Vibration,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../styles/PomodoroStyles";
import { useTimerSettings } from "@/app/contexts/TimerSettingsContext";

/*const WORK_TIME = 25 * 60; // 25 minutes
const SHORT_BREAK = 5 * 60; // 5 minutes
const LONG_BREAK = 15 * 60; // 15 minutes*/

export default function PomodoroScreen() {
  const { workTime, shortBreak, longBreak } = useTimerSettings();

  const [timeLeft, setTimeLeft] = useState<number>(workTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isWorkTime, setIsWorkTime] = useState<boolean>(true);
  const [completedPomodoros, setCompletedPomodoros] = useState<number>(0);
  const [totalSessions, setTotalSessions] = useState<number>(0);

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

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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

  return (
      <LinearGradient
          colors={isWorkTime ? ["#FF6B6B", "#FF8E8E"] : ["#4ECDC4", "#6BCFCF"]}
          style={styles.container}
      >
        <StatusBar barStyle="light-content" />

        <View style={styles.header}>
          <Text style={styles.title}>🍅 Pomodoro Timer</Text>
          <Text style={styles.subtitle}>{isWorkTime ? "Temps de travail" : "Temps de pause"}</Text>
        </View>

        <View style={styles.timerContainer}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <View
                  style={[
                    styles.progressCircle,
                    { transform: [{ rotate: `${(getProgressPercentage() * 360) / 100}deg` }] },
                  ] as any}
              />
              <View style={styles.innerCircle}>
                <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
                <Text style={styles.sessionText}>Session {Math.floor(totalSessions / 2) + 1}</Text>
              </View>
            </View>
          </View>

          <View style={styles.progressDots}>{renderProgressDots()}</View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{completedPomodoros}</Text>
              <Text style={styles.statLabel}>Pomodoros</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalSessions}</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={[styles.controlButton, styles.secondaryButton]} onPress={resetTimer}>
            <Text style={styles.controlButtonText}>🔄</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.controlButton, styles.primaryButton]} onPress={toggleTimer}>
            <Text style={[styles.controlButtonText, styles.primaryButtonText]}>
              {isRunning ? "⏸️" : "▶️"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.controlButton, styles.secondaryButton]} onPress={skipSession}>
            <Text style={styles.controlButtonText}>⏭️</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.resetAllButton} onPress={resetAll}>
          <Text style={styles.resetAllText}>Réinitialiser tout</Text>
        </TouchableOpacity>
      </LinearGradient>
  );
}
