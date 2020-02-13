import { TPage } from '../types/types';

export default function(pages: TPage[]): TPage[] {
  return pages
    .filter(page => page.relativeDir === 'posts')
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      if (dateA > dateB) {
        return -1;
      }
      if (dateA < dateB) {
        return 1;
      }
      return 0;
    });
}
