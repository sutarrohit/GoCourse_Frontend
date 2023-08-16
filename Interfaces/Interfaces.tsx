/* eslint-disable @typescript-eslint/no-explicit-any */
// Course Interface

export interface Icourse {
  _id?: string;
  title?: string;
  description?: string;
  instructor?: string;
  duration?: number;
  price?: number;
  language?: string;
  image?: string;
  videoLink?: string;
  rating?: number;
  published?: boolean;
  createdAt?: string;
  courseContent?: string[];
  __v?: number;
}

export interface IcourseData {
  courses: Icourse[];
  status?: "string";
}

export interface IcourseDataOne {
  course?: Icourse;
  status?: "string";
}

export interface CourseListProps {
  data?: IcourseData | undefined;
  isLoading?: boolean;
}
