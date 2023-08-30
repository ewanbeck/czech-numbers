import { Fragment, useEffect, useState } from "react";
import ButtonHint from "./components/ButtonHint";
import { RadioGroup } from "@headlessui/react";
import { calculateNumberFromRandomBaseAndMagnitude } from "./utils";
import classNames from "classnames";

export type Magnitude = "one" | "ten" | "hundred";

const magnitudeOptions = [
	{
		id: 1,
		label: "1 - 10",
		mag: "one"
	},
	{
		id: 2,
		label: "1 - 99",
		mag: "ten"
	},
	{
		id: 3,
		label: "1 - 1000",
		mag: "hundred"
	}
];

export default function App() {
	const [mag, setMag] = useState<Magnitude>("one");
	const [baseNum, setBaseNum] = useState(0);
	const [numberClicks, setNumberClicks] = useState<number>(0);

	useEffect(() => {
		refreshBaseNum();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function setMagHandler(magnitude: Magnitude) {
		setMag(magnitude);
		refreshBaseNum();
	}

	function refreshBaseNum() {
		const currentNumber = numberToDisplay();
		let newBaseNumber = Math.random();
		while (
			currentNumber ===
			calculateNumberFromRandomBaseAndMagnitude(newBaseNumber, mag)
		) {
			newBaseNumber = Math.random();
		}
		setBaseNum(newBaseNumber);
	}

	const numberToDisplay = () =>
		calculateNumberFromRandomBaseAndMagnitude(baseNum, mag);

	return (
		<div className="grid place-content-center">
			<RadioGroup value={mag} onChange={setMagHandler}>
				<RadioGroup.Label className="mb-1 block text-lg font-medium">
					Select a number range
				</RadioGroup.Label>
				<div className="mb-4 grid grid-cols-3">
					{magnitudeOptions.map((magnitude, index, array) => (
						<RadioGroup.Option key={magnitude.id} value={magnitude.mag} as={Fragment}>
							{({ checked }) => (
								<div
									className={classNames(
										{
											"rounded-l-lg border-l-2": index === 0,
											"rounded-r-lg": index === array.length - 1
										},
										"cursor-pointer select-none border-2 border-l-0 border-solid border-slate-100 px-3 py-2 text-center font-bold transition-colors ",
										checked
											? "bg-slate-400 hover:bg-slate-400"
											: "bg-slate-700 hover:bg-slate-600"
									)}
								>
									<p className={"cursor-pointer"}>{magnitude.label}</p>
								</div>
							)}
						</RadioGroup.Option>
					))}
				</div>
			</RadioGroup>
			<button
				className="mx-auto w-4/5 cursor-pointer select-none rounded-lg px-3 py-1 text-center text-5xl font-bold transition-colors hover:bg-slate-800 active:bg-slate-700"
				onClick={() => {
					refreshBaseNum();
					setNumberClicks(numberClicks + 1);
				}}
			>
				{numberToDisplay()}
			</button>
			<ButtonHint numberClicks={numberClicks} />
		</div>
	);
}
