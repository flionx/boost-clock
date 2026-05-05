import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import InfoEn from "./_content/InfoEn";
import InfoRu from "./_content/InfoRu";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "ru" ? "О сайте" : "Info",
    description: locale === "ru" 
      ? "Повысьте свою продуктивность, улучшите концентрацию и эффективно управляйте своим временем с помощью техники Помодоро." 
      : "Boost your productivity, improve your concentration, and manage your time effectively with the Pomodoro Technique."
  }
}

const InfoPage = async () => {
  const locale = await getLocale();
  return locale === "ru" ? <InfoRu /> : <InfoEn />
}

export default InfoPage