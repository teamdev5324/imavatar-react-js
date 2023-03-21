import React from 'react';
import { useTable, Column, TableOptions } from 'react-table';
// import 'react-table/react-table.css';

interface InventoryData {
  category: string;
  product: string;
  image: any;
  hsn: string;
  partner_sku: string;
  quantity: number;
  unit_cost: number;
  price: number;
  restock: number;
  restricted_product: string;
}

const InventoryTable: React.FC<{ data: InventoryData[] }> = ({ data }) => {
  const handleEdit = (rowData: any) => {
    // Your logic to handle the edit button click event
    console.log(rowData);
  };
  const columns: Column<InventoryData>[] = React.useMemo(
    () => [
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Product Name',
        accessor: 'product',
      },
      {
        Header: 'Image',
        accessor: 'image',
        Cell: function (props: any) {
          const rowData = props.row.original;
          return <img src={rowData.image} className="img-fluid" />;
        },
      },
      {
        Header: 'HSN Code',
        accessor: 'hsn',
      },
      {
        Header: 'Partner SKU ID',
        accessor: 'partner_sku',
      },
      {
        Header: 'On-hand Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'On-hand Unit Cost',
        accessor: 'unit_cost',
      },
      {
        Header: 'Your Selling Price',
        accessor: 'price',
      },
      {
        Header: 'Restock Level',
        accessor: 'restock',
      },
      {
        Header: 'Action',
        Cell: () => (
          <td className="orgerns">
            <a href=""> Edit </a>
          </td>
        ),
      },
      {
        Header: 'Blocked Reason',
        accessor: 'restricted_product',
      },
    ],
    []
  );

  const tableOptions: TableOptions<InventoryData> = { columns, data };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(tableOptions);

  return (
    <table
      {...getTableProps()}
      className="table table-responsive table-striped table-hover table-bordered tbleorder"
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                  <td
                    {...cell.getCellProps()}
                    onClick={() => handleEdit(row.original)}
                    // capture onClick event here
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default InventoryTable;
