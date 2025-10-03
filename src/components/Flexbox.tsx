import React, { JSX } from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  row?: boolean;
  col?: boolean;
  reverse?: boolean;
  wrap?: boolean | null;
  wrapReverse?: boolean;
  justify?: "normal" | "start" | "center" | "end" | "between" | "around" | "evenly";
}

export default function Flexbox({
  children,
  className = "",
  row,
  col,
  reverse = false,
  wrap = null,
  wrapReverse = false,
  justify = "normal",
}: Props): JSX.Element {
  // flex flex-row flex-row-reverse flex-col flex-col-reverse
  // flex-wrap flex-nowrap flex-wrap-reverse flex-nowrap-reverse
  // justify-normal justify-start justify-center justify-end justify-between justify-around justify-evenly

  const isRow = row ?? (!col && true);
  const isCol = col ?? false;

  return (
    <div
      className={`flex 
        ${isCol ? `flex-col${reverse ? "-reverse" : ""}` : ""} 
        ${isRow ? `flex-row${reverse ? "-reverse" : ""}` : ""} 
        ${wrap !== null && wrap ? `flex-wrap${wrapReverse ? "-reverse" : ""}` : `flex-nowrap${wrapReverse ? "-reverse" : ""}`} 
        justify-${justify}
        ${className}`}
    >
      {children}
    </div>
  );
}
