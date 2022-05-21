import { ObjectId } from "mongodb";
export type SubmissionSchema = {
  _id: string | ObjectId;
  assignment_name: string;
  questions: [];
  start_time: Date | string;
  end_time: Date | string;
  due_date: Date | string;
  time_limit?: number;
  is_graded: boolean;
  max_points: number;
  points_earned?: number;
  class_id: string | ObjectId;
  organization_id?: string | ObjectId;
  assignment_creator: {
    teacher_name: string;
    teacher_id: string | ObjectId;
  };
};