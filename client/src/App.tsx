import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import FileUpload from "./app/components/FileUpload";

function App() {
  return (
    <div className="myContainer">
      <div className="myCard myBackground">
        <h2 className="p-2">React/Node js file upload example</h2>
        <FileUpload />
      </div>
    </div>
  );
}

export default App;
