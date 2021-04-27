export class ProblemImage {
    public id: number;
    public parentImage: ProblemImage;
    public title: string;
    public emotion: string;
    public location: string;
    public characteristic: string;
    public isMine: boolean;
    public isIDo: boolean;
    public isForever: boolean;
    public likeScore: number;
    public isHidden: boolean;
}