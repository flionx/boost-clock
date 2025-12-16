import { itim, jetbrains_mono, literal, poppins } from "@/shared/assets/fonts";
import ThemeProvider from "@/shared/providers/theme-provider";
import FirebaseProvider from "@/shared/providers/firebase-provider";
import AutoSaveProvider from "@/shared/providers/autosave-provider";
import Modal from "@/shared/ui/Modal";
import AchievementsTracker from "@/features/achievements/ui/AchievementsTracker";
import { ModalMenu } from "@/widgets/modal-menu";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BoostClock | Pomodoro Timer",
    template: "%s | Boost Clock",
  },
  description: "Improve your productivity with the free Pomodoro timer! Flexible settings, task list, statistics and user-friendly interface. Start managing time effectively!",
  keywords: "pomodoro, timer, boost, clock, focus, task management, work timer, break timer, productivity, pomodoro technique, time management, nextjs, boost clock, pomodoro timer",
  verification: {
    google: "h9Ca5515AFZRsDHidOR9XSWizwgWUN6rjEPGeRy_lkE"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${itim.variable} ${literal.variable} ${jetbrains_mono.variable}
          ${poppins.variable} antialiased
        `}
      >
        <ThemeProvider>
          <FirebaseProvider>
            <AutoSaveProvider>
              <Modal />
              <ModalMenu />
              <Toaster position='top-center' containerStyle={{fontFamily: 'var(--font-primary)'}}/>
              <AchievementsTracker />
              {children}
            </AutoSaveProvider>
          </FirebaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
