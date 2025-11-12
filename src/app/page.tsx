import Header from "@/widgets/header";
import Timer from "@/features/timer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-[clamp(22rem,58.3vw,70rem)] mx-auto">
        <Timer />
      </main>
    </>
  );
}
