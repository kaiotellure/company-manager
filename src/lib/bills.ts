export const BILLS = {
	"5c": { value: 0.05 },
	"10c": { value: 0.1 },
	"25c": { value: 0.25 },
	"50c": { value: 0.5 },
	"1R": { value: 1 },
	R$2: { value: 2, image: "2.png" },
	R$5: { value: 5, image: "5.png" },
	R$10: { value: 10, image: "10.png" },
	R$20: { value: 20, image: "20.png" },
	R$50: { value: 50, image: "50.png" },
	R$100: { value: 100, image: "100.png" },
	R$200: { value: 200, image: "200.png" },
} as const;

export type BillKey = keyof typeof BILLS;

export interface DescriptiveBill {
	quantity: number;
	name: string;
	value: number;
}

export function getChangeFor(amount: number, available: DescriptiveBill[]) {
	const change = [];
	let remaining = amount;

	available.sort((a, b) => b.value - a.value);

	for (const bill of available) {
		if (bill.value <= remaining) {
			// How many of this we'll need, up to the maximum available
			const count = Math.min(Math.floor(remaining / bill.value), bill.quantity);

			if (count) {
				change.push({ ...bill, quantity: count });
				remaining -= count * bill.value;
			}
		}
	}

	return { change, remaining };
}
