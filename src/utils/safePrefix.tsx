import { withPrefix } from 'gatsby';

export default function(url: string): string {
  if (url.match(/^#/) || url.match(/^http/)) {
    return url;
  }
  return withPrefix(url);
}
