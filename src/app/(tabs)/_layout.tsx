import { Tabs } from "expo-router";
import { palette } from "@/src/constants/palette";

export default function TabsLayout() {
    return(
        <Tabs screenOptions={{
            tabBarActiveTintColor: palette.primary,
            tabBarInactiveTintColor: palette.textMuted,
            tabBarStyle: {backgroundColor: palette.surface, borderTopColor: palette.border},
            headerStyle: {backgroundColor: palette.surface},
            headerTintColor: palette.text,
            headerShadowVisible: false
        }}>
            <Tabs.Screen name="index" options={{title: "Home"}}/>
            <Tabs.Screen name="profile" options={{title: "Perfil"}}/>
        </Tabs>
    );
}