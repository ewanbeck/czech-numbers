import { Magnitude } from "./App";

export function calculateNumberFromRandomBaseAndMagnitude(
	baseNumber: number,
	magnitude: Magnitude
): number {
	switch (magnitude) {
		case "one":
			return Math.ceil(baseNumber * 10);
		case "ten":
			return Math.ceil(baseNumber * 100);
		case "hundred":
			return Math.ceil(baseNumber * 1000);
	}
}
