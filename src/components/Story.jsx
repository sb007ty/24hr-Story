function Story({ showStory, index, storyIndex }) {
  return (
    <div
      className={
        "user-story story" + (index === storyIndex ? " active-story" : "")
      }
      onClick={() => {
        showStory(index);
      }}
    >
      View Story
    </div>
  );
}

export default Story;
