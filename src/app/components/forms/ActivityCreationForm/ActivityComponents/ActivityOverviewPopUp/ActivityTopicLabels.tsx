import makeAnimated from 'react-select/animated';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { useDispatch, useSelector } from "react-redux";
import { updateUnsavedTopicLabels } from '../../../../../../redux/features/activityCreation/activityCreationData';
import useSearchTopicLabels from '../../../../../hooks/use-search-topic-labels';
import { RootState } from '../../../../../../redux/store';
const animatedComponents = makeAnimated();

const ActivityTopicLabels = ({
    smallWindowWidth, 
}: any) =>{
    const [topicLabels, searchLabels] = useSearchTopicLabels()
    const activityTopics = useSelector((state: RootState) => state.activityCreation.data.unsaved.activityTopicLabels)
    const dispatch = useDispatch()

    const defaultOptions = topicLabels.map((topicLabel: any) => {
        return({value: topicLabel.id, label: topicLabel.content})
    })
    const options = async(string: any) => {
        try{
            const topics = await searchLabels(string)
            return (
                topics.map((topicLabel: any) => {
                return({value: topicLabel.id, label: topicLabel.content})
            }))
        } 
        catch(e){
            return []
        }
    }

    const onSelectChange = (arr: any) =>{
        dispatch(updateUnsavedTopicLabels(arr))
    }
    const customStyles = {

        indicatorsContainer:(provided: any, state: any) =>({
            ...provided,
            height: "3.3rem"
        }),
        valueContainer: (provided: any, state: any) =>({
            ...provided,
            paddingTop: 0,
            paddingBottom: 0
        }),
        multiValueLabel: (provided: any, state: any) =>({
            ...provided,
            fontSize: "0.6rem",
           
        })
    }
    return(
        <div className={`activity-creation-topic-label-input ${smallWindowWidth ? "w-50":"w-100"}`}>
            <label>Topics</label>
            <AsyncCreatableSelect 
                onChange={onSelectChange}
                defaultValue={activityTopics ? activityTopics: null}
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