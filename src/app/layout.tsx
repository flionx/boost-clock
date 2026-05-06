import { itim, jetbrains_mono, literal } from "@/shared/assets/fonts";
import ThemeProvider from "@/shared/providers/theme-provider";
import FirebaseProvider from "@/shared/providers/firebase-provider";
import AutoSaveProvider from "@/shared/providers/autosave-provider";
import Modal from "@/shared/ui/Modal";
import AchievementsTracker from "@/features/achievements/ui/AchievementsTracker";
import { ModalMenu } from "@/widgets/modal-menu";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: {
      default: `BoostClock | ${locale === "ru" ? "Помодоро таймер" : "Pomodoro Timer"}`,
      template: "%s | Boost Clock",
    },
    description: locale === "ru"
      ? "Повысьте свою продуктивность с помощью бесплатного Помодоро таймера! Гибкие настройки, список задач, статистика и удобный интерфейс. Начните эффективно управлять своим временем!"
      : "Improve your productivity with the free Pomodoro timer! Flexible settings, task list, statistics and user-friendly interface. Start managing time effectively!",

    keywords: locale === "ru"
      ? "Помодоро, таймер, метод помидора, концентрация, управление задачами, таймер работы, таймер перерыва, продуктивность, метод Помодоро, управление временем, nextjs, boost clock, таймер помодоро"
      : "pomodoro, timer, boost, clock, focus, task management, work timer, break timer, productivity, pomodoro technique, time management, nextjs, boost clock, pomodoro timer",
    verification: {
      google: "h9Ca5515AFZRsDHidOR9XSWizwgWUN6rjEPGeRy_lkE"
    },
    other: {
      'apple-mobile-web-app-title': 'BoostClock',
    },
  }
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`
          ${itim.variable} ${literal.variable} ${jetbrains_mono.variable} antialiased
        `}
      >
        <ThemeProvider>
          <FirebaseProvider>
            <AutoSaveProvider>
              <NextIntlClientProvider messages={messages}>
                <Modal />
                <ModalMenu />
                <Toaster position='top-center' containerStyle={{ fontFamily: 'var(--font-primary)' }} />
                <AchievementsTracker />
                {children}
              </NextIntlClientProvider>
            </AutoSaveProvider>
          </FirebaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
