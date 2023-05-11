export interface CourseSchema {
  courseId: string;
  contentMetadata: any;
}

export function validateCourseSchema(schema: CourseSchema): string[] {
  const errors: string[] = [];
  return errors;
}
