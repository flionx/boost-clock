import Quote from '@/features/quote'
import Tasks from '@/features/tasks'
import Timer from '@/features/timer'

const Main = () => {
  return (
    <main>
      <section className="w-[clamp(22rem,58.3vw,70rem)] mx-auto">
        <Timer />
        <Tasks />
      </section>
      <Quote />
    </main>
  )
}

export default Main