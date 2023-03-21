// import { header } from "next/dist/lib/load-custom-routes";
import { ColumnDef } from '@tanstack/react-table';

type Inventory = {
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
};

export const INVENTORY_COLUMNS: ColumnDef<Inventory>[] = [
  {
    header: 'Category',
    accessorKey: 'category',
  },
  {
    header: 'Product Name',
    accessorKey: 'product',
  },
  {
    header: 'Image',
    accessorKey: 'image',
    cell: function (props: any) {
      const rowData = props.row.original;
      return <img src={rowData.image} className="img-fluid" />;
    },
  },
  {
    header: 'HSN Code',
    accessorKey: 'hsn',
  },
  {
    header: 'Partner SKU ID',
    accessorKey: 'partner_sku',
  },
  {
    header: 'On-hand Quantity',
    accessorKey: 'quantity',
  },
  {
    header: 'On-hand Unit Cost',
    accessorKey: 'unit_cost',
  },
  {
    header: 'Your Selling Price',
    accessorKey: 'price',
  },
  {
    header: 'Restock Level',
    accessorKey: 'restock',
  },
  {
    header: 'Action',
    cell: () => (
      <td
        className="orgerns"
        style={{ border: 'none' }}
        // onClick={() => handle}
      >
        <a href="#"> Edit </a>
      </td>
    ),
  },
  {
    header: 'Blocked Reason',
    accessorKey: 'restricted_product',
  },
];
