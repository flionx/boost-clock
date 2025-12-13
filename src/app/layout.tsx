import { itim, jetbrains_mono, literal, poppins } from "@/shared/assets/fonts";
import ThemeProvider from "@/shared/providers/theme-provider";
import ModalWarning from "@/shared/ui/ModalWarning";
import { ModalMenu } from "@/widgets/modal-menu";
import AchievementsTracker from "@/features/achievements/ui/AchievementsTracker";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BoostClock | Pomodoro Timer",
  description: "Improve your productivity with the free Pomodoro timer! Flexible settings, task list, statistics and user-friendly interface. Start managing time effectively!",
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
          <ModalWarning />
          <ModalMenu />
          <AchievementsTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
