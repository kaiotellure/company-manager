export { twMerge as cn } from "tailwind-merge";

export type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;


export function money(value: number) {
	return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function hide(target: string) {
	return target
		.split("")
		.map(() => "•")
		.join("");
}
