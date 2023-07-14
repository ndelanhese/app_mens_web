import { CommandKey } from '@components/shared/commandKey/commandKey'
import { Sidebar } from '@components/shared/sidebar/sidebar'
import { ToggleTheme } from '@components/shared/toggleTheme/toggleTheme'
import { Input } from '@components/ui/shadcn/input'

import { Search } from 'lucide-react'

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
            <div className="relative flex items-center">
              <div className="absolute left-2 flex flex-row items-center gap-1">
                <Search className="h-4 w-4" />
              </div>
              <Input
                className="border border-black-10 bg-white-100 pl-8 pr-11 dark:border-white-10 dark:bg-black-100"
                placeholder="Pesquisar..."
              />
              <div className="absolute right-2 flex flex-row items-center gap-1">
                <CommandKey />
              </div>
            </div>
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
