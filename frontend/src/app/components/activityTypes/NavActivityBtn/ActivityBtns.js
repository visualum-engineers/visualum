import NavActivityBtn from "./NavActivityBtn";

const ActivityBtns = ({onNavBtnClick, lastQuestion, prevQuestion}) => {
    return (
        <div className = {`w-100 d-flex ${!prevQuestion ? "justify-content-end":"justify-content-between"}`}>
                {prevQuestion ? <NavActivityBtn onClick = {onNavBtnClick} prev={prevQuestion}/>: null}
                <NavActivityBtn onClick = {onNavBtnClick} last={lastQuestion}/>
        </div>
    )
}
export default ActivityBtns
