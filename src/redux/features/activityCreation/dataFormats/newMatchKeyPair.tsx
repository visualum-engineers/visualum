import { v4 as uuidv4 } from 'uuid';

const newMatchKeyPair = () =>{
    return {
        id: uuidv4(), 
        key: { id: uuidv4(),content:"Empty"}, 
        answer: { id:uuidv4(),content:"Empty"}
    }
}
export default newMatchKeyPair