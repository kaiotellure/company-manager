import { getAllEmployees } from "@/lib/employees";
import { useState } from "react";

export default function LoginBox() {
	const [employeeIndex, setEmployeeIndex] = useState(0);
	const employee = getAllEmployees()[employeeIndex];

	return (
		<div className="flex justify-center items-center w-full h-screen">
			<div className="p-4 rounded bg-white/5">
				<h1>
					<b>Entrar</b>
				</h1>
				<p>Entre com o seu usuário</p>
				<hr className="my-2 opacity-20" />

				<div className="flex justify-between items-center">
					<span>Entrando como </span>
					<select
						value={employeeIndex}
						onChange={(e) => setEmployeeIndex(Number.parseInt(e.target.value))}
						className="bg-white/5 p-2 rounded"
					>
						{getAllEmployees().map((e, i) => (
							<option
								className="checked:bg-orange-600 dark:bg-zinc-800"
								value={i}
							>
								{e.name}
							</option>
						))}
					</select>
				</div>

				<hr className="my-2 opacity-20" />
				<input
					className="w-full p-2 rounded bg-white/5"
					type="text"
					placeholder={`Insira a senha para ${employee.name}`}
				/>

				<button className="w-full p-2 rounded mt-4">Entrar</button>
			</div>
		</div>
	);
}
