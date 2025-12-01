import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Splash = () => {
  const [showSix, setShowSix] = useState(false);
  const [showSwitch, setShowSwitch] = useState(false);
  const [animateSixRight, setAnimateSixRight] = useState(false);
  const [animateSwitchLeft, setAnimateSwitchLeft] = useState(false);

  const sixRef = useRef(null);
  const switchRef = useRef(null);
  const iconRef = useRef(null);

  // Arrow coordinates for >
  const rectX = 0;
  const rectY = 20;
  const rectWidth = 60;
  const rectHeight = 60;
  const centerX = rectX + rectWidth / 2;
  const centerY = rectY + rectHeight / 2;
  const arrowSize = 22;
  const offsetX = 8;
  const leftX = centerX - arrowSize / 2 + offsetX;
  const topY = centerY - arrowSize / 2;
  const bottomY = centerY + arrowSize / 2;
  const rightX = centerX + arrowSize / 2;
  const arrowPoints = `${leftX},${topY} ${rightX},${centerY} ${leftX},${bottomY}`;

  useEffect(() => {
    const timers = [];

    // Show 6 after 1s
    timers.push(setTimeout(() => setShowSix(true), 1000));

    // Show switch and animate after 2.5s
    timers.push(
      setTimeout(() => {
        setShowSwitch(true);
        setAnimateSixRight(true);
        setAnimateSwitchLeft(true);
      }, 2500)
    );

    // Cleanup after 1s from last animation (duration = 1s)
    timers.push(
      setTimeout(() => {
        timers.forEach((t) => clearTimeout(t));
      }, 3500)
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  // Calculate positions - shift everything to start at 25% of screen width
  const screenOffset = 175; // 25% of 700px viewBox width
  const iconStartX = screenOffset;
  
  const initialSixX = iconRef.current
    ? iconRef.current.getBBox().width+65
    : iconStartX + 70;

  const initialSwitchX =
    iconRef.current && sixRef.current
      ? 60 + iconRef.current.getBBox().width + sixRef.current.getBBox().width + 25
      : iconStartX + 230;
console.log("icon ref",iconRef.current?iconRef.current.getBBox().width:0);
console.log("6 ref",sixRef.current?sixRef.current.getBBox().width:0);
  return (
    <div
      style={{
        background: "black",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <svg viewBox="0 0 700 100" xmlns="http://www.w3.org/2000/svg">
        {/* Icon */}
        <motion.g
          ref={iconRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          transform={`translate(${iconStartX},0)`}
        >
          <rect
            x="0"
            y={rectY}
            width={rectWidth}
            height={rectHeight}
            rx="12"
            ry="12"
            fill="black"
            stroke="white"
            strokeWidth="10"
          />
          <polyline
            points={arrowPoints}
            fill="none"
            stroke="white"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* Number 6 */}
        <AnimatePresence>
          {showSix && (
            <motion.text
              ref={sixRef}
              x={initialSixX}
              y={50}
              fill="white"
              stroke="white"
              fontFamily="'Poppins', sans-serif"
              fontSize="60"
              fontWeight="bold"
              dominantBaseline="central"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                x: animateSixRight ? initialSixX + 210 : initialSixX,
              }}
              transition={{ duration: 1 }}
            >
              6
            </motion.text>
          )}
        </AnimatePresence>

        {/* Switch */}
        <AnimatePresence>
          {showSwitch && (
            <motion.text
              ref={switchRef}
              x={initialSwitchX}
              y={50}
              fill="white"
              stroke="white"
              fontFamily="'Poppins', sans-serif"
              fontSize="60"
              fontWeight="bold"
              dominantBaseline="central"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                x: animateSwitchLeft ? initialSwitchX - 120 : initialSwitchX,
              }}
              transition={{ duration: 1 }}
            >
              Switch
            </motion.text>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};

export default Splash;