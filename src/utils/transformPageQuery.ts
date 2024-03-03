/**
 * 현재 보여지는 페이지를 서버에 요청하는 페이지로 변경합니다
 * @param currnetPage 현재 보여지는 페이지
 * @return requestPage 실제로 서버에 요청되는 페이지
 */
export function transformPageQuery(currnetShowPage: number) {
  if (currnetShowPage === 0) return 0;
  return currnetShowPage - 1;
}
