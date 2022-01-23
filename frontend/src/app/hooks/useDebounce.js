import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const useDebounceSelector = (time = 250) => {
    const [data, setState] = useState();
    const result = useRef();
    const refTimeout = useRef();

    if (refTimeout.current) {
        clearTimeout(refTimeout.current);
    }

    const selectorData = useSelector(selector);

    useEffect(() => () => refTimeout.current && clearTimeout(refTimeout.current), []);

    if (time === 0) {
        return selectorData;
    }

    refTimeout.current = setTimeout(() => {
        if (result.current !== selectorData) {
            setState(selectorData);
        }
    }, time);

    return data;
};