import React from 'react';
import ReactPaginate from 'react-paginate';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startOffset: 0,
      endOffset: 0,
    };
  }

  handlePageClick(event) {
    const page = event.selected + 1;
    const { itemsPerPage, clickPageAction, totalEntries } =
      this.props;
    const { startOffset, endOffset } = this.calculatePagination(
      totalEntries,
      itemsPerPage,
      page
    );
    this.setState({
      startOffset,
      endOffset,
    });
    clickPageAction(event.selected + 1, itemsPerPage);
  }

  componentDidMount() {
    const { itemsPerPage, totalEntries } = this.props;
    const { startOffset, endOffset } = this.calculatePagination(
      totalEntries,
      itemsPerPage
    );
    this.setState({
      startOffset,
      endOffset,
    });
  }

  calculatePagination(totalEntries, itemsPerPage, page = 1) {
    let endOffset = 0;
    const startOffset = (page - 1) * itemsPerPage + 1;

    if (itemsPerPage > totalEntries) {
      endOffset = totalEntries;
    } else {
      endOffset =
        itemsPerPage * page > totalEntries
          ? totalEntries
          : itemsPerPage * page;
    }
    return { startOffset, endOffset };
  }

  render() {
    const { pageCount, totalEntries } = this.props;
    const { startOffset, endOffset } = this.state;
    return (
      <>
        {totalEntries !== 0 && (
          <nav
            className="flex items-center justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {`${startOffset}-${endOffset}`}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalEntries}
              </span>
            </span>
            <ReactPaginate
              breakLabel="..."
              nextLabel={
                <FontAwesomeIcon
                  className="w-4 h-4"
                  icon={faChevronRight}
                />
              }
              onPageChange={(e) => this.handlePageClick(e)}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel={
                <FontAwesomeIcon
                  className="w-4 h-4"
                  icon={faChevronLeft}
                />
              }
              renderOnZeroPageCount={null}
              breakClassName={
                'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
              }
              containerClassName={
                'inline-flex items-center -space-x-px'
              }
              pageClassName={
                'px-3 py-2 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100'
              }
              previousClassName={
                'block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700'
              }
              nextClassName={
                'block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'
              }
              activeClassName={
                'z-10 px-3 py-2 leading-tight bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white text-white'
              }
              activeLinkClassName={''}
            />
          </nav>
        )}
      </>
    );
  }
}

export default Pagination;
