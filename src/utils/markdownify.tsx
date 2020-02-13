import marked from 'marked';

import htmlToReact from './htmlToReact';

export default function(markdown: string): React.ReactNode {
  if (!markdown) {
    return null;
  }
  return htmlToReact(marked(markdown));
}
