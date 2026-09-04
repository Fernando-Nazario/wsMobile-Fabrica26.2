import * as SecureStore from 'expo-secure-store';

async function saveToken(accessToken : string) {
    await SecureStore.setItemAsync('access_token',accessToken);
}

async function readToken() : Promise<String> {
    const token = await SecureStore.getItemAsync('access_token');

    if(!token) {
        throw new Error("Token does not exist");
    }

    return token;
}

async function deleteToken() {
    await SecureStore.deleteItemAsync('access_token');
}