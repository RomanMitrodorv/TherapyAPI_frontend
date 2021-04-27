import { Problem } from './problem.model';
import { ProblemImage } from './problem-image.model';
import { ProblemResource } from './problem-resource.model';
import { Session } from './session.model';

export class ClientProblemAssets {
    public problem: Problem;
    public images: ProblemImage[];
    public resources: ProblemResource[];
    public sessions: Session[];
}