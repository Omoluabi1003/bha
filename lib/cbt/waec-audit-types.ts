export type WaecAuditSeverity='blocker'|'review';
export type WaecAuditFinding={subject?:string;severity:WaecAuditSeverity;message:string};
