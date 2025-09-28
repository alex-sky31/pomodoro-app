import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TimerSettingsProvider } from '@/app/contexts/TimerSettingsContext'
import {TimerStateProvider} from "@/app/contexts/TimerStateContext";

export default function RootLayout() {
    return (
        <TimerSettingsProvider>
            <TimerStateProvider>

            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                />
            </Stack>
            <StatusBar style="dark" />
            </TimerStateProvider>
        </TimerSettingsProvider>
    );
}
