import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Slider.css";
const delay = 2500;

function Slideruse() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);
  const [image, setimage] = useState("");

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  const getsilderimg = async () => {
    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/admin/getslider`,

      config
    );

    console.log("img data from home", data.data.images);

    setimage(data.data.images);
  };

  useEffect(() => {
    getsilderimg();
  }, []);

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
