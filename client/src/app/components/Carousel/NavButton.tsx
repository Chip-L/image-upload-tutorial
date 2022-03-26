import "./carousel.css";

interface NavButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  // onClick: Dispatch<SetStateAction<"single" | "multiple">>;
}

function NavButton({ direction, onClick }: NavButtonProps) {
  return (
    <div className="buttonContainer">
      <div className="navButton" onClick={onClick}>
        {direction === "left" ? "<" : ">"}
      </div>
    </div>
  );
}

export default NavButton;
