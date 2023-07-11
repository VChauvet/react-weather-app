import { useEffect, useRef } from "react";

function OutSideClickHandler ({ handler, children }) {
    const ref = useRef(null);

    useEffect(
        () => {
            function clickOutside(e) {
                if (ref.current && !ref.current.contains(e.target)) {
                    handler();
                }
            }
            document.addEventListener("mousedown", clickOutside);
            return () => {document.removeEventListener("mousedown", clickOutside);}
        },
    []);

    return (
        <div ref={ref}>
            {children}
        </div>
    )
}

export default OutSideClickHandler;
