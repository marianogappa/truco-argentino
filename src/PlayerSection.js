import { useState, useRef, useEffect } from 'react';

export default function PlayerSection({name, points, imgSrc, isTheirTurn}) {
    const className = isTheirTurn ? "playerImg playersTurn" : "playerImg";
    return (
        <div id={name} className="playerSection column">
            <img className={className} src={imgSrc}/>
            <div className="namePointsContainer">
              <span className="playerName">{name}</span>
              <span className='dot'> • </span>
              <Points points={points} />
            </div>
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
      <span className={`points ${isAnimating ? 'pointsAnimation' : ''}`}>
        {currentValue} pts
      </span>
    );
  };