"use client";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";

export default function LocalProvider({
  children,
  locale = "ar",
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages | undefined;
}) {
  function onError(error: { code: string }) {
    if (error.code === "MISSING_MESSAGE") return;
    console.error(error);
  }

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      onError={onError}
    >
      {children}
    </NextIntlClientProvider>
  );
}
