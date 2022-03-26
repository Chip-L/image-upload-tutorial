import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Carousel from "./app/components/Carousel";
import SingleUpload from "./app/screens/SingleUpload";

function App() {
  return (
    <div className="myContainer">
      <div className="myCard myBackground">
        <h2 className="p-2">React/Node js file upload example</h2>
        <Carousel>
          <SingleUpload />
        </Carousel>
      </div>
    </div>
  );
}

export default App;
