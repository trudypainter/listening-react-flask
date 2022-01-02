import "./CoverUp.css";
import ReactPlayer from "react-player";

const CoverUp = (props) => {
  return (
    <div className="coverUp">
      <div className="coverText">
        Uh oh! It looks like you're on your phone 😿
        <br></br>I made this website to be used on a desktop, so check it out
        next time you're on your computer!
        <br></br>
        In the meantime, watch the demo!
        <br></br>
      </div>
      <ReactPlayer
        className="demoPlayer"
        url="https://vimeo.com/661674779"
      ></ReactPlayer>
    </div>
  );
};

export default CoverUp;
