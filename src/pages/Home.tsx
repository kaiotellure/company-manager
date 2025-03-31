import { Archive, Banknote, User } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import useEmployeeStore from "../components/EmployeeStore";
import { cn } from "../lib/utils";

function Cedula({
	children,
	color,
	...others
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...others}
			style={{ borderColor: color, color }}
			className="flex flex-col justify-center items-end p-4 w-28 rounded-md font-bold text-xl border-2"
		>
			{children}
		</div>
	);
}

function Coin({
	children,
	color,
	size,
	...others
}: React.HTMLAttributes<HTMLDivElement> & { size: string }) {
	return (
		<div
			{...others}
			style={{ background: color, height: size }}
			className="flex flex-col justify-center items-center p-1 aspect-square rounded-full font-bold text-xl"
		>
			{children}
		</div>
	);
}

const max = Math.max;

function ChangeSection() {
	const [mode, setMode] = useState(true);

	const [one, setOne] = useState(0);
	const [tenCents, setTenCents] = useState(0);
	const [ten, setTen] = useState(0);
	const [oneHundred, setOneHundred] = useState(0);

	const [twentyFiveCents, setTwentyFiveCents] = useState(0);
	const [two, setTwo] = useState(0);
	const [twenty, setTwenty] = useState(0);
	const [twoHundred, setTwoHundred] = useState(0);

	const [fiveCents, setFiveCents] = useState(0);
	const [fiftyCents, setFiftyCents] = useState(0);
	const [five, setFive] = useState(0);
	const [fifty, setFifty] = useState(0);

	function onKey(e: KeyboardEvent) {
		const dir = mode ? 1 : -1;
		console.log(mode, dir, e.key, e.code, e.altKey, e.ctrlKey, e.shiftKey);

		switch (e.code) {
			case "Space":
				setMode(!mode);
				break;

			case "Digit1":
				if (e.altKey) return setOne((c) => max(0, c + dir));
				if (e.shiftKey) return setOneHundred((c) => max(0, c + dir));
				setTen((c) => max(0, c + dir));
				break;

			case "Digit2":
				if (e.altKey) return setTwo((c) => max(0, c + dir));
				if (e.shiftKey) return setTwoHundred((c) => max(0, c + dir));
				setTwenty((c) => max(0, c + dir));
				break;

			case "Digit5":
				if (e.altKey) return setFifty((c) => max(0, c + dir));
				if (e.shiftKey) return;
				setFive((c) => max(0, c + dir));
				break;

			case "KeyD":
				setTenCents((c) => max(0, c + dir));
				break;

			case "KeyC":
				if (e.altKey) return setFiveCents((c) => max(0, c + dir));
				setFiftyCents((c) => max(0, c + dir));
				break;

			case "KeyV":
				setTwentyFiveCents((c) => max(0, c + dir));
				break;

			default:
				break;
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		document.addEventListener("keyup", onKey);
		return () => document.removeEventListener("keyup", onKey);
	}, [mode]);

	const sum = [
		one * 1,
		tenCents * 0.1,
		ten * 10,
		oneHundred * 100,
		twentyFiveCents * 0.25,
		two * 2,
		twenty * 20,
		twoHundred * 200,
		fiveCents * 0.05,
		five * 5,
		fifty * 50,
		fiftyCents * 0.5,
	].reduce((a, b) => a + b, 0);

	return (
		<section className="flex flex-col h-screen p-4 gap-2 rounded">
			<div className="flex gap-2">
				<div title="Soma total das cédulas e moedas em caixa">
					SOMA:{" "}
					<span className="text-emerald-500 font-semibold">
						R${sum.toFixed(2)}
					</span>
				</div>
				<div title="Aperte espaço para alternar entre ENTRANDO e SAINDO">
					MODO:{" "}
					<span
						className={cn(
							"font-semibold",
							mode ? "text-emerald-500" : "text-red-500",
						)}
					>
						{mode ? "ENTRANDO" : "SAINDO"}
					</span>
				</div>
			</div>

			<span className="mt-4 text-xs opacity-40 font-medium">CÉDULAS</span>
			<div className="flex gap-2">
				{/* Cedula de dois reais */}
				<div className="flex flex-col items-center">
					<Cedula color="#2c7fb8">R$2</Cedula>
					<span className="mt-2 font-bold text-lg">{two}</span>
					<div className="rounded bg-white/20 px-2 py-1 text-xs font-normal">
						Alt + 2
					</div>
				</div>

				{/* Cedula de cinco reais */}
				<div className="flex flex-col items-center">
					<Cedula color="#A487B8">R$5</Cedula>
					<span className="mt-2 font-bold text-lg">{five}</span>
					<div className="rounded bg-white/20 px-2 py-1 text-xs font-normal">
						5
					</div>
				</div>

				{/* Cedula de dez reais */}
				<div className="flex flex-col items-center">
					<Cedula color="#C1443D">R$10</Cedula>
					<span className="mt-2 font-bold text-lg">{ten}</span>
					<div className="rounded bg-white/20 px-2 py-1 text-xs font-normal">
						1
					</div>
				</div>

				{/* Cedula de vinte reais */}
				<div className="flex flex-col items-center">
					<Cedula color="#E6B23A">R$20</Cedula>
					<span className="mt-2 font-bold text-lg">{twenty}</span>
					<div className="rounded bg-white/20 px-2 py-1 text-xs font-normal">
						2
					</div>
				</div>

				{/* Cedula de cinquenta reais */}
				<div className="flex flex-col items-center">
					<Cedula color="#DC9C58">R$50</Cedula>
					<span className="mt-2 font-bold text-lg">{fifty}</span>
					<div className="rounded bg-white/20 px-2 py-1 text-xs font-normal">
						Alt + 5
					</div>
				</div>

				{/* Cedula de cem reais */}
				<div className="flex flex-col items-center">
					<Cedula color="#1D5C8F">R$100</Cedula>
					<span className="mt-2 font-bold text-lg">{oneHundred}</span>
					<div className="rounded bg-white/20 px-2 py-1 text-xs font-normal">
						Shift + 1
					</div>
				</div>

				{/* Cedula de duzentos reais */}
				<div className="flex flex-col items-center">
					<Cedula color="#A9A9A9">R$200</Cedula>
					<span className="mt-2 font-bold text-lg">{twoHundred}</span>
					<div className="rounded bg-white/20 px-2 py-1 text-xs font-normal">
						Shift + 2
					</div>
				</div>
			</div>

			<span className="mt-4 text-xs opacity-40 font-medium">MOEDAS</span>
			<div className="flex items-center gap-2">
				{/* Moeda de cinco centavos */}
				<div className="flex flex-col items-center">
					<Coin color="#B87333" size="90px">
						5c
					</Coin>
					<span className="mt-2 font-bold text-lg">{fiveCents}</span>
					<div className="w-fit rounded bg-white/10 px-2 py-1 text-xs font-normal">
						Alt + C
					</div>
				</div>

				{/* Moeda de dez centavos */}
				<div className="flex flex-col items-center">
					<Coin color="#D4AF37" size="80px">
						10c
					</Coin>
					<span className="mt-2 font-bold text-lg">{tenCents}</span>
					<div className="w-fit rounded bg-white/10 px-2 py-1 text-xs font-normal">
						D
					</div>
				</div>

				{/* Moeda de vinte e cinco centavos */}
				<div className="flex flex-col items-center">
					<Coin color="#D4AF37" size="100px">
						25c
					</Coin>
					<span className="mt-2 font-bold text-lg">{twentyFiveCents}</span>
					<div className="w-fit rounded bg-white/10 px-2 py-1 text-xs font-normal">
						V
					</div>
				</div>

				{/* Moeda de cinquenta centavos */}
				<div className="flex flex-col items-center">
					<Coin color="#C0C0C0" size="95px">
						<span className="text-zinc-800">50c</span>
					</Coin>
					<span className="mt-2 font-bold text-lg">{fiftyCents}</span>
					<div className="w-fit rounded bg-white/10 px-2 py-1 text-xs font-normal">
						C
					</div>
				</div>

				{/* Moeda de um real */}
				<div className="flex flex-col items-center">
					<Coin color="#D4AF37" size="100px">
						<Coin color="#C0C0C0" size="70px">
							<span className="text-zinc-800">1R</span>
						</Coin>
					</Coin>
					<span className="mt-2 font-bold text-lg">{one}</span>
					<div className="w-fit rounded bg-white/10 px-2 py-1 text-xs font-normal">
						Alt + 1
					</div>
				</div>
			</div>
		</section>
	);
}

