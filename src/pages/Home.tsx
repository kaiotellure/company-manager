import { Banknote } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import useEmployeeStore from "../components/EmployeeStore";
import { cn } from "../lib/utils";
import {
	type BillKey,
	BILLS,
	type DescriptiveBill,
	getChangeFor,
} from "../lib/bills";

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

function CalculateChangePopup({ bills }: { bills: DescriptiveBill[] }) {
	const [amount, setAmount] = useState(0);
	const { change, remaining } = getChangeFor(amount, bills);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents:
		<div
			onClick={(e) => e.stopPropagation()}
			className="max-w-2/3 bg-zinc-800 p-4 rounded"
		>
			<h2 className="font-medium">Calcular Troco</h2>
			<p className="text-sm opacity-80">
				Insira o valor que deseja formar e mostraremos como montar este valor
				com as cédulas e moedas disponíveis.
			</p>

			<input
				type="number"
				value={amount}
				onChange={(e) => setAmount(Number.parseInt(e.target.value))}
				className="mt-2 px-4 py-2 w-full rounded bg-zinc-900"
				placeholder="Valor a ser montado"
			/>

			{amount !== 0 && (
				<div>
					<h2 className="mt-2 text-sm font-medium opacity-40">A ENTREGAR</h2>

					{change.map(({ name, value, quantity }) => {
						return (
							<p key={name}>
								{quantity} {value > 1 ? "cédula(s)" : "moeda(s)"} <span className="opacity-60">de</span> <b>{name}</b>
							</p>
						);
					})}

					{remaining !== 0 && (
						<p className="text-red-500 font-medium text-sm">
							ATENÇÃO: Ainda restam R${remaining}
						</p>
					)}
				</div>
			)}
		</div>
	);
}

