export interface Notification{
    key: string,
    severity : NotificationSeverity,
    message: string,
}


export enum NotificationSeverity {
    Success = "success",
    Warning = "warning" ,
    Error = "error"
}

