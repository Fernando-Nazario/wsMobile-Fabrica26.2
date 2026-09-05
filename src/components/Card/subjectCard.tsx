import { Subject } from "@/src/types/subject"
import { Image, StyleSheet, Text, View } from "react-native";

type SubjectProps = {
    info: Subject
}

const STATUS_LABEL: Record<Subject["status"], string> = {
        active: "Ativo",
        inactive: "Inativo",
        pending: "Pendente",
};

export default function SubjectCard({info} : SubjectProps) {
    const status = STATUS_LABEL[info.status] ?? "Desconhecido";

    return(
        <View style={styles.card}>
            <Text style={styles.status}>{status}</Text>
            <Image
                source={{uri: info.coverUrl}}
                style={styles.image}
            />
            <View style={styles.textSection}>
                <Text style={styles.title}>
                    {info.name}
                </Text>
                <Text>
                    {info.description}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
    },
    status: {
        padding: 10,
        margin: 3,
        borderWidth: 1,
        alignSelf: "flex-start"
    },
    textSection: {
        paddingHorizontal: 5,
        paddingVertical:3,
        backgroundColor: "#808080"
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom:5
    },
    image: {
        width: '100%',
        height: 160
    }
})