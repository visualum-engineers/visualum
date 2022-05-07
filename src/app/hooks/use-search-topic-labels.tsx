import { useMemo, useState } from "react"
import {debounce} from "lodash"
const searchDataBase = async(string: string) =>{
    return([{id: "3", content:"no"}, {id: "4", content: "yes"}])
}
const useSearchTopicLabels = ():[
    {id: string, content: string}[],
    (e: any) => any
] => {
    const initialState = [{id: "1", content:"science"}, {id: "2", content: "math"}]
    const [topicLabels, setTopicLabels] = useState(initialState)

    //look up labels
    const searchDBLabels = async ({
        string,
        initialState
    }: any) => {
        try{
            const topicsRecieved = await searchDataBase(string)

            if(Array.isArray(topicsRecieved)) setTopicLabels(topicsRecieved)
            else setTopicLabels(initialState)

            return Array.isArray(topicsRecieved) ? topicsRecieved : initialState
        }
        catch(e){
            setTopicLabels(initialState)
            return initialState
        } 
    }
    const debouncedSearchLabels = useMemo(
        () => debounce(async(e) => {
                try{ return await e.searchDBLabels(e)} 
                catch{ console.error(e)}
            }, 500, {leading: true, trailing: true})
    , [])

    const onSearch = async(string: string) => {
            //const topics = 
            try{
                const topics = debouncedSearchLabels({
                    string,
                    initialState, 
                    searchDBLabels: searchDBLabels
                })
                return topics
            } 
            catch(e) { console.error(e) }
    }
    return [topicLabels, onSearch]
}
export default useSearchTopicLabels