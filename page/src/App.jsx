import { Outlet } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <div className="app-container">
      <Outlet />
    </div>
  );
}

export default App;
