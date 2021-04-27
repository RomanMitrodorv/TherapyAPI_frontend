import { FileType } from '../enums';

export class File {
    public id: number;
    public name: string;
    public type: FileType;
    public url: string;
}