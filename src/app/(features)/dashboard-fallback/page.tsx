const DashboardFallback = () => {
	return (
		<div className="flex flex-1 flex-col h-full items-center justify-center">
			<h1 className="text-xl font-bold tracking-tight text-center">
				Você não pode acessar a página solicitada.
			</h1>
			<p className="opacity-75 flex text-center pt-2">
				Entre em contato com seu gestor ou encontre a página desejada no menu
				<span className="hidden sm:block pl-1.5">lateral</span>
			</p>
		</div>
	);
};

export default DashboardFallback;
