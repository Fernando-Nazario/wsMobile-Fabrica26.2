import { showErrorToast } from "@/src/components/ToastError/ToastError";
import { palette } from "@/src/constants/palette";
import { STATUS_COLOR, STATUS_NAME } from "@/src/constants/subjectStatus";
import { getSingleSubject } from "@/src/services/api/subjectApi";
import { ApiError } from "@/src/types/apiErrors";
import { Subject } from "@/src/types/subject";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SubjectDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [subject, setSubject] = useState<Subject | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        const loadSubject = async () => {
            try {
                setSubject(await getSingleSubject(id));
                setError(false);
            } catch (err) {
                showErrorToast(err as ApiError);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        loadSubject();
    }, [id, reloadKey]);

    const handleRetry = () => {
        setLoading(true);
        setReloadKey((key) => key + 1);
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator color={palette.primary} size="large" />
            </View>
        );
    }

    if (error || !subject) {
        return (
            <View style={styles.centered}>
                <TouchableOpacity style={styles.reloadButton} onPress={() => handleRetry()}>
                    <Text style={{ textAlign: "center" }}>Tentar novamente!</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const statusColor = STATUS_COLOR[subject.status];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Image source={{ uri: subject.coverUrl }} style={styles.image} />
            <Text
                style={{
                    ...styles.status,
                    backgroundColor: statusColor.bgColor,
                    color: statusColor.textColor,
                    borderColor: statusColor.textColor
                }}
            >
                {STATUS_NAME[subject.status]}
            </Text>
            <Text style={styles.name}>{subject.name}</Text>
            <Text style={styles.description}>{subject.description}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.background
    },
    content: {
        padding: 16
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: palette.background
    },
    image: {
        width: "100%",
        height: 180,
        borderRadius: 10,
        marginBottom: 16
    },
    status: {
        alignSelf: "flex-start",
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 12,
        marginBottom: 12
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: palette.text,
        marginBottom: 8
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: palette.textMuted
    },
    reloadButton: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: palette.textError,
        borderRadius: 10
    }
});
