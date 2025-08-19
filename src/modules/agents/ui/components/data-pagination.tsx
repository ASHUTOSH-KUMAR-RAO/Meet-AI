import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";

// Constants
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 2;
export const MAXIMUM_PAGE_SIZE = 100;
export const MIN_PAGE_SIZE = 1;

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
  itemsPerPage?: number;
  totalItems?: number;
}

const DataPagination = ({ 
  page = DEFAULT_PAGE, 
  totalPages, 
  onPageChange,
  showFirstLast = true,
  showPageNumbers = true,
  maxVisiblePages = 5,
  itemsPerPage = DEFAULT_PAGE_SIZE,
  totalItems
}: Props) => {
  // Validation function for page size
  const validatePageSize = (size: number) => {
    return Math.min(Math.max(size, MIN_PAGE_SIZE), MAXIMUM_PAGE_SIZE);
  };

  // Safe page change with validation
  const handlePageChange = (newPage: number) => {
    const validatedPage = Math.min(Math.max(newPage, DEFAULT_PAGE), totalPages);
    onPageChange(validatedPage);
  };

  // Generate visible page numbers
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 2;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  // Calculate items info
  const getItemsInfo = () => {
    if (!itemsPerPage || !totalItems) return null;
    
    const validatedPageSize = validatePageSize(itemsPerPage);
    const startItem = (page - 1) * validatedPageSize + 1;
    const endItem = Math.min(page * validatedPageSize, totalItems);
    
    return { startItem, endItem, pageSize: validatedPageSize };
  };

  const itemsInfo = getItemsInfo();

  if (totalPages <= 1) {
    return (
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          {itemsInfo ? `Showing ${itemsInfo.startItem} to ${itemsInfo.endItem} of ${totalItems} entries` : "No pagination needed"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      {/* Items info */}
      <div className="text-sm text-muted-foreground order-2 sm:order-1">
        {itemsInfo ? (
          <>
            Showing <span className="font-medium text-foreground">{itemsInfo.startItem}</span> to{" "}
            <span className="font-medium text-foreground">{itemsInfo.endItem}</span> of{" "}
            <span className="font-medium text-foreground">{totalItems}</span> entries
          </>
        ) : (
          <>
            Page <span className="font-medium text-foreground">{page}</span> of{" "}
            <span className="font-medium text-foreground">{totalPages}</span>
          </>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-1 order-1 sm:order-2">
        {/* First page button */}
        {showFirstLast && (
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => onPageChange(1)}
            className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => handlePageChange(Math.max(DEFAULT_PAGE, page - 1))}
          className="h-8 px-3 hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        {/* Page numbers */}
        {showPageNumbers && (
          <div className="flex items-center space-x-1">
            {/* First page if not visible */}
            {showStartEllipsis && (
              <>
                <Button
                  variant={page === 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(DEFAULT_PAGE)}
                  className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  1
                </Button>
                <div className="flex items-center justify-center h-8 w-8">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
              </>
            )}

            {/* Visible page numbers */}
            {visiblePages.map((pageNum) => (
              <Button
                key={pageNum}
                variant={page === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(pageNum)}
                className={`h-8 w-8 p-0 transition-colors ${
                  page === pageNum 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
                aria-label={`Go to page ${pageNum}`}
                aria-current={page === pageNum ? "page" : undefined}
              >
                {pageNum}
              </Button>
            ))}

            {/* Last page if not visible */}
            {showEndEllipsis && (
              <>
                <div className="flex items-center justify-center h-8 w-8">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
                <Button
                  variant={page === totalPages ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(totalPages)}
                  className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>
        )}

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
          className="h-8 px-3 hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Go to next page"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>

        {/* Last page button */}
        {showFirstLast && (
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => handlePageChange(totalPages)}
            className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Go to last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default DataPagination;