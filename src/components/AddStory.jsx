import { useRef } from "react";
import "../styles/addStoryOverlay.css";
import imageToBase64 from "image-to-base64/browser";
function AddStory({ setAddOverlay }) {
  const imgElem = useRef();
  function submitStory(e) {
    e.preventDefault();
    const formEl = e.target;
    const formData = new FormData(formEl);
    // const imgData = formData.get("story-image");
    // let reader = new FileReader();
    // console.log("next");
    // let base64String = "";
    // reader.onload = function () {
    //   base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

    //   // alert(imageBase64Stringsep);
    //   console.log(base64String);
    // };
    // reader.readAsDataURL(imgData);
    // console.log(imgData, "img");

    // const baseStr64 = imageToBase64;
    // imgElem.current.setAttribute("src", "data:image/png;base64," + baseStr64);
    const textStatusVal = formData.get("status");
    const textStatusObj = {
      storyDate: new Date(),
      storyVal: textStatusVal,
    };
    let textStatusArr;
    if (localStorage.getItem("story") === null) {
      textStatusArr = [textStatusObj];
    } else {
      textStatusArr = JSON.parse(localStorage.getItem("story"));
      textStatusArr.push(textStatusObj);
    }
    localStorage.setItem("story", JSON.stringify(textStatusArr));
    setAddOverlay(false);
    console.log(localStorage.getItem("story"));
  }
  return (
    <div className="add-story-overlay">
      <form onSubmit={submitStory}>
        {/* <label className="image-label">
          Upload Story
          <input
            type="file"
            name="story-image"
            id="story-image"
            accept="image/png,image/jpeg"
          />
        </label> */}
        <label>
          Enter status
          <input type="text" name="status" id="status" />
        </label>

        <button>Submit</button>
        {/* <img ref={imgElem} /> */}
      </form>
      <div
        className="close-story"
        onClick={() => {
          setAddOverlay(false);
        }}
      >
        X
      </div>
    </div>
  );
}

export default AddStory;
