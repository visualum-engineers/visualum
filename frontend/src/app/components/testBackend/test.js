import React, {useState, useEffect} from "react";

const TestBackend = () =>{
    const [messages, setMessage] = useState("")
    useEffect(()=>{
        fetch("/test/").then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setMessage(jsonRes.message))
    })
    return (
        <div>
            <h1>{messages}</h1>
        </div>
    )
}
export default TestBackend