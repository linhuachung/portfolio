export function extractPlainTextFromHTML( html ) {
  if ( !html ) {return '';}

  let text = html.replace( /<p[^>]*>\s*<br\s*\/?>\s*<\/p>/gi, '\n\n' );
  text = text.replace( /<\/p>/gi, '\n' );
  text = text.replace( /<p[^>]*>/gi, '' );
  text = text.replace( /<br\s*\/?>/gi, '\n' );
  text = text.replace( /<[^>]*>/g, '' );
  text = text
    .replace( /&nbsp;/g, ' ' )
    .replace( /&amp;/g, '&' )
    .replace( /&lt;/g, '<' )
    .replace( /&gt;/g, '>' )
    .replace( /&quot;/g, '"' )
    .replace( /&#39;/g, '\'' );
  text = text.replace( /\n{3,}/g, '\n\n' );
  return text.trim();
}
