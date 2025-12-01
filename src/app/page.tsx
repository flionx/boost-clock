import Header from "@/widgets/header";
import Timer from "@/features/timer";
import Tasks from "@/features/tasks";
import Quote from "@/features/quote/ui";
import Footer from "@/widgets/footer/ui";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="w-[clamp(22rem,58.3vw,70rem)] mx-auto">
          <Timer />
          <Tasks />
        </section>
        <Quote />
      </main>
      <Footer />
    </>
  );
}
