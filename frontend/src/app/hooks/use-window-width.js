import {useState, useEffect} from 'react'
import debounce from 'lodash/debounce';
const useWindowWidth= (width = 575) =>{
    const [windowWidth, setWidth] = useState(window.innerWidth>=width)
    useEffect(() => {
        const resize = () => {
            if(windowWidth && window.innerWidth<width)setWidth((prevWidth)=>!prevWidth)
            else if(!windowWidth && window.innerWidth>=width)setWidth((prevWidth)=>!prevWidth)
        }
        const debouncedHandleResize = debounce(resize, 150);

        window.addEventListener('resize', debouncedHandleResize);

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", debouncedHandleResize)
    }, [width, windowWidth]); 
    return windowWidth
}
export default useWindowWidth