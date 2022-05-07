const ActivityCreationImgInput = () =>{
    return(
        <div 
            className="activity-creation-img-upload"
        >
            <input
                id={"activity-creation-img-upload-btn"}
                //htmlFor = {"activity-creation-img-file-input"}
                onClick={(e:any) => e.currentTarget?.closest("input")?.nextElementSibling?.click()} 
                type={"button"}
            />
            <input 
                id={"activity-creation-img-file-input"}
                type={"file"}
            />
        </div>
    )
}
export default ActivityCreationImgInput