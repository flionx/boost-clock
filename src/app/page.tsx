import Header from "@/widgets/header";
import Timer from "@/features/timer";
import Tasks from "@/features/tasks";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-[clamp(22rem,58.3vw,70rem)] mx-auto overflow-hidden">
        <Timer />
        <Tasks />
      </main>
    </>
  );
}
