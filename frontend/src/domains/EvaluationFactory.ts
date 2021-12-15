import { Evaluation, SubjectFactory, SubjectObject } from '.';

export interface EvaluationObject {
  uuid: string;
  subject: SubjectObject;
  name: string;
  rate: number;
  type: string;
}

export class EvaluationFactory {
  public static createFromResponseObject(obj: EvaluationObject) {
    return new Evaluation(
      obj.uuid,
      SubjectFactory.createFromResponseObject(obj.subject),
      obj.name,
      obj.rate,
      obj.type,
    );
  }
}
