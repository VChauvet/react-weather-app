import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

import { weatherStylings } from '../data/weatherAssociatedList';

function DynamicBackground({ weatherData, children }) {
    const [gradientDeg, setGradientDeg] = useState(0);
    
    useEffect(()=>{
        const updateGradientAngle = () => {
            setGradientDeg(weatherStylings[weatherData?.weather[0]?.icon]?.gradient || 180);
        };
      
        updateGradientAngle();

    },[weatherData]);


    return (
        <motion.div className='relative w-full py-4 mb-4'
        animate={{
            background: `conic-gradient(from ${gradientDeg}deg at 50% 400%, rgba(175,214,249,1) 0%, rgba(92,145,255,1) 7%, rgba(114,213,217,1) 18%, rgba(250,239,163,1) 24%, rgba(76,94,130,1) 36%, rgba(158,166,185,1) 52%, rgba(56,115,145,1) 68%, rgba(103,154,254,1) 89%, rgba(175,214,249,1) 100%)`,
        }}
        transition={{ type: "spring", stiffness: 50 }}
        
        >
            {children}
        </motion.div>
    )
}

export default DynamicBackground;