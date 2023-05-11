import React, { ReactElement, useState } from "react";

interface SwipeableRowProps {
  children: ReactElement;
}
export const SwipeableRow = ({ children }: SwipeableRowProps) => {
  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<null | number>(null);
  const [touchX, setTouchX] = useState<number>(0);
  const [touching, setTouching] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(65);
  const [last, setLast] = useState<number>(0);

  const handleStart = (clientX: number) => {
    console.log("clientX: ", clientX);
    setVelocity(0);
    setTouching(true);
    setIntervalId(null);
    setTouchX(clientX);
    setLast(Date.now());

    setLeft(left+25);

    console.log(
      "unused state: ",
      left,
      right,
      velocity,
      intervalId,
      touchX,
      touching,
      height,
      last
    );
    console.log("unused setState: ", setLeft, setRight, setHeight);
  };



  const handleTouchStart = (e: any) => {
    e.preventDefault();
    handleStart(e?.targetTouches[0]?.clientX);
  };

  return (
    <div onTouchStart={handleTouchStart}>
      <div style={{left: `${left}px` }}>{children}</div>
    </div>
  );
};
