const transformData = (data, itemBankColumns) =>{
    let newData = {}
    //on mount (initial data loaded)
    newData["keyPairs"] = {}
    newData["itemBank"] = {}
    newData["answerChoices"] = {}
    newData["allItems"] = {}
    newData["categoryIDs"]= {}
    newData.timer = data.timer
    if(!data.itemBank){
        for(let i of data.keyPairs) {
            newData["keyPairs"][i.name] = []
            //generate key-pars sorting both category id, and i name.
            //This assumes both are unique! (which it should be)
            newData.categoryIDs[i.categoryID] = i.name
            newData.categoryIDs[i.name] = i.categoryID
        }
        
        for(let i=0; i<itemBankColumns; i++){
            const elementsPresent = (data.answerChoices.length)%itemBankColumns === 0 ? (data.answerChoices.length)/itemBankColumns : Math.floor((data.answerChoices.length)/itemBankColumns+1)
            const startSlice = i * elementsPresent 
            const endSlice = (i+1) * elementsPresent
            newData.itemBank["answerChoices-" + i] = data.answerChoices.slice(startSlice, endSlice).map((answer) =>{
                return {id: answer.id, content: answer.content}
            })
        }
        //keep a record of all items in word bank. 
        // Needed to create 1 or 2 columns based on screen size
        for(let i of data.answerChoices){
            newData.allItems[i.id] = {id: i.id, content: i.content}
            newData.answerChoices[i.id] = {id: i.id, content: i.content}
        }
    }
    //when data was already transformed on mount 
    else {
        for(let i of Object.keys(data.keyPairs)) {
            newData["keyPairs"][i] = [...data.keyPairs[i]]
        }
            
        for(let i=0; i<itemBankColumns; i++){
            const keys = Object.keys(data.allItems)
            const elementsPresent = (keys.length)%itemBankColumns === 0 ? (keys.length)/itemBankColumns : Math.floor((keys.length)/itemBankColumns+1)
            const startSlice = i * elementsPresent 
            const endSlice = (i+1) * elementsPresent
            newData["itemBank"]["answerChoices-" + i] = keys.slice(startSlice, endSlice).map((answer) =>{
                return data.answerChoices[answer]
            })
        }
        newData["allItems"] = {...data.allItems}
        newData["answerChoices"] = {...data.answerChoices}
        newData["categoryIDs"] = {...data.categoryIDs}
    }
    
    return newData
}
export default transformData