export class DateTimeHelper {
    static toLocalDateTime(value: Date) {
        const date = new Date(value);
        const result = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getMinutes(), date.getMilliseconds()));
        
        return result;
    }
}