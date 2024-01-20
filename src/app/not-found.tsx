import { Button } from '@components/ui/shadcn/button';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h1 className="text-center text-xl font-bold tracking-tight">
        Página não encontrada!
      </h1>
      <Button className="mt-5">
        <Link href="/dashboard">Voltar para a Dashboard</Link>
      </Button>
    </div>
  );
};

export default NotFound;
