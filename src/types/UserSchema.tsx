import { ObjectId } from "mongodb";

export interface UserAvatar {
  accessory: string;
  clothes: string;
  clothes_color: string;
  eyebrow: string;
  eyes: string;
  facial_hair: string;
  facial_hair_color: string;
  hair_color: string;
  hair_style: string;
  mouth: string;
  skin_color: string;
}
export interface UserProfile {
  _id: ObjectId | string;
  email: string;
  email_confirmed: boolean;
  first_name: string;
  last_name: string;
  user_id: string;
  userAvatar: UserAvatar;
}
export interface UserPoint{
    _id: ObjectId | string; 
    class_id: ObjectId | string;

}
export type UserSchema = {
  _id: ObjectId | string;
  account_type: "student" |  "teacher" | "admin";
  admins: ObjectId[] | string[]
  organization_id?: ObjectId | string
  payment_confirmed?: boolean;
  payment_info?: string
  user_creation_date: Date | string;
  user_settings: Object 
  user_points: UserPoint[];
  user_profile: UserProfile
};
export type StudentUser = UserSchema
export type TeacherUser = UserSchema & { organization_id: ObjectId | string }
export type AdminUser = TeacherUser
