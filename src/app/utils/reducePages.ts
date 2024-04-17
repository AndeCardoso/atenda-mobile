export const reducePages = (pages: any) => {
  if (!pages) return [];

  if (pages.length > 1) {
    return pages.reduce(
      (acc: { dataList: string | any[] }, cur: { dataList: any }) => {
        return acc.dataList.concat(cur.dataList);
      }
    );
  }

  return pages[0].dataList;
};
