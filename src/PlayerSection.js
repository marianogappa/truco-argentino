import { useState, useRef, useEffect } from 'react';

export default function PlayerSection({name, points, imgSrc, isTheirTurn}) {
    const className = isTheirTurn ? "playerImg playersTurn" : "playerImg";
    return (
        <div id={name} className="playerSection righthandColumn">
            <img className={className} src={imgSrc}/>
            <div className="playerName">{name}</div>
            <Points points={points} />
        </div>
    )
}

const Points = ({ points }) => {
    const [currentValue, setCurrentValue] = useState(points);
    const [isAnimating, setIsAnimating] = useState(false);
    const prevValueRef = useRef(points);
  
    useEffect(() => {
    console.log('points', points, prevValueRef);
      if (prevValueRef.current !== points) {
        setIsAnimating(true);
        setCurrentValue(points);
        prevValueRef.current = points;
        
        const timer = setTimeout(() => {
          setIsAnimating(false);
        }, 300); // Duration of the animation in ms
  
        return () => clearTimeout(timer);
      }
    }, [points]);
  
    return (
      <div className={`points ${isAnimating ? 'pointsAnimation' : ''}`}>
        {currentValue} pts
      </div>
    );
  };