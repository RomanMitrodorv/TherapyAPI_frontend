import { Problem } from './problem.model';
import { ProblemImage } from './problem-image.model';
import { ProblemResource } from './problem-resource.model';
import { SpecialistSession } from './specialist-session.model';

export class ProblemAssets {
    public problem: Problem;
    public images: ProblemImage[];
    public resources: ProblemResource[];
    public sessions: SpecialistSession[];
}