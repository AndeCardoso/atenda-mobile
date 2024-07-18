export const reducePages = (pages: any) => {
  if (!pages) return [];

  if (pages.length > 1) {
    const reducedPages = pages.reduce((pageAcc: any[], pageCur: any) => {
      return pageAcc.concat(pageCur?.dataList);
    }, []);
    return reducedPages.filter((item: any) => item);
  }

  return pages[0]?.dataList ?? [];
};
