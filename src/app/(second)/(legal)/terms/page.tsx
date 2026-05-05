import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import TermsEn from "./_content/TermsEn";
import TermsRu from "./_content/TermsRu";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "ru" ? "Условия пользования" : "Terms of use",
    description: locale === "ru" 
      ? "Перед использованием BoostClock ознакомьтесь с условиями использования." 
      : "Please read the terms of use before using BoostClock."
  }
}

const TermsPage = async () => {
  const locale = await getLocale();
  return locale === "ru" ? <TermsRu /> : <TermsEn />
}

export default TermsPage