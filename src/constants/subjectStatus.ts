import { palette } from "@/src/constants/palette";
import { SubjectStatus } from "@/src/types/subject";

export const STATUS_NAME: Record<SubjectStatus, string> = {
    "active": "Ativo",
    "inactive": "Inativo",
    "pending": "Pendente"
};

export const STATUS_COLOR: Record<SubjectStatus, { bgColor: string; textColor: string }> = {
    "active": { bgColor: palette.statusActiveBg, textColor: palette.statusActiveText },
    "inactive": { bgColor: palette.statusInactiveBg, textColor: palette.statusInactiveText },
    "pending": { bgColor: palette.statusPendingBg, textColor: palette.statusPendingText }
};
