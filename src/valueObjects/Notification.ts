export interface Notification{
    key?: string,
    severity : NotificationSeverity,
    message: string,
    duration?: number,
}


export enum NotificationSeverity {
    Success = "success",
    Warning = "warning" ,
    Error = "error"
}

