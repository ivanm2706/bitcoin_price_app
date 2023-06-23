
export const updateVisiblePages = (currentPage: number, totalPages: number, maxPages: number = 5) => {
  const visiblePages = [];

  if (totalPages <= maxPages) {
    for (let i = 0; i < totalPages; i++) {
      visiblePages.push(i + 1);
    }
  } else {
    const halfDisplayed = Math.floor(maxPages / 2);

    let startPage = Math.max(1, currentPage - halfDisplayed);
    let endPage = startPage + maxPages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    if (startPage > 1) {
      if (startPage > 2) {
        visiblePages.unshift(-1);
      }

      visiblePages.unshift(1);
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        visiblePages.push(-2);
      }

      visiblePages.push(totalPages);
    }
  }

  return visiblePages;
};