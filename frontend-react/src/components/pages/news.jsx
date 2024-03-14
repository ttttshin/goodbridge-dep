import React from "react";

function News() {
  return (
    <div>
      <div className="flex flex-col items-center p-32 font-style: italic">
        <h1 className="text-black font-bold text-4xl">News</h1>
      </div>

      <div className="box-content flex flex-col items-center rounded-lg ">
        <div className="flex flex-col justify-left items-left h-[65vh] ml-20 mr-20 space-y-5 p-10 bg-offwhite rounded-lg drop-shadow-lg">
          <h1 className="text-black text-2xl">
            {" "}
            💄 54 Beauty Brands that are taking a stand against anti-abortion
            laws:
            <a
              href="https://bit.ly/3m6sRDh"
              target="_blank"
              rel="noreferrer noopener"
            >
              {" "}
              https://bit.ly/3m6sRDh
            </a>
          </h1>
          <br></br>
          <h1 className="text-black text-2xl">
            {" "}
            🎧 CVs & Resumes in the creative industries are changing. Here’s how
            one woman creatively landed her dream job at Spotify:
            <a
              href="https://bit.ly/395iyMT"
              target="_blank"
              rel="noreferrer noopener"
            >
              {" "}
              https://bit.ly/395iyMT
            </a>
          </h1>
          <br></br>
          <h1 className="text-black text-2xl">
            {" "}
            🌼 Ever heard of “summer Fridays”? They’re apparently the key to
            feeling happier at work…
            <a
              href="https://bit.ly/3m93noN"
              target="_blank"
              rel="noreferrer noopener"
            >
              {" "}
              https://bit.ly/3m93noN
            </a>
          </h1>
          <br></br>
          <h1 className="text-black text-2xl">
            {" "}
            🧠 Dr. Raquel Martin Talks Race-Related Stress And Why Burnout Must Be
            Treated As A Systemic Issue:
            <a
              href="https://bit.ly/3900hAL"
              target="_blank"
              rel="noreferrer noopener"
            >
              {" "}
              https://bit.ly/3900hAL
            </a>
          </h1>
          <br></br>
          <h1 className="text-black text-2xl">
            {" "}
            🤔 ‘How is that a real job?’ Parents struggle to keep up with
            children’s career options:
            <a
              href="https://bit.ly/3MlprHG"
              target="_blank"
              rel="noreferrer noopener"
            >
              {" "}
              https://bit.ly/3MlprHG
            </a>
          </h1>
        </div>
        </div>
    </div>
  );
}

export default News;
