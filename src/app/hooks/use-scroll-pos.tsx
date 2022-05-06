import { useState, useEffect } from "react";
const useScrollPos = (pos=50) => {
    const [windowScrollY, setWindowScrollY] = useState(window.scrollY>pos)
    useEffect(() => {
        const handleScroll = () => {
            if (windowScrollY && window.scrollY<pos) setWindowScrollY((prevWindowScrollY)=>!prevWindowScrollY)
            else if(!windowScrollY && window.scrollY>pos) setWindowScrollY((prevWindowScrollY)=>!prevWindowScrollY)
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pos, windowScrollY]);
    return windowScrollY
}
export default (useScrollPos)