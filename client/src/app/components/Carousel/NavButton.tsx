import "./carousel.css";

interface NavButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  // onClick: Dispatch<SetStateAction<"single" | "multiple">>;
}

function NavButton({ direction, onClick }: NavButtonProps) {
  return (
    <div className="navButton" onClick={onClick}>
      {direction === "left" ? "<" : ">"}
    </div>
  );
}

export default NavButton;
