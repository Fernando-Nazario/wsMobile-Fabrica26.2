import { palette } from "@/src/constants/palette";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

export default function RootLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ presentation: "card", title: "Login" }} />
                <Stack.Screen
                    name="subject/[id]"
                    options={{
                        presentation: "modal",
                        title: "Detalhes",
                        headerStyle: { backgroundColor: palette.surface },
                        headerTintColor: palette.text,
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={24} color={palette.text} />
                            </TouchableOpacity>
                        )
                    }}
                />
            </Stack>
            <Toast />
        </>
    );
}
