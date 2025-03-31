export function giveChange(
	amount: number,
	availableBills: number[],
): Record<number, number> {
	// Sort the bills in descending order
	availableBills.sort((a, b) => b - a);

	const change: Record<number, number> = {};
	let remaining = amount;

	for (const bill of availableBills) {
		if (bill <= remaining) {
			const count = Math.floor(remaining / bill);
			change[bill] = count;
			remaining -= count * bill;
		}
	}

	if (remaining > 0) {
		console.log(
			"It was not possible to give exact change with the available bills.",
		);
	}

	return change;
}
