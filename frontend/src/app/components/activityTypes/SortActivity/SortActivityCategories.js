const SortActivityCategories = ({numCategories, categoryStartSlice, categoryEndSlice}) =>{
    return (numCategories.slice(categoryStartSlice, categoryEndSlice).map((content, index) => {
        const thirdCategory = index+1 % 3 === 0
        return(thirdCategory ? 
            <div key={content}> {content} </div>
            : <div key={content}> {content} </div>
        ) 
    })
    )
}
export default SortActivityCategories