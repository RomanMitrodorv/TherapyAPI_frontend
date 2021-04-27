import { ProblemResource } from './problem-resource.model';

export class ProblemResourceTask {
    public id?: number;
    public resource?: ProblemResource;
    public title: string;
    public isDone: boolean;
}