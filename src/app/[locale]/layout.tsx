/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import "../globals.css";
import IntlProvider from "../../../providers/IntlProvider";
import { getDirection } from "../lib/intl";
import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";
// @ts-ignore
import "@fortawesome/fontawesome-free/css/all.min.css";
import { fetchSiteLogo } from "../services/api";


type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export default async function RootLayout({ params, children }: Props) {
  const { locale } = await params;
  const dir = getDirection(locale);
  // RÉCUPÉRATION UNIQUE DU LOGO
  const logoUrl = await fetchSiteLogo(locale);
  //console.log(logoUrl);

  return (
    <html lang={locale} dir={dir}>
      <body className="bg-gray-50 font-sans">
        <IntlProvider locale={locale}>
          <main>
            <Navbar logoUrl={logoUrl} locale={locale}/>            
            {children}
            <Footer logoUrl={logoUrl} />
          </main>
        </IntlProvider>
      </body>
    </html>
  );
}