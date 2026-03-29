"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Eye,
  Ban,
  CheckCircle,
  MoreHorizontal,
  Check,
  X,
  MoreVertical,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BRAND = "#6E56FF";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ColumnType =
  | "userCell"
  | "text"
  | "longText"
  | "badge"
  | "claimBadge"
  | "subBadge"
  | "rating"
  | "userActions"
  | "businessActions"
  | "contentActions";

export interface ColumnDef2 {
  key: string;
  label: string;
  type: ColumnType;
}

export interface TableConfig {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  columns: ColumnDef2[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RowData = Record<string, any>;

export interface DataTableProps {
  config: TableConfig;
  rows: RowData[];
  onAction?: (action: string, row: RowData) => void;
  tabs?: string[];
}

// ─── Cell sub-components ──────────────────────────────────────────────────────

function AvatarCircle({ initials, seed }: { initials: string; seed: number }) {
  const hues = [265, 220, 160, 35, 10, 300, 190];
  const hue = hues[seed % hues.length];
  return (
    <div
      style={{
        background: `hsl(${hue} 60% 88%)`,
        color: `hsl(${hue} 50% 35%)`,
      }}
      className="size-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 select-none"
    >
      {initials}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variantMap: Record<string, string> = {
    Active: "bg-green-100 text-green-700 border-green-200",
    Verified: "bg-green-100 text-green-700 border-green-200",
    Approved: "bg-green-100 text-green-700 border-green-200",
    Suspended: "bg-red-100 text-red-700 border-red-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
    Flagged: "bg-rose-100 text-rose-700 border-rose-200",
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  };
  const cls = variantMap[status] ?? "bg-muted text-muted-foreground";
  return (
    <Badge
      variant="outline"
      className={`px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap border ${cls}`}
    >
      {status}
    </Badge>
  );
}

function ClaimBadge({ status }: { status: string }) {
  const cls =
    status === "Claimed"
      ? "bg-blue-100 text-blue-700 border-blue-200"
      : "bg-red-100 text-red-700 border-red-200";
  return (
    <Badge
      variant="outline"
      className={`px-2.5 py-0.5  text-xs font-semibold whitespace-nowrap border ${cls}`}
    >
      {status}
    </Badge>
  );
}

function SubBadge({ tier }: { tier: string }) {
  const map: Record<string, string> = {
    platinum: "bg-purple-100 text-purple-700 border-purple-200",
    Gold: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Silver: "bg-slate-100 text-slate-600 border-slate-200",
  };
  const cls = map[tier] ?? "bg-muted text-muted-foreground";
  return (
    <Badge
      variant="outline"
      className={`px-2.5 py-0.5 text-xs font-semibold capitalize whitespace-nowrap border ${cls}`}
    >
      {tier}
    </Badge>
  );
}

// ─── Cell renderer ────────────────────────────────────────────────────────────

function CellRenderer({
  col,
  row,
  onAction,
}: {
  col: ColumnDef2;
  row: RowData;
  onAction?: (action: string, row: RowData) => void;
}) {
  const val = row[col.key];

  switch (col.type) {
    case "userCell":
      return (
        <div className="flex items-center gap-3">
          <AvatarCircle initials={row.avatar ?? "??"} seed={row.id ?? 0} />
          <div>
            <p className="font-medium text-foreground leading-tight text-sm">
              {row.name}
            </p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      );

    case "badge":
      return <StatusBadge status={val} />;
    case "claimBadge":
      return <ClaimBadge status={val} />;
    case "subBadge":
      return <SubBadge tier={val} />;

    case "rating":
      return (
        <span className="flex items-center gap-1 text-sm">
          <Star className="size-3.5 text-yellow-400 fill-yellow-400" />
          {val}
        </span>
      );

    case "longText":
      return (
        <span className="text-sm text-muted-foreground line-clamp-1 max-w-xs">
          {val}
        </span>
      );

    case "text":
      return <span className="text-sm text-muted-foreground">{val}</span>;

    // ── Action cells ──────────────────────────────────────────────────────────

    case "userActions":
      return (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAction?.("view", row)}
          >
            <Eye className="size-3" /> View
          </Button>
          {row.status === "Active" ? (
            <Button
              variant="outline"
              size="sm"
              className="border-red-200 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700"
              onClick={() => onAction?.("suspend", row)}
            >
              <Ban className="size-3" /> Suspend
            </Button>
          ) : row.status === "Suspended" ? (
            <Button
              variant="outline"
              size="sm"
              className="border-green-200 text-green-600 bg-green-50 hover:bg-green-100"
              onClick={() => onAction?.("activate", row)}
            >
              <CheckCircle className="size-3" /> Activate
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAction?.("more", row)}
            >
              <MoreHorizontal className="size-3" /> More
            </Button>
          )}
        </div>
      );

    case "businessActions":
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                style={{ background: BRAND }}
                className="text-white hover:opacity-90 text-xs font-semibold"
              >
                ACTION
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem onClick={() => onAction?.("view_details", row)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => onAction?.("suspend", row)}
              >
                Suspend
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );

    case "contentActions":
      return (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-green-200 text-green-600 bg-green-50 hover:bg-green-100"
            onClick={() => onAction?.("approve", row)}
          >
            <Check className="size-3" /> Approve
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-red-200 text-red-600 bg-red-50 hover:bg-red-100"
            onClick={() => onAction?.("reject", row)}
          >
            <X className="size-3" /> Reject
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => onAction?.("more", row)}
          >
            <MoreVertical className="size-4 text-muted-foreground" />
          </Button>
        </div>
      );

