import { Parser } from 'html-to-react';
import React from 'react';

export default function(html?: string): React.ReactNode {
  if (!html) {
    return null;
  }
  const htmlToReactParser = new Parser();
  return htmlToReactParser.parse(html);
}
