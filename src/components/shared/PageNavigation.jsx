/*eslint-disable */

import React from "react";
import { getPageArray } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PageNavigation = ({ totalPage, searchParams, onSearchParams }) => {
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const pageArray = getPageArray(currentPage, totalPage);

  const handlePage = (value) => {
    onSearchParams((prevParams) => {
      if (value === 1) {
        prevParams.delete("page");
      } else {
        prevParams.set("page", value);
      }

      return prevParams;
    });
  };

  return (
    <Pagination className="justify-start dark:text-slate-50">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            onClick={() => handlePage(currentPage - 1)}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
        {pageArray.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              onClick={() => handlePage(item)}
              isActive={item === currentPage}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage >= totalPage}
            tabIndex={currentPage >= totalPage ? -1 : undefined}
            onClick={() => handlePage(currentPage + 1)}
            className={
              currentPage >= totalPage
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PageNavigation;
