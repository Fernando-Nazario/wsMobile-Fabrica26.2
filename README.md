# wsMobile — Fábrica 26.2

Aplicativo mobile em **Expo / React Native** com **Expo Router**, feito para consumir a API da atividade: login com token, listagem de matérias, detalhe da matéria e perfil do usuário.

---

## 1. Como inicializar o projeto

### Pré-requisitos

- **Node.js 20+**
- **pnpm** (o projeto usa `pnpm-lock.yaml`)
- A **API da atividade rodando** e acessível pelo dispositivo/emulador
- Android Studio ou Xcode, se for usar emulador/simulador

### Passo 1 — Instalar as dependências

```bash
pnpm install
```

### Passo 2 — ⚠️ Configurar a BASE_URL (obrigatório)

O app **não funciona sem uma `BASE_URL` válida apontando para a API da atividade**.

Edite [src/services/api/baseUrl.ts](src/services/api/baseUrl.ts):

```ts
export const BASE_URL = "http://SEU_ENDERECO:PORTA";
```

Use o endereço correto para o seu ambiente:

| Onde o app está rodando | Valor da BASE_URL |
| --- | --- |
| Emulador Android | `http://10.0.2.2:3000` (valor atual do arquivo) |
| Simulador iOS | `http://localhost:3000` |
| Celular físico (Expo Go) | `http://IP_DA_SUA_MAQUINA:3000` |
| API hospedada | a URL pública da API |

Sem uma URL acessível pelo dispositivo, **todas as telas falham com erro de conexão**.

### Passo 3 — Rodar o app

```bash
npx expo start              # abre o menu do Metro (escolha a plataforma pelo teclado)
npx expo start --android    # emulador / dispositivo Android
npx expo start --ios        # simulador iOS (macOS)
npx expo start --web        # navegador
npx expo start --tunnel     # quando o celular não está na mesma rede do PC
```

Ou pelos scripts do `package.json`: `pnpm start`, `pnpm android`, `pnpm ios`, `pnpm web`.

### Rodando no celular com Expo Go

1. Instale o **Expo Go** na loja do seu celular.
2. Aponte a `BASE_URL` para o **IP da máquina** (não `localhost`).
3. Rode `npx expo start` e escaneie o QR Code do terminal.

> As pastas `android/` e `ios/` não existem — o projeto usa **Continuous Native Generation**. Configurações nativas ficam em [app.json](app.json). Para um build de desenvolvimento: `npx expo run:android` / `npx expo run:ios`.

### Comandos úteis

```bash
pnpm lint            # lint
npx tsc --noEmit     # checagem de tipos
npx expo-doctor      # diagnostica dependências e configuração
npx expo start -c    # limpa o cache do Metro
```

---

## 2. Possíveis problemas na inicialização

| Problema | Causa | Como resolver |
| --- | --- | --- |
| Toast **"Erro -1 — Sem resposta"** | O app não alcança a API | Confira se a API está no ar, se a `BASE_URL` bate com o ambiente, se a API ouve em `0.0.0.0` e se o Firewall do Windows libera as portas 3000 e 8081 |
| Celular físico não conecta | PC e celular em redes diferentes | Use o IP da máquina na `BASE_URL` ou rode `npx expo start --tunnel` |
| Ícones das abas não aparecem | `@react-native-vector-icons/ionicons` é módulo nativo, não incluso no Expo Go | Gere um development build: `npx expo run:android` |
| `expo prebuild` / `eas build` falha por imagem | O [app.json](app.json) aponta para `./assets/images/...`, mas os arquivos estão em `src/assets/images/` | Ajuste os caminhos no `app.json` para `./src/assets/images/...` ou mova a pasta para a raiz |
| Login não persiste no `--web` | `expo-secure-store` não tem suporte no navegador | Teste o fluxo completo em Android/iOS |
| `Unable to resolve module ...` | `node_modules` simbólico do pnpm x Metro | Crie um `.npmrc` com `node-linker=hoisted`, apague `node_modules` e reinstale |
| Erros `EPERM` / `EBUSY` / lentidão | O projeto está dentro do **OneDrive** e a sincronização trava arquivos | Pause o OneDrive, exclua a pasta da sincronização ou mova o projeto para `C:\dev\...` |
| Porta 8081 em uso | Outro Metro rodando | `npx expo start --port 8082` ou `netstat -ano \| findstr :8081` + `taskkill /PID <PID> /F` |
| App volta sempre para o login | Token ausente, expirado ou inválido | Faça login novamente; para limpar o token, use o Logout ou reinstale o app |
| Erros aleatórios após trocar dependência | Cache do Metro | `npx expo start -c` e `npx expo install --fix` |

