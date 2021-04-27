import { Session } from './session.model';
import { ProblemResourceTask } from './problem-resource-task.model';

export class ProblemResource {
    public id: number;
    public session: Session;
    public title: string;
    public emotion: string;
    public location: string;
    public characteristic: string;
    public influence: string;
    public likeScore: number;
    public tasks: ProblemResourceTask[];
}