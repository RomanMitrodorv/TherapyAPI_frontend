import { ProblemResourceTask } from '../problem-resource-task.model';

export class CreateUpdateProblemResourceRequest {
    public title: string;
    public emotion: string;
    public location: string;
    public characteristic: string;
    public influence: string;
    public likeScore: number;
    public tasks?: ProblemResourceTask[];
}