import { v4 as uuidv4 } from 'uuid';
import { newSortAnswer } from '.';
export const newSortCategory = () =>{
    return {   
        id: uuidv4(), 
        title: "Untitled", 
        answers:[newSortAnswer()]
    }
}
