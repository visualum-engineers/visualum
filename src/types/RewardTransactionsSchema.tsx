import { ObjectId } from "mongodb"
export type RewardTransactions = {
    _id: ObjectId | string; 
    date_redeemed: Date | string;
    price: number; 
    user_id: ObjectId | string;
    org_store_id?: ObjectId | string;
    org_store_name?: string;
    class_store_id?: ObjectId | string;
    class_store_name?: string; 
    reward_id: ObjectId | string; 
    reward_name: string;
}
