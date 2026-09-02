/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import "../globals.css";

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export default async function RootLayout({ params }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className="bg-white min-h-screen">
        {/* On ne rend rien ici pour simuler la page blanche */}
      </body>
    </html>
  );
}