export default function Home() {
	const go = useNavigate();
	const employee = useEmployeeStore((s) => s.employee);

	const [currentTab, setCurrentTab] = useState(0);

	if (!employee) {
		go("/login");
		return;
	}

	const tabs = [
		/* employee.role === "ADMINISTRADOR" && {
			Name: "employees",
			View: ChangeSection,
			Appearence: [
				<User key="employees-icon" strokeWidth={2} size="1em" />,
				<span key="employees-name" className="leading-[.9em]">
					Funcionários
				</span>,
			],
		},
		{
			Name: "storage",
			View: ChangeSection,
			Appearence: [
				<Archive key="storage-icon" strokeWidth={1.8} size="1em" />,
				<span key="storage-name" className="leading-[.9em]">
					Estoque
				</span>,
			],
		}, */
		{
			Name: "change",
			View: ChangeSection,
			Appearence: [
				<Banknote key="change-icon" size="1em" strokeWidth={2} />,
				<span key="change-name" className="leading-[.8em]">
					CAIXA
				</span>,
			],
		},
	].filter((t) => !!t);

	const tab = tabs[currentTab];

	return (
		<div className="flex gap-4">
			<section className="flex flex-col h-screen p-1 gap-1 rounded bg-white/5">
				{tabs.map((tab, i) => (
					<button
						type="button"
						key={tab.Name}
						className={cn(
							"flex gap-2 p-2 font-medium hover:bg-white/5 cursor-pointer",
							currentTab === i && "bg-white/5",
						)}
						onClick={() => setCurrentTab(i)}
					>
						{currentTab === i && (
							<div className="w-1 h-full rounded-full bg-violet-400" />
						)}
						{tab.Appearence}
					</button>
				))}

				{/* Empty space */}
				<div className="my-auto" />

				<div className="flex flex-col">
					<span className="text-xs opacity-40">Olá!</span>
					{employee.name}
				</div>
			</section>

			<tab.View />
		</div>
	);
}
