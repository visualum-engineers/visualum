import { ObjectId } from "mongodb";
export type RewardStoreItem = {
    _id: string | ObjectId; 
    name: string;
    price: number | string; 
    num_available: number; 
    imgURL?: string;
    creation_date: Date | string;
    org_store_id?: ObjectId | string; 
    class_store_id?: ObjectId |  string; 
}