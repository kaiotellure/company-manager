import { type ButtonProps, cn } from "../lib/utils";

export function RichButton({ className, ...others }: ButtonProps) {
	return (
		<button
			{...others}
			type="button"
			className={cn(
				"bg-zinc-200 border-zinc-100 hover:bg-zinc-100 text-black",
				"border-2 font-semibold text-lg rounded cursor-pointer w-full p-2",
				"flex gap-2 items-center justify-center",
				className,
			)}
		/>
	);
}

export function MutedButton({ className, ...others }: ButtonProps) {
	return (
		<RichButton
			{...others}
			className={cn(
				"bg-zinc-900 border-none hover:bg-zinc-700 text-white",
				className,
			)}
		/>
	);
}