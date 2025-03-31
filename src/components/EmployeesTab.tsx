import { getAllEmployees } from "@/lib/employees";

export default function EmployeesTab() {
	return (
		<section className="flex flex-col p-1 gap-1 rounded">
			<h1>
				<b>Funcionários</b>
			</h1>
			<hr className="my-2 opacity-20" />

			<table className="rounded border-2 border-zinc-600">
				<tr>
					<th className="text-start p-2 bg-zinc-900 text-white/60">Nome</th>
					<th className="text-start bg-zinc-900 text-white/60">Permissão</th>
				</tr>

				{getAllEmployees().map((e, i) => (
					<tr key={e.name} className={i % 2 === 0 ? "bg-white/10" : "bg-white/5"}>
						<td className="p-2">{e.name}</td>
						<td>{e.role}</td>
					</tr>
				))}
			</table>
		</section>
	);
}
