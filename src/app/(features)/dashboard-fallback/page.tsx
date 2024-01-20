const DashboardFallback = () => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <h1 className="text-center text-xl font-bold tracking-tight">
        Você não pode acessar a página solicitada.
      </h1>
      <p className="flex pt-2 text-center opacity-75">
        Entre em contato com seu gestor ou encontre a página desejada no menu
        <span className="hidden pl-1.5 sm:block">lateral</span>
      </p>
    </div>
  );
};

export default DashboardFallback;
