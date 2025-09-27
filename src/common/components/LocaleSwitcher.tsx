"use client"
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher() {
	const t = useTranslations("LocaleSwitcher");
	const locale = useLocale();

	return (
		<LocaleSwitcherSelect
			defaultValue={locale}
			label={t("label")}
			items={routing.locales.map((cur) => ({ value: cur, label: t("locale", { locale: cur }) }))}
		/>
	);
}
