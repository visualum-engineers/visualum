import makeAnimated from 'react-select/animated';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { useDispatch, useSelector } from "react-redux";
import { updateTopicLabels } from '../../../../../redux/features/activityCreation/activityCreationData';
import useSearchTopicLabels from '../../../../hooks/use-search-topic-labels';
const animatedComponents = makeAnimated();

const ActivityTopicLabels = ({
    smallWindowWidth, 
}) =>{
    const [topicLabels, searchLabels] = useSearchTopicLabels()
    const activityTopics = useSelector(state => state.activityCreation.data.present.activityTopicLabels)

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
    const customStyles = {

        indicatorsContainer:(provided, state) =>({
            ...provided,
            height: "3.3rem"
        }),
        valueContainer: (provided, state) =>({
            ...provided,
            paddingTop: 0,
            paddingBottom: 0
        }),
        multiValueLabel: (provided, state) =>({
            ...provided,
            fontSize: "0.6rem",
           
        })
    }
    return(
        <div className={`activity-creation-topic-label-input ${smallWindowWidth ? "w-50":"w-100"}`}>
            <label>Topics</label>
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
                placeholder={"Add Topics"}
                noOptionsMessage={({inputValue: string}) => "No Topics Found"}
                allowCreateWhileLoading={true}
                styles = {customStyles}
            />
        </div>
            
        
    )
}
export default ActivityTopicLabels