---

## 3. Arquitetura projetada

O projeto separa **rotas**, **apresentação** e **acesso a dados**. Nenhuma tela chama `axios` diretamente: toda comunicação com a API passa pela camada de `services`.

```
Tela (src/app)  →  Service de API (src/services/api)  →  axios  →  API
      ↑                      │
      │                      ├─→ tokenStorage (expo-secure-store)
      │                      └─→ getErrorType  →  ApiError normalizado
      └────── showErrorToast (Toast) ←───────────────────┘
```

### Camadas

| Camada | Pasta | Responsabilidade |
| --- | --- | --- |
| Rotas / Telas | [src/app/](src/app/) | Cada arquivo é uma rota do Expo Router. Controla estado de tela (loading, erro, dados) e navegação. |
| Componentes | [src/components/](src/components/) | UI reutilizável, sem chamada de API (`SubjectCard`, `showErrorToast`). |
| Constantes | [src/constants/](src/constants/) | Paleta de cores e mapeamento de status das matérias. |
| Serviços de API | [src/services/api/](src/services/api/) | Um arquivo por domínio (`authApi`, `subjectApi`) + `baseUrl.ts` como ponto único de configuração. |
| Armazenamento | [src/services/storage/](src/services/storage/) | Persistência segura do `accessToken` via `expo-secure-store`. |
| Utils | [src/services/utils/](src/services/utils/) | `getErrorType` traduz qualquer erro para o formato `ApiError`. |
| Tipos | [src/types/](src/types/) | Contratos da API (`Subject`, `User`, `ApiError`, `Credentials`, `AuthResponse`). |

### Estrutura de pastas

```
src/
  app/
    _layout.tsx          # Stack raiz + <Toast /> global
    login.tsx            # tela de login
    (tabs)/
      _layout.tsx        # navegação por abas
      index.tsx          # lista de matérias
      profile.tsx        # perfil + logout
    subject/[id].tsx     # detalhe da matéria (modal)
  components/
    Card/subjectCard.tsx
    ToastError/ToastError.tsx
  constants/
    palette.ts
    subjectStatus.ts
  services/
    api/       baseUrl.ts | authApi.ts | subjectApi.ts
    storage/   tokenStorage.ts
    utils/     getErrorType.ts
  types/       subject.ts | user.ts | apiErrors.ts | credentials.ts | authResponse.ts
```

### Navegação

- **Stack raiz**: `(tabs)` (sem header) → `login` (card) → `subject/[id]` (modal, com botão voltar customizado).
- **Tabs**: `Matérias` (`index`) e `Perfil` (`profile`), com ícones Ionicons.
- `typedRoutes` habilitado em [app.json](app.json) — as rotas são tipadas.
- Alias de import `@/*` configurado em [tsconfig.json](tsconfig.json) (`@/src/...`).

### Endpoints consumidos

| Método | Endpoint | Auth | Uso |
| --- | --- | --- | --- |
| POST | `/auth/login` | — | Login, retorna o `accessToken` |
| GET | `/auth/me` | Bearer | Valida o token e carrega o perfil |
| GET | `/subjects` | Bearer | Lista de matérias |
| GET | `/subjects/:id` | Bearer | Detalhe de uma matéria |

---

## 4. Regras da aplicação

### Autenticação

- O login é feito em `POST /auth/login`; o `accessToken` retornado é salvo com **expo-secure-store** sob a chave `access_token`.
- Toda rota protegida envia `Authorization: Bearer <token>`.
- A tela de matérias chama `validateAccess()` (`GET /auth/me`) ao montar; se o token não existir ou for inválido, o usuário vai para `/login` com `router.replace`.
- Se não houver token salvo, os serviços lançam erro **antes** de chamar a API (falha rápida, sem requisição inútil).
- O **Logout** apaga o token do SecureStore e volta para `/login`.
- No login, campos vazios não disparam requisição — a tela mostra "Email ou senha incorretos".

