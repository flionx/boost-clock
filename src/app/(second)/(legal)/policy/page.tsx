import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import PolicyEn from "./_content/PolicyEn";
import PolicyRu from "./_content/PolicyRu";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "ru" ? "Политика данных" : "Privacy Policy",
    description: locale === "ru" 
      ? "Узнайте, как мы собираем, используем и защищаем ваши персональные данные при использовании BoostClock." 
      : "Discover how we collect, use, and protect your personal information when you use BoostClock."
  }
}

const PolicyPage = async () => {
  const locale = await getLocale();
  return locale === "ru" ? <PolicyRu /> : <PolicyEn />
}

export default PolicyPage