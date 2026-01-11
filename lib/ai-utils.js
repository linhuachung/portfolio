export function cleanMarkdownCodeBlocks( text ) {
  if ( !text ) {
    return '';
  }
  return text
    .replace( /^```html\s*/i, '' )
    .replace( /^```\s*/i, '' )
    .replace( /\s*```\s*$/i, '' )
    .trim();
}
