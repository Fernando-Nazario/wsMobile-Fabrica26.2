import { palette } from "@/src/constants/palette";
import { Subject, SubjectStatus } from "@/src/types/subject";
import { router } from "expo-router";
import { Pressable, View, Image, StyleSheet, Text } from 'react-native';

type SubjectProps = {
    data : Subject,
}

const STATUS_NAME : Record<SubjectStatus, string> = {
    "active" : "Ativo",
    "inactive" : "Inativo",
    "pending" : "Pendente"
}

const STATUS_COLOR : Record<SubjectStatus, {bgColor : string, textColor : string}> = {
    "active" : {bgColor: palette.statusActiveBg, textColor: palette.statusActiveText},
    "inactive" : {bgColor: palette.statusInactiveBg, textColor: palette.statusInactiveText},
    "pending": {bgColor: palette.statusPendingBg, textColor: palette.statusPendingText}
}

export default function SubjectCard({data} : SubjectProps) {
    const statusName = STATUS_NAME[data.status];
    const statusColor = STATUS_COLOR[data.status];

    const handleCardPress = () => {
        router.push({ pathname: "/subject/[id]", params: { id: data.id } });
    }

    return(
        <> 
            
            <Pressable style={styles.card} onPress={() => handleCardPress()}>
                <Text style={{...styles.status,backgroundColor: statusColor.bgColor, color: statusColor.textColor, borderColor: statusColor.textColor}}>{statusName}</Text>
                <Image 
                    source={{uri: data.coverUrl}}
                    style={styles.image}
                />
                <View>
                    <Text style={styles.title}>{data.name}</Text>
                    <Text>{data.description}</Text>
                </View>
            </Pressable>
        </>
       
    );
}

const styles = StyleSheet.create({
    card:{
        width: '100%',
        backgroundColor: palette.surface,
        borderColor: palette.border,
        borderRadius: 10,
        borderWidth: 1,
        padding: 12,
        marginBottom: 18,
        elevation: 2
    },
    image: {
        width: '100%',
        height: 140
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 4
    },
    status: {
        width: 70,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 12,
        alignSelf: "flex-start",
        marginBottom: 6,
        elevation: 1
    }
})
