import { Button } from "@components/ui/shadcn/button";
import Link from "next/link";

const NotFound = () => {
	return (
		<div className="flex items-center flex-col justify-center flex-1">
			<h1 className="text-xl font-bold tracking-tight text-center">
				Página não encontrada!
			</h1>
			<Button className="mt-5">
				<Link href="/dashboard">Voltar para a Dashboard</Link>
			</Button>
		</div>
	);
};

export default NotFound;
