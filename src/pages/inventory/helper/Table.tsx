import React from 'react';
import { useTable, useGlobalFilter, Column } from 'react-table';

/**
 * There's some boilter plate here
 * Important part is useTable function
 * we add the useGlobalFilter hook
 * then we also add an input which has
 * onChange={handleFilterInputChange}
 * */

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

export function Table<T extends { id: string }>({
  columns,
  data,
}: TableProps<T>): React.ReactElement {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    // setGlobalFilter,
    prepareRow,
  } = useTable<T>(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    // setGlobalFilter(value);
  };

  return (
    <>
      <input placeholder="Filter" onChange={handleFilterInputChange} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
