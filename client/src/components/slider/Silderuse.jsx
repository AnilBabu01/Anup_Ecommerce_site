import React from "react";
import "./Slider.css";
const delay = 2500;

function Slideruse({ image }) {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === image.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow" style={{ marginTop: "5rem" }}>
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {image &&
          image.map((img, index) => (
            <div className="slide" key={index}>
              <img className="img-div-slide" src={img.image} />
            </div>
          ))}
      </div>

      <div className="slideshowDots">
        {image &&
          image.map((_, idx) => (
            <div
              key={idx}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
      </div>
    </div>
  );
}

export default Slideruse;
