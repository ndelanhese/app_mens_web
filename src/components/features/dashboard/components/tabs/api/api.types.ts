type Customer = {
	id: number;
	name: string;
	cpf: string;
	rg: string;
	birth_date: string;
	phone: string;
	status: string;
	createdAt: string;
	updatedAt: string;
};

type Method = {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
};

type Product = {
	sold_product_qty: number;
	product_final_value_unity: number;
	product_final_value_unity_formatted: string;
	products_final_value: number;
	products_final_value_formatted: string;
	id: number;
	part_number: string;
	name: string;
	description: string;
	purchase_price: number;
	price: number;
	size: string;
	color: string;
	quantity: number;
	status: string;
	category_id: number;
	brand_id: number;
	supplier_id: number;
	createdAt: string;
	updatedAt: string;
};

export type Sale = {
	id: number;
	date: string;
	observation: string;
	total_value: number;
	discount_amount: number | null;
	discount_type: string | null;
	final_value: number;
	status: string;
	createdAt: string;
	customer: Customer;
	employee: {
		id: number;
		name: string;
		cpf: string;
	};
	methods_of_payments: {
		id: number;
		installment: number;
		sale_id: number;
		method_id: number;
		createdAt: string;
		updatedAt: string;
		method: Method;
	}[];
	products: Product[];
};

type MonthlyOverview = {
	month_name: string;
	total_revenue: number;
};

export type OverviewResponse = {
	total_revenue: string;
	total_revenue_difference_from_last_month: string;
	sales_qty: number;
	sales_qty_difference_from_last_month: string;
	customers_qty: number;
	customers_qty_difference_from_last_month: string;
	orders_qty: number;
	orders_qty_difference_from_last_month: string;
	overview: MonthlyOverview[];
	recent_sales: Sale[];
	last_month_sales_qty: number;
};
