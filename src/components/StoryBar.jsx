import { useCallback, useState } from "react";
import "../styles/storybar.css";
import AddStory from "./AddStory";
import Story from "./Story";
import StoryDetails from "./StoryDetails";
function StoryBar() {
  const [addOverlay, setAddOverlay] = useState(false);
  const [storyIndex, setStoryIndex] = useState(-1);
  const [progress, setProgress] = useState("bar-child-inactive");
  function addStory() {
    setAddOverlay(true);
  }
  const showStory = useCallback((storyInd) => {
    console.log(storyInd);
    setProgress("bar-child-inactive");
    setTimeout(() => {
      setProgress("bar-child-active");
    }, 10);

    // setTimeout(() => {
    //   setProgress("bar-child-active");
    // }, 4000);
    setStoryIndex(storyInd);
  }, []);
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
      {addOverlay && <AddStory setAddOverlay={setAddOverlay} />}
      {storyIndex !== -1 && (
        <StoryDetails
          storyIndex={storyIndex}
          showStory={showStory}
          setProgress={setProgress}
          progress={progress}
        />
      )}
    </div>
  );
}

export default StoryBar;
