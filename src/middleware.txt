/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { i18n } from "../i18n-config";
import type { I18nConfig } from "../i18n-config";

function getLocale(request: NextRequest, i18nConfig: I18nConfig): string {
  const { locales, defaultLocale } = i18nConfig;

  // 1. Priorité : Vérifier le cookie défini par la Navbar
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Sinon : Détection par le navigateur
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { locales } = i18n;
  const pathname = request.nextUrl.pathname;

  // Vérifier si une langue est déjà présente dans l'URL
  const pathLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathLocale) {
    const locale = getLocale(request, i18n);
    // On s'assure que le pathname commence par un slash
    const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
    const newUrl = new URL(`/${locale}${p}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Ce matcher exclut :
  // - Les routes API
  // - Les fichiers statiques de Next.js (_next)
  // - Tous les fichiers avec une extension (ex: .webp, .png, .jpg, .svg)
  // - Le favicon
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ],
};