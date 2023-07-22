import { Fragment, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";

type Magnitude = "one" | "ten" | "hundred";

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

	useEffect(() => {
		refreshBaseNum();
	}, []);

	function setMagHandler(magnitude: Magnitude) {
		setMag(magnitude);
		refreshBaseNum();
	}

	function refreshBaseNum() {
		setBaseNum(Math.random());
	}

	function numberToDisplay() {
		switch (mag) {
			case "one":
				return Math.ceil(baseNum * 10);
			case "ten":
				return Math.ceil(baseNum * 100);
			case "hundred":
				return Math.ceil(baseNum * 1000);
		}
	}

	return (
		<div className="grid place-content-center">
			<RadioGroup value={mag} onChange={setMagHandler}>
				<RadioGroup.Label className="text-lg font-medium mb-1 block">
					Select a number range
				</RadioGroup.Label>
				<div className="grid grid-cols-3 mb-3">
					{magnitudeOptions.map((magnitude, index, array) => (
						<RadioGroup.Option key={magnitude.id} value={magnitude.mag} as={Fragment}>
							{({ checked }) => (
								<div
									className={classNames(
										{
											"border-l-2 rounded-l-lg": index === 0,
											"rounded-r-lg": index === array.length - 1
										},
										"text-center font-bold px-3 py-2 border-slate-100 border-solid border-2 border-l-0 transition-colors cursor-pointer hover:bg-slate-600",
										checked ? "bg-slate-400" : "bg-slate-700"
									)}
								>
									<p className={"cursor-pointer"}>{magnitude.label}</p>
								</div>
							)}
						</RadioGroup.Option>
					))}
				</div>
			</RadioGroup>
			<h2
				className="text-5xl font-bold text-center cursor-pointer px-3 py-1 hover:bg-slate-800 rounded-lg transition-colors"
				onClick={refreshBaseNum}
			>
				{numberToDisplay()}
			</h2>
		</div>
	);
}
