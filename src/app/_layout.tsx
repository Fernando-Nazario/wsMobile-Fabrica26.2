import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ presentation: "card", title: "Login" }} />
                <Stack.Screen name="subject/[id]" options={{ presentation: "modal" }} />
            </Stack>
            <Toast />
        </>
    );
}
