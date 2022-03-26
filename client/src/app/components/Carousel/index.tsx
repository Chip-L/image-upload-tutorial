import { useEffect, useState } from "react";
import "./carousel.css";
import NavButton from "./NavButton";

interface CarouselProps {
  children: JSX.Element[] | JSX.Element;
}

function Carousel({ children }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!Array.isArray(children)) {
    children = [children];
  }

  useEffect(() => {
    //test
    if (Array.isArray(children)) {
      console.log(children.length);
    } else {
      console.log("not array");
    }
  }, []);

  const activeSlide = children.map((slide, index) => (
    <div
      className={`carouselSlide ${currentSlide === index ? "active" : ""}`}
      key={index}
    >
      {slide}
    </div>
  ));

  return (
    <div style={{ border: ".2em solid red", width: "100%" }}>
      <div className="carouselWrapper">
        <div
          className="carouselSlide"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {activeSlide}
        </div>
      </div>
      {children.length > 1 && (
        <NavButton
          direction="left"
          onClick={() => {
            setCurrentSlide(
              (currentSlide - 1 + activeSlide.length) % activeSlide.length
            );
          }}
        />
      )}
      {children.length > 1 && (
        <NavButton
          direction="right"
          onClick={() => {
            setCurrentSlide((currentSlide + 1) % activeSlide.length);
          }}
        />
      )}
    </div>
  );
}

export default Carousel;
