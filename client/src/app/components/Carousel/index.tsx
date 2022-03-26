import { useEffect, useState } from "react";
import "./carousel.css";
import NavButton from "./NavButton";

interface CarouselProps {
  children: JSX.Element[] | JSX.Element;
  showNumItemsOnSide?: number;
}

/**
 * Displays the children in a carousel. Wrap any items to display between <Carousel> tags
 *
 * @param showNumItemsOnSide will display the number of items on each side of the selected item. Default is 0 and only 1 item will display.
 * @returns Carousel JSX Element
 */
function Carousel(props: CarouselProps) {
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const showNumItemsOnSide = props?.showNumItemsOnSide ?? 0;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemList, setItemList] = useState<JSX.Element[]>([]);

  // helper function to ensure the index wraps around properly and stays within the bounds of the array
  const circleIndex = (value: number): number => {
    if (value < 0) {
      value += children.length;
    } else if (value >= children.length) {
      value -= children.length;
    }

    return value;
  };

  useEffect(() => {
    const listSize = 2 * showNumItemsOnSide + 1;
    const childLength = children.length;

    if (childLength <= listSize) {
      setItemList([...children]);
      return;
    }

    let startNum = circleIndex(currentSlide - showNumItemsOnSide);
    const tempList = [];

    for (let i = 0; i < listSize; i++) {
      let curNum = circleIndex(startNum + i);
      // if (curNum >= childLength) {
      //   curNum -= childLength;
      // }
      tempList.push(children[curNum]);
    }
    setItemList([...tempList]);

    console.log("\n************************************");
    console.log("# of children:", childLength);
    console.log("listSize:", listSize);
    console.log("itemList:", itemList);
    console.log("currentSlide:", currentSlide);
    console.log("showNumItemsOnSide:", showNumItemsOnSide);
    console.log("startNum:", startNum);
    console.log("tempList:", tempList);
    console.log("************************************");
  }, [children, currentSlide]);

  const activeSlide = itemList.map((slide, index) => (
    <div
      className={"carouselSlide" + (currentSlide === index ? " active" : "")}
      // style={{ opacity: currentSlide === index ? 1 : 0 }}
      key={index}
    >
      {slide}
    </div>
  ));

  return (
    <>
      <div className="carouselWrapper">
        {children.length > itemList.length && (
          <NavButton
            direction="left"
            onClick={() => {
              setCurrentSlide(circleIndex(currentSlide - 1));
            }}
          />
        )}

        <div
          className="carouselSlides"
          // style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {activeSlide}
        </div>

        {children.length > itemList.length && (
          <NavButton
            direction="right"
            onClick={() => {
              setCurrentSlide(circleIndex(currentSlide + 1));
            }}
          />
        )}
      </div>
    </>
  );
}

export default Carousel;
