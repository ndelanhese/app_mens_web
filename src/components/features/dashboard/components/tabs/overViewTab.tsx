import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@components/ui/shadcn/card";

import { CreditCard, DollarSign, ShoppingBag, Users } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { OverviewChart } from "../overviewChart";
import { RecentSales } from "../recentSales";
import { getOverview } from "./api/api";
import { OverviewResponse } from "./api/api.types";
import { OverviewTabSkeleton } from "./components/overviewTabSkeleton";

export const OverviewTab = () => {
	const [overviewData, setOverviewData] = useState<
		OverviewResponse | undefined
	>(undefined);

	const getOverviewData = useCallback(async () => {
		const response = await getOverview();
		setOverviewData(response);
	}, []);

	useEffect(() => {
		getOverviewData();
	}, [getOverviewData]);

	const percentageCaption = (percentage: string | undefined) => {
		if (!percentage) return "";
		if (percentage.startsWith("-")) {
			return "à menos ";
		}
		return "à mais ";
	};

	if (!overviewData) {
		return <OverviewTabSkeleton />;
	}

	return (
		<div className="space-y-4">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Receita total</CardTitle>
						<DollarSign className="h-4 w-4" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{overviewData?.total_revenue}
						</div>
						<p className="text-muted-foreground text-xs">
							{overviewData?.total_revenue_difference_from_last_month}{" "}
							{percentageCaption(
								overviewData?.total_revenue_difference_from_last_month,
							)}
							que o mês passado
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Clientes</CardTitle>
						<Users className="h-4 w-4" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							+{overviewData?.customers_qty}
						</div>
						<p className="text-muted-foreground text-xs">
							{overviewData?.customers_qty_difference_from_last_month}{" "}
							{percentageCaption(
								overviewData?.customers_qty_difference_from_last_month,
							)}
							que o mês passado
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Vendas</CardTitle>
						<CreditCard className="h-4 w-4" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">+{overviewData?.sales_qty}</div>
						<p className="text-muted-foreground text-xs">
							{overviewData?.sales_qty_difference_from_last_month}{" "}
							{percentageCaption(
								overviewData?.sales_qty_difference_from_last_month,
							)}
							que o mês passado
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Pedidos</CardTitle>
						<ShoppingBag className="h-4 w-4" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							+{overviewData?.orders_qty}
						</div>
						<p className="text-muted-foreground text-xs">
							{overviewData?.orders_qty_difference_from_last_month}{" "}
							{percentageCaption(
								overviewData?.orders_qty_difference_from_last_month,
							)}
							que o mês passado
						</p>
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
					<CardContent>
						<OverviewChart data={overviewData?.overview} />
					</CardContent>
				</Card>
				<Card className="col-span-3">
					<CardHeader>
						<CardTitle className="text-3xl font-bold tracking-tight">
							Vendas recentes
						</CardTitle>
						<CardDescription>
							foram {overviewData?.last_month_sales_qty} vendas no último mês.
						</CardDescription>
					</CardHeader>
					<CardContent>
						{overviewData && <RecentSales data={overviewData.recent_sales} />}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
