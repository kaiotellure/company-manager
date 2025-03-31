import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
//
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";

const root = document.getElementById("root")

root && createRoot(root).render(
	<BrowserRouter>
		<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
		</Routes>
	</BrowserRouter>,
);
