import React from 'react';
import Reactpaginate from 'react-paginate';

import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  FilterFn,
} from '@tanstack/react-table';

import { rankItem } from '@tanstack/match-sorter-utils';

import { inventoryData } from './helper/inventoryData';
import { INVENTORY_COLUMNS } from './helper/inventory';
import { sortIcon } from '../../constants/imageConstants';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const InventoryBlocked = () => {
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data: inventoryData,
    columns: INVENTORY_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
  });

  // const {globalFilter} = table.getState

  return (
    <>
      <div className="deletes border-0 inventoring0">
        <div className="deletes-left inventoring1">
          <div className="form-group row m-0">
            <label htmlFor="staticEmail" className="col-form-label">
              Filter by:
            </label>
            <div className="">
              <select
                name="service"
                id="cars"
                // value={table.sta}
                value={globalFilter}
                className="form-control"
                onChange={(e) => setGlobalFilter(e.target.value)}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Books">Books</option>
                <option value="Pooja Samagri">Pooja Samagri</option>
                <option value="Gemstones">Gemstones</option>
                <option value="Yantras">Yantras</option>
                <option value="Idols frames">Idols frames</option>
              </select>
            </div>
            <input type="button" name="" className="inventedit" value="Apply" />
            <input type="button" name="" className="inventedit" value="Reset" />
          </div>
        </div>
      </div>

      <table className="table table-responsive table-striped table-hover table-bordered tbleorder">
        {table.getHeaderGroups().map((headerGroup) => (
          <thead>
            <th style={{ fontSize: '12px' }}>Sr. No.</th>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{ fontSize: '12px' }}
              >
                {header.isPlaceholder ? null : (
                  <span
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <img src={sortIcon} style={{ float: 'right' }} />,
                      desc: <img src={sortIcon} style={{ float: 'right' }} />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </span>
                )}
              </th>
            ))}
          </thead>
        ))}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr>
              <td> #0001</td>
              {row.getVisibleCells().map((cell, i) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* paginator */}
      <div className="paginator">
        <div className="paginator-left">
          <div className="form-group row m-0">
            <label htmlFor="staticEmail" className="col-form-label">
              Rows per page
            </label>
            <div className="col-sm-1">
              <select
                name="service"
                id="cars"
                className="form-control"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 9, 5, 4, 2].map((pageSize) => (
                  <option value={pageSize} key={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="paginator-right">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <Reactpaginate
                pageCount={table.getPageCount()}
                marginPagesDisplayed={2}
                pageRangeDisplayed={1}
                onPageChange={(data) => table.setPageIndex(data.selected)}
                containerClassName={'flex gap-4 mb-4 items-center'}
                pageClassName="page-item"
                activeClassName="active"
                activeLinkClassName="active"
                disabledClassName={'text-orange-300'}
                previousClassName="page-item"
                previousLabel={
                  <>
                    <i className="fa fa-long-arrow-left"></i> Prev
                  </>
                }
                nextClassName="page-item"
                nextLabel={
                  <>
                    Next <i className="fa fa-long-arrow-right"></i>
                  </>
                }
                className="pagination"
              />
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default InventoryBlocked;
