import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

function ComingSoon() {
  const [text] = useTypewriter({
    words: ["is coming soon"],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div className="flex flex-col items-center p-[500px]">
      <div className="flex flex-row items-center space-x-2">
        <h1 className="text-4xl text-black font-bold">Good Work</h1>
        <h1 className="text-4xl">
          <span className="text-GoodBridge_Orange">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>
      </div>
    </div>
  );
}

export default ComingSoon;
