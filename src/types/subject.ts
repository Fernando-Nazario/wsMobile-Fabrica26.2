type SubjectStatus = "active" | "pending" | "inactive";

export interface Subject {
    id: string,
    name: string,
    description: string,
    status: SubjectStatus
}
