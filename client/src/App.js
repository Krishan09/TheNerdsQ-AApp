import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import About from "./pages/About";

const App = () => (
	<Routes>
		<Route path="/" element={<Main />} />
		<Route path="/about/this/site" element={<About />} />
	</Routes>
);

export default App;
