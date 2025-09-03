import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import React from 'react';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

// Usando tipagem explícita de Promise
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || routing.defaultLocale;
  const messages = await getMessages({ locale });

  return (
    <>
      <NextIntlClientProvider
        messages={messages}
        locale={locale}
      >
        <div className="overflow-hidden w-full">
          {children}
          {/* <Footer /> */}
        </div>
      </NextIntlClientProvider>
    </>
  );
}