function ChangeSection() {
	const [mode, setMode] = useState(true);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const [storage, setStorage] = useState<Record<string, number>>({});

	function update(name: BillKey, offset: number) {
		setStorage((s) => ({ ...s, [name]: Math.max(0, (s[name] || 0) + offset) }));
	}

	function onKey(e: KeyboardEvent) {
		if (isPopupOpen) return;

		const dir = mode ? 1 : -1;
		console.log(mode, dir, e.key, e.code, e.altKey, e.ctrlKey, e.shiftKey);

		switch (e.code) {
			case "Space":
				setMode(!mode);
				break;

			case "Digit1":
				if (e.altKey) return update("1R", dir);
				if (e.shiftKey) return update("R$100", dir);
				update("R$10", dir);
				break;

			case "Digit2":
				if (e.altKey) return update("R$2", dir);
				if (e.shiftKey) return update("R$200", dir);
				update("R$20", dir);
				break;

			case "Digit5":
				if (e.altKey) return update("R$50", dir);
				update("R$5", dir);
				break;

			case "KeyD":
				update("10c", dir);
				break;

			case "KeyC":
				if (e.altKey) return update("5c", dir);
				update("50c", dir);
				break;

			case "KeyV":
				update("25c", dir);
				break;

			default:
				break;
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		document.addEventListener("keyup", onKey);
		return () => document.removeEventListener("keyup", onKey);
	}, [mode, isPopupOpen]);

	const available = Object.entries(BILLS).map(([name, kind]) => ({
		name,
		value: kind.value,
		quantity: storage[name] || 0,
	}));

	const sum = available.reduce((a, b) => a + b.value * b.quantity, 0);

	return (
		<section className="relative flex flex-col h-screen p-4 gap-2 rounded">
			{isPopupOpen && (
				// biome-ignore lint/a11y/useKeyWithClickEvents:
				<div
					onClick={() => setIsPopupOpen(false)}
					className="z-10 absolute flex justify-center items-center top-0 left-0 w-full h-full bg-black/75 backdrop-blur-md"
				>
					<CalculateChangePopup bills={available} />
				</div>
			)}

			<div className="flex items-center gap-2">
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

				<button
					onClick={(e) => setIsPopupOpen(true)}
					className="bg-white/10 hover:bg-white/20 rounded px-2 py-1 cursor-pointer"
					type="button"
					title="Aperte espaço para alternar entre ENTRANDO e SAINDO"
				>
					Calcular Troco
				</button>
			</div>

			<span className="mt-4 text-xs opacity-40 font-medium">CÉDULAS</span>
			<div className="flex gap-2">
				{/* Cedula de dois reais */}
				<div className="flex flex-col items-center">
					<Cedula color="#2c7fb8">R$2</Cedula>
					<span className="mt-2 font-bold text-lg">{storage.R$2}</span>
					<div className="rounded bg-white/20 px-2 py-1 text-xs font-normal">
						Alt + 2
					</div>
				</div>

				{/* Cedula de cinco reais */}
				<div className="flex flex-col items-center">
					<Cedula color="#A487B8">R$5</Cedula>
					<span className="mt-2 font-bold text-lg">{storage.R$5}</span>
					<div className="rounded bg-white/20 px-2 py-1 text-xs font-normal">
						5
					</div>
				</div>

				{/* Cedula de dez reais */}
				<div className="flex flex-col items-center">
					<Cedula color="#C1443D">R$10</Cedula>
					<span className="mt-2 font-bold text-lg">{storage.R$10}</span>
					<div className="rounded bg-white/20 px-2 py-1 text-xs font-normal">
						1
					</div>
				</div>

				{/* Cedula de vinte reais */}
				<div className="flex flex-col items-center">
					<Cedula color="#E6B23A">R$20</Cedula>
					<span className="mt-2 font-bold text-lg">{storage.R$20}</span>
					<div className="rounded bg-white/20 px-2 py-1 text-xs font-normal">
						2
					</div>
				</div>

				{/* Cedula de cinquenta reais */}
				<div className="flex flex-col items-center">
					<Cedula color="#DC9C58">R$50</Cedula>
					<span className="mt-2 font-bold text-lg">{storage.R$50}</span>
					<div className="rounded bg-white/20 px-2 py-1 text-xs font-normal">
						Alt + 5
					</div>
				</div>

				{/* Cedula de cem reais */}
				<div className="flex flex-col items-center">
					<Cedula color="#1D5C8F">R$100</Cedula>
					<span className="mt-2 font-bold text-lg">{storage.R$100}</span>
					<div className="rounded bg-white/20 px-2 py-1 text-xs font-normal">
						Shift + 1
					</div>
				</div>

				{/* Cedula de duzentos reais */}
				<div className="flex flex-col items-center">
					<Cedula color="#A9A9A9">R$200</Cedula>
					<span className="mt-2 font-bold text-lg">{storage.R$200}</span>
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
					<span className="mt-2 font-bold text-lg">{storage["5cent"]}</span>
					<div className="w-fit rounded bg-white/10 px-2 py-1 text-xs font-normal">
						Alt + C
					</div>
				</div>

				{/* Moeda de dez centavos */}
				<div className="flex flex-col items-center">
					<Coin color="#D4AF37" size="80px">
						10c
					</Coin>
					<span className="mt-2 font-bold text-lg">{storage["10cent"]}</span>
					<div className="w-fit rounded bg-white/10 px-2 py-1 text-xs font-normal">
						D
					</div>
				</div>

				{/* Moeda de vinte e cinco centavos */}
				<div className="flex flex-col items-center">
					<Coin color="#D4AF37" size="100px">
						25c
					</Coin>
					<span className="mt-2 font-bold text-lg">{storage["25cent"]}</span>
					<div className="w-fit rounded bg-white/10 px-2 py-1 text-xs font-normal">
						V
					</div>
				</div>

				{/* Moeda de cinquenta centavos */}
				<div className="flex flex-col items-center">
					<Coin color="#C0C0C0" size="95px">
						<span className="text-zinc-800">50c</span>
					</Coin>
					<span className="mt-2 font-bold text-lg">{storage["50cent"]}</span>
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
					<span className="mt-2 font-bold text-lg">{storage["1R"]}</span>
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

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		if (!employee) {
			go("/login");
			return;
		}
	}, []);

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
					{employee?.name}
				</div>
			</section>

			<tab.View />
		</div>
	);
}
