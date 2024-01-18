import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/shadcn/table";
import { ProductsStockResponse } from "../dashboard.types";

export const ProductsWithLowStockTable = ({
	products,
}: {
	products: ProductsStockResponse;
}) => (
	<Table>
		<TableHeader>
			<TableHead>Código</TableHead>
			<TableHead>Nome</TableHead>
			<TableHead>Part Number</TableHead>
			<TableHead>Descrição</TableHead>
			<TableHead className="text-right">Qtd. </TableHead>
		</TableHeader>
		<TableBody>
			{products.data.map((product) => (
				<TableRow>
					<TableCell>{product.id.toString()}</TableCell>
					<TableCell>{product.name}</TableCell>
					<TableCell>{product.part_number}</TableCell>
					<TableCell>{product.description}</TableCell>
					<TableCell className="text-right">{product.quantity}</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
);
