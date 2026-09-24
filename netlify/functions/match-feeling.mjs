import { createMatcher } from '../../server/matcher.mjs';
export default createMatcher();
export const config = { rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ['ip', 'domain'] } };
