import { ToggleTheme } from '@/components/shared/toggleTheme/toggleTheme'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@components/ui/shadcn/avatar'

import { Sidebar } from 'lucide-react'

const Home = () => (
  <div className="flex h-screen w-screen flex-col">
    <div className="flex flex-1">
      <aside className="w-48 border-r border-black-10 px-4 py-5 dark:border-white-10">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src="https://github.com/ndelanhese.png"
              alt="@ndelanhese"
            />
            <AvatarFallback>ND</AvatarFallback>
          </Avatar>
          <span className="text-md font-re dark:text-white-100">Nathan</span>
        </div>
        <nav className="mt-10 space-y-5">nav link</nav>
      </aside>
      <main className="flex flex-1 flex-col gap-4">
        <nav className="flex h-16 w-full items-center justify-between border-b border-black-10 px-7 py-5 dark:border-white-10">
          <div>
            <Sidebar className="h-5 w-5" />
          </div>
          <div>
            <ToggleTheme />
          </div>
        </nav>
        <section className="flex h-full w-full overflow-y-auto px-7 py-5">
          content
        </section>
      </main>
    </div>
  </div>
)

export default Home
