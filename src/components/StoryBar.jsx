import { useCallback, useEffect, useRef, useState } from "react";
import "../styles/storybar.css";
import AddStory from "./AddStory";
import Story from "./Story";
import StoryDetails from "./StoryDetails";
function StoryBar() {
  const [addOverlay, setAddOverlay] = useState(false);
  const [storyIndex, setStoryIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const progTime = useRef();
  function addStory() {
    showStory(-1);
    setAddOverlay(true);
  }
  const showStory = useCallback(
    (storyInd) => {
      // console.log(count, "count");
      setStoryIndex(storyInd);
      if (storyInd === -1) {
        clearInterval(progTime.current);
        setProgress(0);
        return;
      }
      if (progTime.current) {
        clearInterval(progTime.current);
        setProgress(0);
        console.log("here**");
      }

      progTime.current = setInterval(() => {
        setProgress((progress) => {
          return progress + 3.3;
        });
      }, 100);
    },
    [count]
  );

  //good to have clear interval and related logic here instead of callback fn of setstate, here we dont have stale values. there we do
  useEffect(() => {
    const stories = JSON.parse(localStorage.getItem("story")) || [];
    if (progress >= 99) {
      // console.log(count, "count****");
      console.log(progress, storyIndex, stories.length);
      clearInterval(progTime.current);
      if (storyIndex < stories.length - 1) showStory(storyIndex + 1);
      else showStory(-1);
    }
  }, [storyIndex, showStory, progress]);

  const stories = JSON.parse(localStorage.getItem("story")) || [];
  return (
    <div className="story-bar">
      <div className="add-story story" onClick={addStory}>
        +
      </div>
      {stories.map((item, index) => {
        return (
          <Story
            key={item.storyDate.toString()}
            index={index}
            storyIndex={storyIndex}
            showStory={showStory}
          />
        );
      })}
      {addOverlay && (
        <AddStory setAddOverlay={setAddOverlay} showStory={showStory} />
      )}
      {storyIndex !== -1 && (
        <StoryDetails
          storyIndex={storyIndex}
          showStory={showStory}
          setProgress={setProgress}
          progress={progress}
        />
      )}
      {/* <button onClick={() => setCount(count + 1)}>Count is {count}</button> */}
    </div>
  );
}

export default StoryBar;
