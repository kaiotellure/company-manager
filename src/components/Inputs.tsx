import { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export function RichInput({ className, ...others }: InputProps) {
	return (
		<input
			{...others}
			className={cn("mt-2 px-4 py-2 w-full rounded bg-zinc-900", className)}
		/>
	);
}

export function AutoFocusInput({ ...others }: InputProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, []);

	return <RichInput {...others} autoFocus ref={inputRef} />;
}
