import { palette } from "@/src/constants/palette";
import { getProfile } from "@/src/services/api/authApi";
import { deleteToken } from "@/src/services/storage/tokenStorage";
import { Role, User } from "@/src/types/user";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ROLE_NAME: Record<Role, string> = {
    professor: "Professor",
    student: "Estudante"
};

const ROLE_COLOR: Record<Role, string> = {
    professor: palette.teacherRole,
    student: palette.primary
};

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    let roleName: string = "Aluno";
    let roleColor: string = palette.primary;

    if (user?.role) {
        roleName = ROLE_NAME[user.role];
        roleColor = ROLE_COLOR[user.role];
    }

    const loadUser = async () => {
        try {
            setUser(await getProfile());
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await deleteToken();
        router.replace("/login");
    };

    useEffect(() => {
        loadUser();
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator color={palette.primary} size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <TouchableOpacity style={styles.reloadButton} onPress={() => loadUser()}>
                    <Text style={{ textAlign: "center" }}>Tentar novamente!</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.centered}>
            <View style={styles.data}>
                <Text style={{ ...styles.role, backgroundColor: roleColor }}>{roleName}</Text>
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>
            <TouchableOpacity style={styles.logout} onPress={() => handleLogout()}>
                <Text style={styles.textLogout}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    name: {
        fontWeight: "bold",
        fontSize: 22,
        marginVertical: 12
    },
    role: {
        fontSize: 14,
        alignSelf: "flex-start",
        backgroundColor: palette.teacherRole,
        color: palette.onPrimary,
        padding: 4,
        borderRadius: 10
    },
    email: {
        fontSize: 16,
        textAlign: "left"
    },
    logout: {
        marginVertical: 24,
        backgroundColor: palette.logout,
        width: "50%",
        paddingVertical: 14,
        borderRadius: 10,
        elevation: 3
    },
    textLogout: {
        color: palette.onPrimary,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 14
    },
    reloadButton: {
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: palette.textError,
        borderRadius: 10
    },
    data: {
        backgroundColor: palette.surface,
        width: "70%",
        padding: 10,
        borderWidth: 1,
        borderColor: palette.border,
        borderRadius: 10,
        elevation: 3
    }
});
