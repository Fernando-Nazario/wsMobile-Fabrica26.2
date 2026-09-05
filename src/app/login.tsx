import { palette } from "@/src/constants/palette";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../services/api/authApi";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        const formatedEmail = email.trim().toLocaleLowerCase();
        try {
            if (!(formatedEmail || password.trim())) {
                throw new Error();
            }
            await auth({ email: email, password: password });
            router.replace("/");
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.labelInput}>Email</Text>

            <TextInput
                style={styles.inputText}
                placeholder="Digite seu email..."
                placeholderTextColor={palette.textMuted}
                onChangeText={(email) => setEmail(email)}
            />

            <Text style={styles.labelInput}>Senha</Text>

            <TextInput
                style={styles.inputText}
                autoCapitalize="none"
                placeholder="Digite sua senha..."
                placeholderTextColor={palette.textMuted}
                onChangeText={(password) => setPassword(password)}
            />

            {error && <Text style={{ color: palette.textError }}>Email ou senha incorretos</Text>}

            <TouchableOpacity style={styles.inputEntry} disabled={loading} onPress={() => handleLogin()}>
                {loading ? (
                    <ActivityIndicator color={palette.onPrimary} />
                ) : (
                    <Text style={styles.entryLabel}>Entrar</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: palette.background
    },
    inputText: {
        backgroundColor: palette.surface,
        borderWidth: 1,
        borderColor: palette.border,
        borderRadius: 10,
        marginBottom: 18,
        width: "100%",
        paddingLeft: 8,
        height: 50,
        color: palette.text
    },
    labelInput: {
        alignSelf: "flex-start",
        fontSize: 18,
        marginBottom: 4,
        color: palette.text
    },
    inputEntry: {
        backgroundColor: palette.primary,
        width: "100%",
        paddingVertical: 13,
        borderRadius: 10,
        marginTop: 20
    },
    entryLabel: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        color: palette.onPrimary
    }
});
