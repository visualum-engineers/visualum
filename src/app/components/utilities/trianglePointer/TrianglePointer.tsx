const TrianglePointer = ({
     dropDownActive,
     textContent, 
     customDropDownID = null,
     customClassName = "",
     pointerDown = null,
}: any) =>{
    return(
        <div 
            aria-hidden={!dropDownActive}
            className={`triangle-pointer-container`
                        + `${dropDownActive ? " triangle-pointer-container-show": ""}`
                        + `${customClassName ? " " + customClassName : ""}`
                    }  
        >
            {pointerDown ? 
                 <>
                    <p id={customDropDownID}>{textContent}</p>
                    <div className="triangle-pointer-down"/>
                    <div className="triangle-pointer-2-down"/>
                 </>
            :
                <>
                    <div className="triangle-pointer"/>
                    <div className="triangle-pointer-2"/>
                    <p id={customDropDownID}>{textContent}</p>
                </>
            }
            
        </div>
    )
}
export default TrianglePointer