import { UserRole } from '../enums';
import { Specialist } from '../models';

export class LocalStorageHelper {
    static getToken(): string {
        const token = localStorage.getItem('Authorization');
        if (!token) return;

        return token
    }

    static saveToken(token: string): boolean {
        if (!token) return false;

        localStorage.setItem('Authorization', token);
        return true;
    }

    static removeToken(): void {
        localStorage.removeItem('Authorization');
    }

    static getSpecialist(): number {
        const savedItem = localStorage.getItem('saved_specialist_id');
        if (!savedItem) return;

        return Number(savedItem);
    }

    static saveSpecialist(specialist: Specialist): void {
        localStorage.setItem('saved_specialist_id', specialist.id.toString())
    }
}
