import { ObjectId } from "mongodb";
export interface ClassGoal {
  _id: string | ObjectId;
  description: string;
  start_date: Date | string;
  end_date: Date | string;
  goal_type: "Assigment Completion" | "Grade Completion" | "Custom Goal";
}
export const isClassGoal = (e: any): e is ClassGoal => {
  try {
    const goal_type = e.goal_type;
    switch (goal_type) {
      case "Assigment Completion":
        return true;
      case "Grade Completion":
        return true;
      case "Custom Goal":
        return true;
      default:
        return false;
    }
  } catch (e) {
    return false;
  }
};
export type ClassSchema = {
  name: string;
  _id: string | ObjectId;
  teachers: {
    first_name: string;
    last_name: string;
    prefix: string;
    _id: ObjectId | string;
  }[];
  school: string | ObjectId;
  students: {
    first_name: string;
    last_name: string;
    _id: ObjectId | string;
  }[];
  active_assignments: string[] | ObjectId[];
  creation_date: Date | string;
  class_goals: ClassGoal[];
  class_code: {
    expiration: Date | string;
    code: number;
  };
  class_reward_store: {
    _id: ObjectId | string;
    name: string;
    rewards: string[] | ObjectId[];
  };
};
