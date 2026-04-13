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

// ─── Avatar ───────────────────────────────────────────────────────────────────
// Uses CSS variables for bg/text so it adapts to light & dark automatically
function AvatarCircle({
  initials,
  seed,
}: {
  initials: string;
  seed: number | string;
}) {
  // Deterministic hue from seed
  const hues = [265, 220, 160, 35, 10, 300, 190];
  const idx =
    typeof seed === "string"
      ? seed.charCodeAt(seed.length - 1) % hues.length
      : (seed as number) % hues.length;
  const hue = hues[idx];

  return (
    <div
      style={{
        // Semi-opaque tint so it blends on both light & dark cards
        background: `hsl(${hue} 55% 85% / 0.9)`,
        color: `hsl(${hue} 50% 30%)`,
      }}
      className="size-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 select-none
                 dark:bg-opacity-20"
      // Dark override via inline style for the dark variation
    >
      {initials}
    </div>
  );
}

// ─── Status badge — uses Tailwind semantic classes only ───────────────────────
function StatusBadge({ status }: { status: string }) {
  // All classes use Tailwind's color utilities which respect dark mode
  // (your globals.css keeps --destructive, --success, --warning tokens)
  const cls: Record<string, string> = {
    Active:
      "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
    Verified:
      "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
    Approved:
      "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
    Suspended:
      "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
    Rejected:
      "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
    Flagged:
      "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-700",
    Pending:
      "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
  };
  const base = "bg-muted text-muted-foreground border-border";

  return (
    <Badge
      variant="outline"
      className={`px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap border ${cls[status] ?? base}`}
    >
      {status}
    </Badge>
  );
}

function ClaimBadge({ status }: { status: string }) {
  const cls =
    status === "Claimed"
      ? "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
      : "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700";
  return (
    <Badge
      variant="outline"
      className={`px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap border ${cls}`}
    >
      {status}
    </Badge>
  );
}

