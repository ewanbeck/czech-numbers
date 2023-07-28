import { Transition } from "@headlessui/react";

type Props = {
    numberClicks: number
}

export default function ButtonHint ({numberClicks}: Props) {
    return (
        <Transition
				as="p"
				className="mt-2 text-center text-xs text-slate-300"
				show={numberClicks < 3}
				appear={true}
				enterFrom="opacity-0"
				enter="transition-all duration-1000"
				enterTo="opacity-100"
				leaveFrom="opacity-100 mt-2 h-[16px]"
				leave="transition-all duration-250"
				leaveTo="opacity-0 mt-0 h-[0px]"
			>
				Hint: click this number to generate a new one
			</Transition>
    )
}