import { ApiError, ErrorHttpStatus } from "@/src/types/apiErrors";
import Toast from "react-native-toast-message";

export function showErrorToast(error: ApiError) {
    let message: string;

    switch (error.status) {
        case ErrorHttpStatus.BAD_REQUEST:
            message = "Requisição inválida!";
            break;
        case ErrorHttpStatus.UNAUTHORIZED:
            message = "Você não tem permissão para fazer isso!";
            break;
        case ErrorHttpStatus.NOT_FOUND:
            message = "Matérias não encontradas!";
            break;
        case ErrorHttpStatus.INTERNAL_SERVER_ERROR:
            message = "Erro no servidor, tente novamente mais tarde!";
            break;
        case ErrorHttpStatus.NO_RESPONSE:
            message = "Sem resposta, verifique sua conexão com a internet!";
            break;
        default:
            message = error.message || "Erro desconhecido!";
    }

    Toast.show({
        type: "error",
        text1: `Erro ${error.status}`,
        text2: message,
    });
}
