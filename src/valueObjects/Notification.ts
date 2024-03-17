interface Notification{
    key?: string,
    severity : NotificationSeverity,
    message: string,
    duration?: number,
}


enum NotificationSeverity {
    Success = "success",
    Warning = "warning" ,
    Error = "error"
}

export {
    Notification, 
    NotificationSeverity
}

