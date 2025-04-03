import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
//
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import { newEmployee } from "./lib/employees.ts";

const root = document.getElementById("root");

// Inserting default admin user
newEmployee("ADMINISTRADOR", "ADMINISTRADOR", "admin").then(() => {
	root &&
		createRoot(root).render(
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>,
		);
});
