import makeAnimated from 'react-select/animated';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { useDispatch, useSelector } from "react-redux";
import { updateTopicLabels } from '../../../../../redux/features/activityCreation/activityCreationData';
import useSearchTopicLabels from '../../../../hooks/use-search-topic-labels';
const animatedComponents = makeAnimated();

const ActivityTopicLabels = () =>{
    const [topicLabels, searchLabels] = useSearchTopicLabels()
    const activityTopics = useSelector(state => state.activityCreation.data.present.activityTopicLabels)
    //const activityName = useSelector(state=>state.activityCreation.data.present.activityName)
    const dispatch = useDispatch()
    const defaultLabels = activityTopics.map((topicLabel) =>{
        return({value: topicLabel.id, label: topicLabel.content})
    })
    const defaultOptions = topicLabels.map((topicLabel) => {
        return({value: topicLabel.id, label: topicLabel.content})
    })
    const options = async(string) => {
        try{
            const topics = await searchLabels(string)
            return (
                topics.map((topicLabel) => {
                return({value: topicLabel.id, label: topicLabel.content})
            }))
        } 
        catch(e){
            return []
        }
    }

    const onSelectChange = (arr) =>{
        dispatch(updateTopicLabels(arr))
    }

    return(
        
            <AsyncCreatableSelect 
                onChange={onSelectChange}
                defaultValue={defaultLabels.length>0 ? defaultLabels: null}
                closeMenuOnSelect={false}
                components={animatedComponents}
                className={"select-input"}
                defaultOptions={defaultOptions}
                isSearchable={true}
                loadOptions={options}
                isMulti={true}
                placeholder={"Topic"}
                noOptionsMessage={({inputValue: string}) => "No Topics Found"}
                allowCreateWhileLoading={true}
            />
        
    )
}
export default ActivityTopicLabels