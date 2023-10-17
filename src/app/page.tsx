import { Header } from '@components/shared/header/header';
import { Sidebar } from '@components/shared/sidebar/sidebar';

const Home = () => (
  <div className="flex h-screen w-screen flex-col">
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex flex-1 flex-col gap-4">
        <Header />
        <section className="flex h-full w-full overflow-y-auto px-7 py-5">
          <h1>hello world!!!</h1>
        </section>
      </main>
    </div>
  </div>
);

export default Home;
