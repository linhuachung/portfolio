import prismadb from '@/lib/prisma';
import { transparentPixelResponse } from '@/lib/transparent-pixel';
import { withTimeout } from '@/lib/promise-timeout';

const objectIdPattern = /^[a-f\d]{24}$/i;

export async function GET( _req, { params } ) {
  try {
    const { id } = await params;
    if ( objectIdPattern.test( id || '' ) ) {
      await withTimeout( prismadb.contact.update( { where: { id }, data: { emailOpenedAt: new Date() } } ), 1500 );
    }
  } catch {
    // Tracking pixels are best-effort and always return an image.
  }
  return transparentPixelResponse();
}
