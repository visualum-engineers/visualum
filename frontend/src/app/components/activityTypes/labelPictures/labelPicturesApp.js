import { useState, useEffect } from "react"
import test from '../../../../images/eureka_1.jpg'
import {DragDropContext} from "react-beautiful-dnd"
import WordBank from "./wordBank"
import ImageLabels from "./imageLabels.js"

const activityData = {
    imageSource: test,
    teacherLabels:{
        1: {key:1, x:200, y:200, width:10, content:"Hello", height: 5,imgSize:{width:1169.3, height: 826.7}},
        2: {key:2, x:400, y:400, width:10, content:"Hi", height: 5,imgSize:{width:1169.3, height: 826.7}},
        3: {key:3, x:600, y:600, width:10, content:"But", height: 5,imgSize:{width:1169.3, height: 826.7}},
        4: {key:4, x:800, y:800, width:10, content:"Nah", height: 5,imgSize:{width:1169.3, height: 826.7}},
        5: {key:5, x:700, y:500, width:10, content:"hi", height: 5,imgSize:{width:1169.3, height: 826.7}},
        6: {key:6, x:500, y:1000, width:10, content:"oops", height: 5,imgSize:{width:1169.3, height: 826.7}}
    },
    imageLabels:[],
    wordBankLabels:[],
}
//function parameters to connect to activity
//{last, prev, onNavBtnClick, activityData}
//activityData.imageSource
const LabelPicturesApp = () => {
    //generate word bank labels
    const smallLayout = (teacherLabels) =>{
        let totalColumns = [[],[]]
        for(let i in teacherLabels){
            totalColumns[i%2].push(teacherLabels[i])
        }
        return totalColumns
    }
    const largeLayout = (teacherLabels) =>{
        let totalColumns = [[],[],[]]
        for(let i in teacherLabels){
           totalColumns[i%3].push(teacherLabels[i])
        }
        return totalColumns
    }
    activityData.wordBankLabels = window.innerWidth>576 ? largeLayout(activityData.teacherLabels) : smallLayout(activityData.teacherLabels)
    
    //generate image label groups
    let imageLabels = []
    for(let i =0; i<Object.keys(activityData.teacherLabels).length; i++){
        imageLabels.push([])
    }
    activityData.imageLabels = imageLabels
    
    //state
    const [state, setState] = useState(activityData)
    const [imageIsMounted, setMount] = useState({isMounted : false})
    
    //check if component is mounted to generated label indicators
    useEffect(() =>{
        if(!imageIsMounted.isMounted) setMount((s)=>{
            return {
                isMounted: true, 
                indicatorPos: document.querySelector(".imageContainer").getBoundingClientRect()
            }
        })
    }, [imageIsMounted])// Empty array ensures that effect is only run on mount

    //handles resizing events that change
    useEffect(() => {
        const resize = () => {
             //1. indicator postion
            setMount((s)=>{
                return {
                    ...imageIsMounted,
                    indicatorPos: document.querySelector(".imageContainer").getBoundingClientRect()
                }
            })
            
            //2. word bank layout 
                //if user has already moved words out of word bank
                //we dont re-order those again!
            let copy = [...state.wordBankLabels]
            let currWordBank = []
            while(copy.length!== 0){
                currWordBank = [...currWordBank, ...copy.splice(0,1)[0]]
            }
            if(window.innerWidth>576 && state.wordBankLabels.length<=2) setState((state)=>{
                return {...state, wordBankLabels: largeLayout(currWordBank)}
            })
            else if (window.innerWidth<576 && state.wordBankLabels.length>2) setState((state)=>{
                return {...state, wordBankLabels: smallLayout(currWordBank)}
            })
        }
        
        window.addEventListener('resize', resize);

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", resize)
    }, [state.wordBankLabels, imageIsMounted]); 
    
    //handles updating answer selections at the end of a drag
    const onDragEnd= (result) => {
        const {destination, source, draggableId} = result
        //Drop in a non-droppable container
        if(!destination) return null
        //final and starting elements
        const start = source.droppableId
        const final = destination.droppableId
        //conditions: 
        let wordBankCopy = [...state.wordBankLabels]
        let imageLabelCopy = [...state.imageLabels]
        let newAnswerPostion
        let startAnswerPosition
        let finalAnswerPosition
        let newState 
        switch(true){
            //1. drop into the same container, in word bank, at same position
            case destination.index === source.index && destination.droppableId === source.droppableId:
                return null
            //2. dropping into the same container, in a different position
            case start === final:
                newAnswerPostion = wordBankCopy[start[0]]
                newAnswerPostion.splice(source.index, 1);
                newAnswerPostion.splice(destination.index, 0, state.teacherLabels[draggableId]);
                newState = {
                    ...state,
                    wordBankLabels: wordBankCopy,
                }
                setState(newState)
                return 
            //3. dropping between two word bank containers 
            case start!==final && /.wordBankColumn/.test(start) && /.wordBankColumn/.test(final): 
                startAnswerPosition = wordBankCopy[start[0]]
                finalAnswerPosition = wordBankCopy[final[0]]
                startAnswerPosition.splice(source.index, 1);
                finalAnswerPosition.splice(destination.index, 0, state.teacherLabels[draggableId]);
                newState = {
                    ...state,
                    wordBankLabels: wordBankCopy,
                }
                setState(newState)
                return;

            //4.dropping between two label containers
            case start !== final && !(/.wordBankColumn/.test(start) || /.wordBankColumn/.test(final)):
                startAnswerPosition = imageLabelCopy[start[0]]
                finalAnswerPosition = imageLabelCopy[final[0]]
                if(finalAnswerPosition.length>0){
                    startAnswerPosition.splice(source.index, 1, finalAnswerPosition[destination.index ===1? destination.index-1: destination.index]);
                    finalAnswerPosition.splice(destination.index ===1? destination.index-1: destination.index, 1, state.teacherLabels[draggableId]);
                } else {
                    startAnswerPosition.splice(source.index, 1);
                    finalAnswerPosition.splice(destination.index, 0, state.teacherLabels[draggableId])
                }
                
                newState = {
                    ...state,
                    imageLabels: imageLabelCopy,
                }
                setState(newState)
                return 

            //5. dropping between a label container and a word bank
            case start!==final :
                startAnswerPosition = /.wordBankColumn/.test(start) ? wordBankCopy[start[0]] : imageLabelCopy[start[0]]
                finalAnswerPosition = /.wordBankColumn/.test(final) ? wordBankCopy[final[0]] : imageLabelCopy[final[0]]
                
                //handles when:
                //  1.An element is dragged from image label to word bank
                //  2.An element is dragged from word bank to empty image label 
                if( (finalAnswerPosition.length<=0 && /.wordBankColumn/.test(start)) || !/.wordBankColumn/.test(start)){
                    startAnswerPosition.splice(source.index, 1);
                    finalAnswerPosition.splice(destination.index, 0, state.teacherLabels[draggableId]);
                }
                
                //handles when:
                //  1.An element is dragged from word bank to non-empty label
                else{
                    startAnswerPosition.splice(source.index, 1, finalAnswerPosition[destination.index ===1? destination.index-1: destination.index]);
                    finalAnswerPosition.splice(destination.index ===1? destination.index-1: destination.index, 1, state.teacherLabels[draggableId]);
                }
               
                newState = {
                    ...state,
                    imageLabels: imageLabelCopy,
                    wordBankLabels: wordBankCopy,
                }
                setState(newState)
                return
                
            default:
                return;
        }
    }
    
    return(
        <div className="labelPicApp d-flex align-items-center justify-content-center">
            <div className = "d-flex flex-column align-items-center col-9 col-md-7 col-xl-6">
                <p>Label the following image</p>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className = "d-flex align-items-center justify-content-center">
                        <ImageLabels state={state} />
                        <div className="imageContainer">
                            <img src={state.imageSource} alt="hello"/>
                            {imageIsMounted.isMounted ? Object.keys(state.teacherLabels).map((content)=>{
                                const oldX = state.teacherLabels[content].x
                                const oldY = state.teacherLabels[content].y
                                const oldWidth = state.teacherLabels[content].width
                                const oldHeight = state.teacherLabels[content].height
                                //actual image size
                                const imgSizeWidth = state.teacherLabels[content].imgSize.width
                                const imgSizeHeight = state.teacherLabels[content].imgSize.height

                                //current image size
                                const imgX = imageIsMounted["indicatorPos"].x 
                                const imgY = imageIsMounted["indicatorPos"].y + window.scrollY
                                const imgWidth = imageIsMounted["indicatorPos"].width
                                const imgHeight = imageIsMounted["indicatorPos"].height 

                                const style = {
                                    top: `${(imgHeight*oldY/imgSizeWidth)+imgY}px`,
                                    left: `${(imgWidth*oldX/imgSizeHeight)+imgX}px`,
                                    width:`${(oldWidth)}px`,
                                    height: `${(oldHeight)}px`,
                                }
                                return <div 
                                            style={style}   
                                            key ={content}
                                            className="labelIndicators">
                                            {content}
                                        </div>
                            }) : null}
                        </div>
                    </div>
                    <WordBank state={state}/>
                </DragDropContext>
            </div>
        </div>
    )
}
export default LabelPicturesApp