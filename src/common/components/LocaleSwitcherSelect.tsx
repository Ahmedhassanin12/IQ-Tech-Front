import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import type { Locale } from "@/i18n/config";

type Item = { value: Locale; label: string };

type Props = {
	items: Item[];
	defaultValue: string;
	label: string;
};

const LocaleSwitcherSelect = ({ defaultValue, items, label }: Props) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [open, setOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const menuRef = useRef<HTMLDivElement | null>(null);

	const pathname = usePathname();
	const locale = useLocale();
	const isRtl = locale === "ar";

	function navigateToLocale(nextLocale: Locale) {
		startTransition(() => {
			const pathWithoutLocale = pathname.split("/").slice(2).join("/");
			const newPathname = `/${nextLocale}/${pathWithoutLocale}`;
			router.replace(newPathname);
		});
	}

	useEffect(() => {
		function onDocClick(e: MouseEvent) {
			if (!open) return;
			const target = e.target as Node;
			if (
				buttonRef.current &&
				menuRef.current &&
				!buttonRef.current.contains(target) &&
				!menuRef.current.contains(target)
			) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", onDocClick);
		return () => document.removeEventListener("mousedown", onDocClick);
	}, [open]);

	const activeItem = items.find((i) => i.value === (defaultValue as Locale));

	return (
		<div
			className={`relative inline-block ${isRtl ? "text-right" : "text-left"}  ${isPending ? "opacity-70" : ""}`}
		>
			<p className="sr-only">{label}</p>
			<button
				type="button"
				ref={buttonRef}
				aria-haspopup="listbox"
				aria-expanded={open}
				onClick={() => setOpen((o) => !o)}
				disabled={isPending}
				className="inline-flex items-center gap-2 rounded-lg bg-white/5 backdrop-blur border border-white/10 shadow-sm px-3 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
			>
				<span>{activeItem?.label ?? defaultValue}</span>
				<svg
					className="text-white/80"
					width="16"
					height="16"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						d="M5 8l5 5 5-5"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			{open && (
				<div
					ref={menuRef}
					role="listbox"
					className={`absolute ${isRtl ? "left-0" : "right-0"} mt-2 w-44 ${isRtl ? "origin-top-left" : "origin-top-right"}  rounded-lg border border-white/10 bg-amber-900/95 text-white shadow-xl ring-1 ring-black/5 focus:outline-none overflow-hidden`}
				>
					<ul className="max-h-64 overflow-auto py-1">
						{items.map((item) => (
							<li key={item.value}>
								<button
									type="button"
									role="option"
									aria-selected={item.value === defaultValue}
									onClick={() => {
										setOpen(false);
										navigateToLocale(item.value);
									}}
									className={`w-full text-left px-3 py-2 text-sm hover:bg-amber-800/80 ${item.value === defaultValue ? "bg-amber-800/60" : ""}`}
								>
									{item.label}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default LocaleSwitcherSelect;
