import NavActivityBtn from "./NavActivityBtn";

const ActivityBtns = ({onClick, lastQuestion, prevQuestion}) => {
    return (
        <div className = {`w-100 d-flex ${!prevQuestion ? "justify-content-end":"justify-content-between"}`}>
                {prevQuestion ? <NavActivityBtn onClick = {onClick} prev={prevQuestion}/>: null}
                <NavActivityBtn onClick = {onClick} last={lastQuestion}/>
        </div>
    )
}
export default ActivityBtns