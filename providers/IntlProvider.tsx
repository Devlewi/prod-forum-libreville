/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Spinner from "@/app/ui/Spinner";
import { NextIntlClientProvider } from "next-intl";
//import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function IntlProvider({ children, locale }: { children: React.ReactNode; locale: string }) {
  const [messages, setMessages] = useState<any>(null);
  //const router = useRouter();

  useEffect(() => {
    import(`@/app/lang/${locale}.json`)
      .then((data) => setMessages(data.default)) // Correction ici
      .catch((error) => {
        console.error(`Erreur de chargement des traductions pour ${locale}`, error);
        setMessages(null); //  Éviter une boucle infinie
      });
  }, [locale]);

  if (!messages) return <Spinner/>; //  Ajouter un fallback

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
