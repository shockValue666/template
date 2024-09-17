"use client";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface RealDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
}

const DataTable = <TData,TValue>({
  columns,data
}:RealDataTableProps<TData,TValue>
) => {
  const [mounted, isMounted] = useState(false)
  const table=useReactTable({
    data,
    columns,
    getCoreRowModel:getCoreRowModel(),
    getPaginationRowModel:getPaginationRowModel()
  })
  useEffect(()=>{
    isMounted(true)
    console.log("headergroup: ",table.getHeaderGroups())
    console.log("rows: ",table.getRowModel())
  },[])
  if(!mounted) return (<div>no</div>)

  return (
    <div>
      <div className='rounded-md border'>
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
            
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(header=>(
                  <TableRow key={header.id}>
                    {header.headers.map(_header=>{
                      return (
                        <TableHead key={_header.id}>
                          {
                            _header.isPlaceholder ? null : 
                              flexRender(
                                _header.column.columnDef.header,
                                _header.getContext()
                              )
                          }
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {/* <tr>body</tr> */}
                {
                  table.getRowModel().rows?.length ? 
                  (
                    // <div>
                        table.getRowModel().rows.map(row=>(
                          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                            {row.getVisibleCells().map(cell=>(
                              <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                    // </div>
                  )
                  :
                  (
                    <TableRow>
                      <TableCell colSpan={columns.length} className='h-24 text-center'>
                          No results
                      </TableCell>
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {/* <div className='flex items-center justify-end space-x-2 py-4'>
            <Button variant='outline' size="sm" onClick={()=>table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={()=>table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
      </div> */}
    </div>
  )
}

export default DataTable