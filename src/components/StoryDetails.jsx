import { memo, useEffect, useState } from "react";
import "../styles/storyDetails.css";
import ProgressBar from "./ProgressBar";
const StoryDetails = memo(function StoryDetails({
  showStory,
  storyIndex,
  setProgress,
  progress,
}) {
  const stories = JSON.parse(localStorage.getItem("story")) || [];
  const story = stories[storyIndex];

  console.log(storyIndex, "renderStoryIn");

  useEffect(() => {
    const navigateStory = (e) => {
      //right
      // console.log(e.key);
      const stories = JSON.parse(localStorage.getItem("story")) || [];
      const last = stories.length - 1;
      const first = 0;
      if (e.key === "ArrowRight") {
        console.log(storyIndex, "storyInd");
        if (storyIndex === last) showStory(first);
        else showStory(storyIndex + 1);
        setProgress("bar-child-inactive");
      }
      if (e.key === "ArrowLeft") {
        if (storyIndex === first) showStory(last);
        else showStory(storyIndex - 1);
        setProgress("bar-child-inactive");
      }
    };
    window.addEventListener("keydown", navigateStory);
    return () => {
      window.removeEventListener("keydown", navigateStory);
    };
  }, [storyIndex, showStory]);
  return (
    <div className="story-details">
      <div className="progress-bar">
        <div className={"bar-child " + progress}></div>
      </div>
      <div>{story["storyVal"]}</div>
      <div
        className="close-story"
        onClick={() => {
          showStory(-1);
        }}
      >
        X
      </div>
    </div>
  );
});

export default StoryDetails;
