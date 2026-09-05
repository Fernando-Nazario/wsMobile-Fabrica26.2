import { Tabs } from "expo-router";

export default function TabsLayout() {
    return(
        <Tabs screenOptions={{tabBarActiveTintColor: "#007aec", tabBarInactiveTintColor: "#808080"}}>
            <Tabs.Screen name="index" options={{title: "Home"}}/>
            <Tabs.Screen name="profile" options={{title: "Perfil"}}/>
        </Tabs>
    );
}