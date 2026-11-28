const buckets = globalThis.__portfolioRateLimitBuckets || new Map();
globalThis.__portfolioRateLimitBuckets = buckets;

export function getClientKey( req, scope ) {
  const forwarded = req.headers.get( 'x-forwarded-for' )?.split( ',' )[0]?.trim();
  const ip = forwarded || req.headers.get( 'x-real-ip' ) || 'unknown';
  return `${scope}:${ip}`;
}

export function consumeRateLimit( key, { limit, windowMs }, now = Date.now() ) {
  const current = buckets.get( key );
  if ( !current || current.resetAt <= now ) {
    const next = { count: 1, resetAt: now + windowMs };
    buckets.set( key, next );
    return { allowed: true, remaining: limit - 1, resetAt: next.resetAt };
  }

  current.count += 1;
  buckets.set( key, current );
  return { allowed: current.count <= limit, remaining: Math.max( 0, limit - current.count ), resetAt: current.resetAt };
}