function SubBadge({ tier }: { tier: string }) {
  const map: Record<string, string> = {
    platinum:
      "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
    Gold: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
    Silver:
      "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-700/30 dark:text-slate-300 dark:border-slate-600",
  };
  return (
    <Badge
      variant="outline"
      className={`px-2.5 py-0.5 text-xs font-semibold capitalize whitespace-nowrap border ${
        map[tier] ?? "bg-muted text-muted-foreground border-border"
      }`}
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
    // ── User identity cell ────────────────────────────────────────────────
    case "userCell":
      return (
        <div className="flex items-center gap-3">
          <AvatarCircle
            initials={row.avatar ?? "??"}
            seed={row.avatarSeed ?? row.id ?? 0}
          />
          <div className="min-w-0">
            <p className="font-medium text-foreground leading-tight text-sm truncate">
              {row.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {row.email}
            </p>
          </div>
        </div>
      );

    // ── Badges ────────────────────────────────────────────────────────────
    case "badge":
      return <StatusBadge status={val} />;
    case "claimBadge":
      return <ClaimBadge status={val} />;
    case "subBadge":
      return <SubBadge tier={val} />;

    // ── Rating ────────────────────────────────────────────────────────────
    case "rating":
      return (
        <span className="flex items-center gap-1 text-sm text-foreground">
          <Star className="size-3.5 text-yellow-400 fill-yellow-400" />
          {val}
        </span>
      );

    // ── Text ──────────────────────────────────────────────────────────────
    case "longText":
      return (
        <span className="text-sm text-muted-foreground line-clamp-1 max-w-xs">
          {val}
        </span>
      );
    case "text":
      return (
        <span className="text-sm text-muted-foreground">{val ?? "—"}</span>
      );

    // ── User actions ──────────────────────────────────────────────────────
    case "userActions":
      return (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-border text-foreground hover:bg-muted"
            onClick={() => onAction?.("view", row)}
          >
            <Eye className="size-3" /> View
          </Button>

          {row.status === "Active" ? (
            <Button
              variant="outline"
              size="sm"
              className="border-red-300 text-red-700 bg-red-50 hover:bg-red-100
                         dark:border-red-700 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40"
              onClick={() => onAction?.("suspend", row)}
            >
              <Ban className="size-3" /> Suspend
            </Button>
          ) : row.status === "Suspended" ? (
            <Button
              variant="outline"
              size="sm"
              className="border-green-300 text-green-700 bg-green-50 hover:bg-green-100
                         dark:border-green-700 dark:text-green-400 dark:bg-green-900/20 dark:hover:bg-green-900/40"
              onClick={() => onAction?.("activate", row)}
            >
              <CheckCircle className="size-3" /> Activate
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-border text-muted-foreground hover:bg-muted"
              onClick={() => onAction?.("more", row)}
            >
              <MoreHorizontal className="size-3" /> More
            </Button>
          )}
        </div>
      );

    // ── Business actions ──────────────────────────────────────────────────
    case "businessActions":
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold"
              >
                ACTION
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-36 bg-popover text-popover-foreground border-border"
            >
              <DropdownMenuItem
                className="hover:bg-muted focus:bg-muted cursor-pointer"
                onClick={() => onAction?.("view_details", row)}
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                onClick={() => onAction?.("suspend", row)}
              >
                Suspend
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );

    // ── Content actions ───────────────────────────────────────────────────
    case "contentActions":
      return (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-green-300 text-green-700 bg-green-50 hover:bg-green-100
                       dark:border-green-700 dark:text-green-400 dark:bg-green-900/20 dark:hover:bg-green-900/40"
            onClick={() => onAction?.("approve", row)}
          >
            <Check className="size-3" /> Approve
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-red-300 text-red-700 bg-red-50 hover:bg-red-100
                       dark:border-red-700 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40"
            onClick={() => onAction?.("reject", row)}
          >
            <X className="size-3" /> Reject
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={() => onAction?.("more", row)}
          >
            <MoreVertical className="size-4" />
          </Button>
        </div>
      );

    default:
      return (
        <span className="text-sm text-foreground">{String(val ?? "")}</span>
      );
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
        (r.business ?? "").toLowerCase().includes(term) ||
        (r.phone ?? "").toLowerCase().includes(term) ||
        (r.role ?? "").toLowerCase().includes(term);
      const matchStatus = statusFilter === "All" || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [rows, search, statusFilter]);

  React.useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [search, statusFilter, activeTab]);

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

  // ─── Shared table markup ───────────────────────────────────────────────
  const tableContent = (
    <>
      {/* Search + filter bar */}
      <div className="px-5 py-3 flex flex-col sm:flex-row gap-3 border-b border-border bg-card">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder={config.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background border-border text-foreground placeholder:text-muted-foreground
                       focus-visible:ring-ring"
          />
        </div>
        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              className="pl-9 w-[160px] bg-background border-border text-foreground
                         focus:ring-ring data-[state=open]:border-ring"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border text-popover-foreground">
              {allStatuses.map((s) => (
                <SelectItem
                  key={s}
                  value={s}
                  className="focus:bg-accent focus:text-accent-foreground cursor-pointer"
                >
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
          <TableHeader className="bg-muted/40">
            {table.getHeaderGroups().map((hg) => (
              <TableRow
                key={hg.id}
                className="border-b border-border hover:bg-transparent"
              >
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
                  className="h-24 text-center text-muted-foreground text-sm"
                >
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-border/60 hover:bg-muted/30 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-foreground">
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
      <div className="px-5 py-3 flex items-center justify-between border-t border-border bg-card">
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
              <SelectTrigger
                className="w-16 h-8 text-xs bg-background border-border text-foreground"
                id="rows-per-page"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                side="top"
                className="bg-popover border-border text-popover-foreground"
              >
                {[6, 10, 20, 30].map((n) => (
                  <SelectItem
                    key={n}
                    value={`${n}`}
                    className="focus:bg-accent focus:text-accent-foreground cursor-pointer"
                  >
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
            className="size-8 hidden lg:flex border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 hidden lg:flex border-border text-muted-foreground hover:bg-muted hover:text-foreground"
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
    <Card className="rounded-2xl p-5 border border-border shadow-sm bg-card text-card-foreground px-4 lg:px-6">
      <CardHeader className="border-b border-border px-5">
        <CardTitle className="text-base font-semibold text-foreground">
          {config.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {config.subtitle}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        {tabs && tabs.length > 0 ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="px-5 pt-3 border-b border-border bg-card">
              <TabsList className="h-auto bg-transparent p-0 gap-1">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="px-4 py-1.5 rounded-lg text-sm text-muted-foreground
                               hover:text-foreground hover:bg-muted transition-colors
                               data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                               data-[state=active]:shadow-none"
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
