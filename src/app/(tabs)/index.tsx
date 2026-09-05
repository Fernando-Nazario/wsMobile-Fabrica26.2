import SubjectCard from "@/src/components/Card/subjectCard";
import { showErrorToast } from "@/src/components/ToastError/ToastError";
import { validateAccess } from "@/src/services/api/authApi";
import { getSubjects } from "@/src/services/api/subjectApi";
import { ApiError } from "@/src/types/apiErrors";
import { Subject } from "@/src/types/subject";
import { router } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
    const [validadeLoading, setValidadeLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(true);
    const [data, setData] = useState<Subject[]>([]);
    const [error, setError] = useState(false);
    const [errorRetry, setErrorRetry] = useState(false);

    const loadSubjects = useCallback(async () => {
        try {
            setData(await getSubjects());
            setError(false);
        } catch(err) {
            const apiError = err as ApiError;
            showErrorToast(apiError);
            if(apiError.status === 401) {
                router.replace("/login");
                return;
            }
            setError(true);
        }
    }, []);

    const errorLoadDataRetry = async () => {
        setErrorRetry(true);
        try {
            await loadSubjects();
        } finally {
            setErrorRetry(false);
        }
    }

    useEffect(() => {
        const handleInit = async () => {
            try{
                await validateAccess();
            } catch {
                setDataLoading(false);
                router.replace("/login");
                return;
            } finally {
                setValidadeLoading(false);
            }

            try {
                await loadSubjects();
            } finally {
                setDataLoading(false);
            }
        }

        handleInit();
    }, [loadSubjects]);

    if(validadeLoading) {
        return(
            <View style={styles.centered}>
                <ActivityIndicator/>
            </View>
        );
    }

    if(dataLoading) {
        return(
            <View style={styles.centered}>
                <ActivityIndicator/>
            </View>
        );
    }

    if(error) {
        return(
            <TouchableOpacity disabled={errorRetry} onPress={() => {errorLoadDataRetry()}}>
                {errorRetry ? <ActivityIndicator/> : <Text>Tentar novamente</Text>}
            </TouchableOpacity>
        );
        
    }

    return(
        <View>
            <FlatList
                data={data}
                keyExtractor={(sub) => sub.id}
                renderItem={({item}) => (
                    <SubjectCard info={item}/>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

