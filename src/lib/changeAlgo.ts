export function giveChange(
	amount: number,
	availableBills: number[],
): {change: Record<number, number>; remaining: number} {
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

	return {change, remaining};
}
