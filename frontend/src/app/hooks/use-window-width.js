import {useState, useEffect} from 'react'
const useWindowWidth= (width = 575) =>{
    const [windowWidth, setWidth] = useState(window.innerWidth>=width)
    useEffect(() => {
        const resize = () => {
            if(windowWidth && window.innerWidth<width)setWidth((prevWidth)=>!prevWidth)
            else if(!windowWidth && window.innerWidth>=width)setWidth((prevWidth)=>!prevWidth)
        }
        window.addEventListener('resize', resize);

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", resize)
    }, [width, windowWidth]); 
    return windowWidth
}
export default useWindowWidth