import test from 'node:test';
import assert from 'node:assert/strict';
import { createS3SignedRequest } from '../src/features/uploads/server/s3-upload.js';

test( 'S3 request signing is deterministic and does not expose the secret', () => {
  const request = createS3SignedRequest( {
    buffer: Buffer.from( 'portfolio' ),
    bucketName: 'example-bucket',
    key: 'resume/My CV.pdf',
    region: 'ap-southeast-1',
    accessKeyId: 'ACCESS123',
    secretAccessKey: 'never-expose-this-secret',
    contentType: 'application/pdf',
    now: new Date( '2026-10-26T01:02:03.000Z' )
  } );

  assert.equal( request.url, 'https://example-bucket.s3.ap-southeast-1.amazonaws.com/resume/My%20CV.pdf' );
  assert.match( request.headers.Authorization, /^AWS4-HMAC-SHA256 Credential=ACCESS123\/20261026\/ap-southeast-1\/s3\/aws4_request/ );
  assert.equal( request.headers['x-amz-date'], '20261026T010203Z' );
  assert.equal( request.headers.Authorization.includes( 'never-expose-this-secret' ), false );
} );
