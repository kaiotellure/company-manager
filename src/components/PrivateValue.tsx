import { Eye, EyeClosed } from "lucide-react";
import { type PropsWithChildren, useState } from "react";

import { hide } from "../lib/utils";

export default function PrivateValue({ children }: PropsWithChildren) {
	const [show, setShow] = useState(false);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			onClick={() => setShow(!show)}
			className="cursor-pointer flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 rounded-l px-2 py-1"
		>
			<span className="mask text-emerald-500 font-semibold">
				{show ? children : hide(String(children))}
			</span>

			{show ? <EyeClosed size="1em" /> : <Eye size="1em" />}
		</div>
	);
}
