import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TimerSettingsProvider } from '@/app/contexts/TimerSettingsContext'

export default function RootLayout() {
    return (
        <TimerSettingsProvider>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                />
            </Stack>
            <StatusBar style="dark" />
        </TimerSettingsProvider>
    );
}
