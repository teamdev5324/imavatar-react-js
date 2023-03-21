import React from 'react';
import Reactpaginate from 'react-paginate';

type PaginatorProps = {
  pageOptions: any;
  gotoPage: any;
};

const Paginator: React.FC<PaginatorProps> = ({ pageOptions, gotoPage }) => {
  return (
    <Reactpaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      pageCount={pageOptions.length}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      onPageChange={(data) => gotoPage(data.selected)}
      containerClassName={'flex gap-4 mb-4 items-center'}
      pageClassName={
        'w-8 h-8 text-center flex items-center justify-center rounded-full cursor-pointer'
      }
      pageLinkClassName={
        'w-8 h-8 text-center flex items-center justify-center rounded-full cursor-pointer'
      }
      activeClassName={'text-active border text-orange-500 border-orange-400'}
      activeLinkClassName={'text-orange-500 text-active'}
      nextClassName={'text-orange-500'}
      previousClassName={'text-orange-500'}
      disabledClassName={'text-orange-300'}
    />
  );
};

export default Paginator;
