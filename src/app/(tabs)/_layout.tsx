import { Tabs } from "expo-router";
import { Ionicons } from "@react-native-vector-icons/ionicons";
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
            <Tabs.Screen name="index" options={{
                title: "Matérias",
                tabBarIcon: ({color, size, focused}) => (
                    <Ionicons name={focused ? "book" : "book-outline"} size={size} color={color}/>
                )
            }}/>
            <Tabs.Screen name="profile" options={{
                title: "Perfil",
                tabBarIcon: ({color, size, focused}) => (
                    <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color}/>
                )
            }}/>
        </Tabs>
    );
}