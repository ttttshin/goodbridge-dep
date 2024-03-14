import React from "react";

// eslint-disable-next-line
export default function CustomButton({ text, action }) {
  return (
    <button
      onClick={action}
      className="bg-DarkGreen hover:bg-GoodBridge_Orange text-white font-style: italic py-2 px-4 rounded"
    >
      {text}
    </button>
  );
}
