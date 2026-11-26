import prismadb from '@/server/db';
import { transparentPixelResponse } from '@/server/http';
import { withTimeout } from '@/server/utils';

const objectIdPattern = /^[a-f\d]{24}$/i;

export async function GET( _req, { params } ) {
  try {
    const { id, replyId } = await params;
    if ( objectIdPattern.test( id || '' ) && objectIdPattern.test( replyId || '' ) ) {
      await withTimeout( prismadb.contactReply.updateMany( { where: { id: replyId, contactId: id }, data: { openedAt: new Date() } } ), 1500 );
    }
  } catch {
    // Tracking pixels are best-effort and always return an image.
  }
  return transparentPixelResponse();
}
