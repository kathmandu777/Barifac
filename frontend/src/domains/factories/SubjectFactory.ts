import {
  Subject,
  TermResponse,
  SchoolResponse,
  SchoolFactory,
  TermFactory,
  DepartmentWithoutSchoolFactory,
} from '..';

export interface SubjectResponse {
  uuid: string;
  term: TermResponse;
  name: string;
  syllabus_url: string;
  category: string;
  type: string;
  target_grade: number;
  teacher: { name: string; uuid: string };
  credits: number;
  school: SchoolResponse;
  department: { uuid: string; name: string; syllabus_url: string };
}

export class SubjectFactory {
  public static createFromResponse(res: SubjectResponse) {
    const school = SchoolFactory.createFromResponse(res.school);
    const term = TermFactory.createFromResponse(res.term);
    const department = DepartmentWithoutSchoolFactory.createFromResponse(
      res.department,
    );
    return new Subject(
      res.uuid,
      term,
      res.name,
      res.syllabus_url,
      res.category,
      res.type,
      res.target_grade,
      res.teacher,
      res.credits,
      school,
      department,
    );
  }
}