    default:
      return <span className="text-sm">{String(val ?? "")}</span>;
  }
}

// ─── Main DataTable ───────────────────────────────────────────────────────────

export function DataTable({ config, rows, onAction, tabs }: DataTableProps) {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [activeTab, setActiveTab] = React.useState(tabs?.[0] ?? "");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 6,
  });

  const allStatuses = React.useMemo(() => {
    const set = new Set(rows.map((r) => r.status).filter(Boolean));
    return ["All", ...Array.from(set)] as string[];
  }, [rows]);

  const filtered = React.useMemo(() => {
    return rows.filter((r) => {
      const term = search.toLowerCase();
      const matchSearch =
        (r.name ?? "").toLowerCase().includes(term) ||
        (r.email ?? "").toLowerCase().includes(term) ||
        (r.content ?? "").toLowerCase().includes(term) ||
        (r.business ?? "").toLowerCase().includes(term);
      const matchStatus = statusFilter === "All" || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [rows, search, statusFilter]);

  React.useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [search, statusFilter, activeTab]);

  // Build TanStack columns dynamically from config
  const tanColumns = React.useMemo<ColumnDef<RowData>[]>(() => {
    return config.columns.map((col) => ({
      id: col.key,
      accessorKey: col.key,
      header: () => (
        <span
          className={col.type.endsWith("Actions") ? "flex justify-end" : ""}
        >
          {col.label}
        </span>
      ),
      cell: ({ row }) => (
        <CellRenderer col={col} row={row.original} onAction={onAction} />
      ),
      enableSorting: col.type === "text" || col.type === "badge",
    }));
  }, [config.columns, onAction]);

  const table = useReactTable({
    data: filtered,
    columns: tanColumns,
    state: { sorting, columnFilters, columnVisibility, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const tableContent = (
    <>
      {/* Search + filter */}
      <div className="px-5 py-3 flex flex-col sm:flex-row gap-3 border-b border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder={config.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="pl-9 w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {allStatuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/30">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead
                    key={h.id}
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                  >
                    {h.isPlaceholder
                      ? null
                      : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={config.columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-3 flex items-center justify-between border-t border-border">
        <p className="text-xs text-muted-foreground hidden sm:block">
          Showing{" "}
          {filtered.length === 0
            ? 0
            : table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
              1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            filtered.length,
          )}{" "}
          of {filtered.length.toLocaleString()} results
        </p>

        <div className="flex items-center gap-2 ml-auto">
          {/* Rows per page */}
          <div className="hidden lg:flex items-center gap-2">
            <Label
              htmlFor="rows-per-page"
              className="text-xs text-muted-foreground whitespace-nowrap"
            >
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(v) => table.setPageSize(Number(v))}
            >
              <SelectTrigger className="w-16 h-8 text-xs" id="rows-per-page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {[6, 10, 20, 30].map((n) => (
                  <SelectItem key={n} value={`${n}`}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <span className="text-xs text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {Math.max(1, table.getPageCount())}
          </span>

          <Button
            variant="outline"
            size="icon"
            className="size-8 hidden lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 hidden lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Card className="border-none shadow-sm bg-white px-4 lg:px-6">
      <CardHeader className="border-b border-border px-5">
        <CardTitle className="text-base font-semibold">
          {config.title}
        </CardTitle>
        <CardDescription>{config.subtitle}</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        {tabs && tabs.length > 0 ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="px-5 pt-3 border-b border-border">
              <TabsList className="h-auto bg-transparent p-0 gap-1">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="px-4 py-1.5 rounded-lg text-sm data-[state=active]:text-white data-[state=active]:shadow-none"
                    style={activeTab === tab ? { background: BRAND } : {}}
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {tabs.map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-0">
                {tableContent}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          tableContent
        )}
      </CardContent>
    </Card>
  );
}
