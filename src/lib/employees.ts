import { hash } from "./hash";

type role = "ADMINISTRADOR" | "VENDEDOR";

export interface Employee {
	role: role;
	name: string;
	hashpass: string;
}

const Employees: Employee[] = [];

export async function newEmployee(name: string, role: role, pw: string) {
	const result = await hash(pw);
	const data = { name, role, hashpass: `${result.salt}:${result.hash}` };

	Employees.push(data);
	return data;
}

export function getAllEmployees() {
	return Employees;
}
