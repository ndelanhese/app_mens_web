import { CommandKeySearchBar } from '@components/shared/commandKey/commandKeySearchBar'
import { Sidebar } from '@components/shared/sidebar/sidebar'
import { ToggleTheme } from '@components/shared/toggleTheme/toggleTheme'

const Home = () => (
  <div className="flex h-screen w-screen flex-col">
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex flex-1 flex-col gap-4">
        <nav className="flex h-16 w-full items-center justify-between border-b border-black-10 px-7 py-5 dark:border-white-10">
          <div className="invisible w-12 sm:visible sm:w-auto">
            Tela Inicial
          </div>
          <div className="inline-flex items-center space-x-4">
            <CommandKeySearchBar />
            <ToggleTheme />
          </div>
        </nav>
        <section className="flex h-full w-full overflow-y-auto px-7 py-5">
          <h1>hello world!!!</h1>
        </section>
      </main>
    </div>
  </div>
)

export default Home
