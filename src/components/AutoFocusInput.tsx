import { useEffect, useRef } from "react";
import type { InputProps } from "../lib/utils";

export default function AutoFocusInput({ ...others }: InputProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, []);

	// biome-ignore lint/a11y/noAutofocus: <explanation>
	return <input {...others} autoFocus ref={inputRef} />;
}
