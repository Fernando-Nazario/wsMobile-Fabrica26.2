import SubjectCard from "@/src/components/Card/subjectCard";
import { showErrorToast } from "@/src/components/ToastError/ToastError";
import { palette } from "@/src/constants/palette";
import { validateAccess } from "@/src/services/api/authApi";
import { getSubjects } from "@/src/services/api/subjectApi";
import { ApiError } from "@/src/types/apiErrors";
import { Subject } from "@/src/types/subject";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
    const [data, setData] = useState<Subject[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            setData(await getSubjects());
        } catch(err) {
            const error = err as ApiError;
            showErrorToast(error);
            setError(true);
        } finally {
            setRefreshing(false);
        }
    }

    const loadData = async () => {
        setLoading(true);
        try {
            setData(await getSubjects());
        } catch(err) {
            const error = err as ApiError;
            showErrorToast(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const handleInit = async () => {
            try {
                await validateAccess();
            } catch {
                router.replace("/login");
            }

            await loadData();
        };
        handleInit();
    },[])

    if(loading) {
        return(
            <View style={styles.centered}>
                <ActivityIndicator color={palette.primary} size={"large"}/>
            </View>
        );
    }

    if(error) {
        return(
            <View style={styles.centered}>
                <TouchableOpacity style={styles.reloadButton} onPress={() => {loadData()}}>
                    <Text style={{textAlign: 'center'}}>
                        Tentar novamente!
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <FlatList 
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <SubjectCard data={item}/>
                )}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                style={{marginTop: 16}}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                overScrollMode="always"
                bounces={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        paddingHorizontal: 16,
    },
    reloadButton: {
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: palette.textError,
        borderRadius: 10
    }
});