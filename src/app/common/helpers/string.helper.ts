export class StringHelper {
    static getFirstLetter(value: string) {
        if (!value || value == "") {
            return "";
        }

        return value.substr(0, 1);
    }

    static formatPhone(value: string) {
        if (!value || value == "") {
            return "";
        }

        let result = "+7 ";

        result += value.substr(2, 3);
        result += " ";
        result += value.substr(5, 3);
        result += " ";
        result += value.substr(8, 2);
        result += " ";
        result += value.substr(10, 2);

        return result;
    }
}