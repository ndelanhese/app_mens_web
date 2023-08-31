import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/shadcn/table'

export const TableSkeleton = () => {
  const iterateRows = () => {
    const rows = [
      <TableRow key="first">
        <TableCell>
          <div className="flex animate-pulse items-center">
            <div className="h-6 w-64 rounded-full bg-slate-100"></div>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex animate-pulse items-center">
            <div className="h-6 w-64 rounded-full bg-slate-100"></div>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex animate-pulse items-center">
            <div className="h-6 w-64 rounded-full bg-slate-100"></div>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex animate-pulse items-center">
            <div className="h-6 w-64 rounded-full bg-slate-100"></div>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex animate-pulse items-center">
            <div className="h-6 w-64 rounded-full bg-slate-100"></div>
          </div>
        </TableCell>
      </TableRow>,
    ]

    for (let index = 0; index < 5; index++) {
      rows.push(rows[0])
    }
    return rows
  }

  return (
    <Table>
      <TableCaption>
        <div className="flex animate-pulse items-center">
          <div className="h-6 w-64 rounded-full bg-slate-100"></div>
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-4 text-left">
            <div className="flex animate-pulse items-center">
              <div className="h-6 w-20 rounded-full bg-slate-100"></div>
            </div>
          </TableHead>
          <TableHead className="w-4 text-left">
            <div className="flex animate-pulse items-center">
              <div className="h-6 w-20 rounded-full bg-slate-100"></div>
            </div>
          </TableHead>
          <TableHead className="w-4 text-left">
            <div className="flex animate-pulse items-center">
              <div className="h-6 w-20 rounded-full bg-slate-100"></div>
            </div>
          </TableHead>
          <TableHead className="w-4 text-left">
            <div className="flex animate-pulse items-center">
              <div className="h-6 w-20 rounded-full bg-slate-100"></div>
            </div>
          </TableHead>
          <TableHead className="w-4 text-left">
            <div className="flex animate-pulse items-center">
              <div className="h-6 w-20 rounded-full bg-slate-100"></div>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{iterateRows().map((row) => row)}</TableBody>
    </Table>
  )
}
