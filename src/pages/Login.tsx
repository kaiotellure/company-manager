import { verify } from "../lib/hash";
import { getAllEmployees } from "../lib/employees";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useEmployeeStore from "../components/EmployeeStore";
import { RichButton } from "../components/Buttons";

const WRONG_PASS = "A senha inserida para este usuário está incorreta";

export default function Login() {
	const go = useNavigate();
	const set = useEmployeeStore((s) => s.set);

	const [employeeIndex, setEmployeeIndex] = useState(0);
	const employee = getAllEmployees()[employeeIndex];

	const [passwordValue, setPasswordValue] = useState("");
	const [error, setError] = useState("");

	function isCorrect() {
		const [salt, hash] = employee.hashpass.split(":");
		return verify(passwordValue, salt, hash);
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: ????
	useEffect(() => {
		isCorrect().then((valid) => {
			if (!valid) return;

			set(employee);
			go("/");
		});
	}, [passwordValue]);

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
								value={i}
								key={e.name}
								className="checked:bg-orange-600 dark:bg-zinc-800"
							>
								{e.name}
							</option>
						))}
					</select>
				</div>

				<hr className="my-2 opacity-20" />
				<input
					type="text"
					value={passwordValue}
					onChange={(e) => setPasswordValue(e.target.value)}
					className="w-full p-2 rounded bg-white/5"
					placeholder={`Insira a senha para ${employee.name}`}
				/>

				<RichButton
					className="mt-4"
					onClick={() =>
						isCorrect().then((valid) => {
							if (!valid) return setError(WRONG_PASS);

							set(employee);
							go("/");
						})
					}
				>
					Entrar
				</RichButton>

				{error && <p className="mt-2 text-red-400 text-center">{error}</p>}
			</div>
		</div>
	);
}