### Tratamento de erros

- Todo erro de API passa por `getErrorType` e vira um `ApiError` com `status` e `message`.
- Status internos: `-1` = sem resposta (conexão), `-2` = erro desconhecido.
- Os erros aparecem como **toast**, com mensagens em português por status:

| Status | Mensagem |
| --- | --- |
| 400 | Requisição inválida! |
| 401 | Você não tem permissão para fazer isso! |
| 404 | Matérias não encontradas! |
| 500 | Erro no servidor, tente novamente mais tarde! |
| -1 | Sem resposta, verifique sua conexão com a internet! |

- Toda tela com carregamento tem três estados: **loading** (`ActivityIndicator`), **erro** (botão "Tentar novamente!") e **conteúdo**.

### Matérias

- Status possíveis: `active` → **Ativo**, `pending` → **Pendente**, `inactive` → **Inativo**.
- Nome e cor de cada status vêm de [src/constants/subjectStatus.ts](src/constants/subjectStatus.ts) — não devem ser redefinidos nas telas.
- A lista usa `FlatList` com **pull-to-refresh** e renderização incremental (`initialNumToRender`, `maxToRenderPerBatch`).
- Tocar em um card abre o detalhe como **modal**, buscando a matéria por id (com `encodeURIComponent`).

### Perfil

- `role` do usuário: `professor` → **Professor**, `student` → **Estudante**, cada um com sua cor.
- O avatar é gerado a partir das duas primeiras letras do nome.

### Convenções de código

- **TypeScript strict**: tipos da API sempre em `src/types/`.
- Novas chamadas de API entram em `src/services/api/`, nunca dentro de componentes.
- Cores sempre via `palette`, nunca hardcoded.
- Novas dependências sempre com `npx expo install <pacote>` (resolve a versão compatível com o SDK).
- Rodar `pnpm lint` e `npx tsc --noEmit` antes de finalizar qualquer tarefa.

---

## 5. Pacotes instalados (em uso)

### Core

| Pacote | Para quê |
| --- | --- |
| `expo` | SDK 57 — base do projeto |
| `react` / `react-native` | Framework de UI |
| `typescript` | Tipagem estática (`strict`) |

### Navegação

| Pacote | Para quê |
| --- | --- |
| `expo-router` | Roteamento por arquivos (`Stack`, `Tabs`, `router`, `useLocalSearchParams`) |
| `react-native-screens` | Telas nativas (performance de navegação) |
| `react-native-safe-area-context` | Áreas seguras (notch, barra de gestos) |
| `expo-linking` | Deep links / scheme `wsmobilefabrica262` |

### Dados e armazenamento

| Pacote | Para quê |
| --- | --- |
| `axios` | Chamadas HTTP à API (e `isAxiosError` no tratamento de erro) |
| `expo-secure-store` | Guarda o `accessToken` de forma segura no dispositivo |

### Interface

| Pacote | Para quê |
| --- | --- |
| `@react-native-vector-icons/ionicons` | Ícones das abas e do botão de voltar |
| `react-native-toast-message` | Toasts de erro (`<Toast />` no layout raiz) |
| `expo-splash-screen` | Splash configurada no `app.json` |
| `expo-status-bar` | Barra de status |
| `expo-font` | Carregamento de fontes (`SpaceMono`) |
| `react-native-reanimated` + `react-native-worklets` | Animações usadas pelo Expo Router / gestos |
| `react-native-web` / `react-dom` | Execução no navegador (`--web`) |
| `expo-constants` | Acesso a constantes do app/manifest |

### Desenvolvimento

| Pacote | Para quê |
| --- | --- |
| `eslint` + `eslint-config-expo` | Lint (`pnpm lint`) |
| `@types/react` | Tipos do React |

> Também estão em `package.json`, mas **ainda não utilizados** no código: `react-native-skeleton-placeholder`, `expo-symbols` e `expo-web-browser`.
