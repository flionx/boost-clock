import Quote from '@/features/quote'
import Tasks from '@/features/tasks'
import Timer from '@/features/timer'

const Main = () => {
  return (
    <main>
      <section className="content-wrapper">
        <Timer />
        <Tasks />
      </section>
      <Quote />
    </main>
  )
}

export default Main