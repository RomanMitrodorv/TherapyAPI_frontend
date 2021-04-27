import { Injectable, EventEmitter } from '@angular/core';
import { Specialist } from '../models';

@Injectable()
export class StorageService {
    private selectedSpecialist = new EventEmitter<Specialist>(null);
    private isSpecialist = new EventEmitter<boolean>(false);

    constructor () {
        
    }

    setSpecialist(specialist: Specialist) {
        this.selectedSpecialist.emit(specialist);
    }

    getSpecialist() {
        return this.selectedSpecialist;
    }
    
    resetSpecialist() {
        this.selectedSpecialist.emit(null);
    }

    setRole(isSpecialist: boolean) {
        this.isSpecialist.emit(isSpecialist);
    }

    getRole(){
        return this.isSpecialist;
    }
}