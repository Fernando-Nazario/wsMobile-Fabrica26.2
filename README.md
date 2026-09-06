# wsMobile — Fábrica 26.2

Aplicativo mobile em **Expo / React Native** com **Expo Router**, feito para consumir a API da atividade (login com token e listagem de matérias).

## ⚠️ Importante: configure a BASE_URL

O app **não funciona sem uma `BASE_URL` válida apontando para a API da atividade**.

Edite [src/services/api/baseUrl.ts](src/services/api/baseUrl.ts):

```ts
export const BASE_URL = "http://SEU_ENDERECO:PORTA";
```

Dicas de endereço, conforme onde o app está rodando:

| Ambiente | Valor sugerido |
| --- | --- |
| Emulador Android | `http://10.0.2.2:3000` (valor atual do arquivo) |
| Simulador iOS | `http://localhost:3000` |
| Celular físico (Expo Go) | `http://IP_DA_SUA_MAQUINA:3000` |
| API hospedada | a URL pública da API |

Sem uma URL acessível pelo dispositivo, todas as telas vão falhar com erro de rede.

## Pré-requisitos

- Node.js 20+
- pnpm
- A API da atividade rodando (ou publicada) e acessível pelo dispositivo/emulador

## Instalação

```bash
pnpm install
```

## Executando

```bash
npx expo start          # inicia o dev server
npx expo start --android
npx expo start --ios
npx expo start --web
```

## Endpoints consumidos

| Método | Endpoint | Uso |
| --- | --- | --- |
| POST | `/auth/login` | Login, retorna o `accessToken` |
| GET | `/auth/me` | Valida o token e carrega o perfil |
| GET | `/subjects` | Lista de matérias |
| GET | `/subjects/:id` | Detalhe de uma matéria |

Todas as rotas (exceto o login) exigem o header `Authorization: Bearer <token>`. O token é salvo com `expo-secure-store`.

## Estrutura

```
src/
  app/          # rotas (Expo Router): login, tabs, subject/[id]
  components/   # componentes de UI
  constants/    # paleta de cores e status das matérias
  services/
    api/        # baseUrl.ts, authApi.ts, subjectApi.ts
    storage/    # armazenamento do token
    utils/      # tratamento de erros
  types/        # tipos da API
```

## Scripts úteis

```bash
pnpm lint         # lint
npx tsc --noEmit  # checagem de tipos
```
