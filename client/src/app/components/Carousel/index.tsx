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

  // useEffect(() => {
  //   //test
  //   if (Array.isArray(children)) {
  //     console.log("length:", children.length);
  //     console.log("currentSlide:", currentSlide);
  //   } else {
  //     console.log("not array");
  //   }
  // }, [currentSlide]);

  const activeSlide = children.map((slide, index) => (
    <div
      className={"carouselSlide" + (currentSlide === index ? " active" : "")}
      style={{ opacity: currentSlide === index ? 1 : 0 }}
      key={index}
    >
      {slide}
    </div>
  ));

  return (
    <>
      <div className="carouselWrapper">
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

        <div
          className="carouselSlides"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {activeSlide}
        </div>

        {children.length > 1 && (
          <NavButton
            direction="right"
            onClick={() => {
              setCurrentSlide((currentSlide + 1) % activeSlide.length);
            }}
          />
        )}
      </div>
    </>
  );
}

export default Carousel;
