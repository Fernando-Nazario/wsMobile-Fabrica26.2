import * as SecureStore from 'expo-secure-store';

export async function saveToken(accessToken : string) {
    await SecureStore.setItemAsync('access_token',accessToken);
}

export async function readToken() : Promise<string | null> {
    const token = await SecureStore.getItemAsync('access_token');

    if(!token) {
        return null;
    }

    return token;
}

export async function deleteToken() {
    await SecureStore.deleteItemAsync('access_token');
}