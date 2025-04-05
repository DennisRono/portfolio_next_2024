"use client"

import { usePathname, useSearchParams } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./ui/pagination"

interface QueryPaginationProps {
  totalPages: number
  className?: string
  showPageNumbers?: boolean
  maxPageButtons?: number
}

export function QueryPagination({
  totalPages,
  className,
  showPageNumbers = true,
  maxPageButtons = 5,
}: QueryPaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get("page")) || 1

  const prevPage = currentPage - 1
  const nextPage = currentPage + 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    if (totalPages <= maxPageButtons) {
      // If we have fewer pages than max buttons, show all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always show first and last page
    const pageNumbers = [1]

    // Calculate the start and end of the current window
    let startPage = Math.max(2, currentPage - Math.floor(maxPageButtons / 2))
    const endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 3)

    // Adjust if we're near the end
    if (endPage === totalPages - 1) {
      startPage = Math.max(2, endPage - (maxPageButtons - 3))
    }

    // Add ellipsis if needed
    if (startPage > 2) {
      pageNumbers.push(-1) // Use -1 to represent ellipsis
    }

    // Add the window of page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push(-2) // Use -2 to represent ellipsis
    }

    // Add the last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        {prevPage >= 1 ? (
          <PaginationItem>
            <PaginationPrevious href={createPageURL(prevPage)} />
          </PaginationItem>
        ) : null}

        {showPageNumbers &&
          getPageNumbers().map((pageNum, index) => {
            if (pageNum < 0) {
              // This is an ellipsis
              return (
                <PaginationItem key={`ellipsis-${pageNum}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem className="hidden sm:inline-block" key={`page-button-${pageNum}`}>
                <PaginationLink isActive={currentPage === pageNum} href={createPageURL(pageNum)}>
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            )
          })}

        {nextPage <= totalPages ? (
          <PaginationItem>
            <PaginationNext href={createPageURL(nextPage)} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  )
}

