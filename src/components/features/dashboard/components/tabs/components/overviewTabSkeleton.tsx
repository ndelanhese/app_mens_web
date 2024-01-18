import { Skeleton } from "@/components/ui/shadcn/skeleton";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@components/ui/shadcn/card";
import { CreditCard, DollarSign, ShoppingBag, Users } from "lucide-react";

export const OverviewTabSkeleton = () => (
	<div className="space-y-4">
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Receita total</CardTitle>
					<DollarSign className="h-4 w-4" />
				</CardHeader>
				<CardContent>
					<div>
						<Skeleton className="h-12" />
					</div>
					<div className="text-muted-foreground text-xs inline-flex items-center gap-2 pt-2.5">
						<Skeleton className="h-3 w-[3.75rem]" />
						que o mês passado
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Clientes</CardTitle>
					<Users className="h-4 w-4" />
				</CardHeader>
				<CardContent>
					<div>
						<Skeleton className="h-12" />
					</div>
					<div className="text-muted-foreground text-xs inline-flex items-center gap-2 pt-2.5">
						<Skeleton className="h-3 w-[3.75rem]" />
						que o mês passado
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Vendas</CardTitle>
					<CreditCard className="h-4 w-4" />
				</CardHeader>
				<CardContent>
					<div>
						<Skeleton className="h-12" />
					</div>
					<div className="text-muted-foreground text-xs inline-flex items-center gap-2 pt-2.5">
						<Skeleton className="h-3 w-[3.75rem]" />
						que o mês passado
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Pedidos</CardTitle>
					<ShoppingBag className="h-4 w-4" />
				</CardHeader>
				<CardContent>
					<div>
						<Skeleton className="h-12" />
					</div>
					<div className="text-muted-foreground text-xs inline-flex items-center gap-2 pt-2.5">
						<Skeleton className="h-3 w-[3.75rem]" />
						que o mês passado
					</div>
				</CardContent>
			</Card>
		</div>
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
			<Card className="col-span-3 sm:col-span-4">
				<CardHeader>
					<CardTitle className="text-3xl font-bold tracking-tight">
						Overview
					</CardTitle>
				</CardHeader>
				<CardContent className="pl-6">
					<Skeleton className="h-[21.875rem]" />
				</CardContent>
			</Card>
			<Card className="col-span-3">
				<CardHeader>
					<CardTitle className="text-3xl font-bold tracking-tight">
						Vendas recentes
					</CardTitle>
					<div className="text-sm text-zinc-500 dark:text-zinc-400 inline-flex items-center gap-1">
						foram <Skeleton className="h-3 w-6" /> vendas no último mês.
					</div>
				</CardHeader>
				<CardContent>
					<Skeleton className="h-[20.5rem]" />
				</CardContent>
			</Card>
		</div>
	</div>
);
