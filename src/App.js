import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, WebAR, WebAR2, WebAR3 } from "./screens";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/web-ar" exact element={<WebAR />} />
        <Route path="/web-ar2" exact element={<WebAR2 />} />
        <Route path="/web-ar3" exact element={<WebAR3 />} />
      </Routes>
    </Router>
  );
}

export default App;
