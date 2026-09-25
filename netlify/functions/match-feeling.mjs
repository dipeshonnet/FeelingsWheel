import { createMatcher } from '../../server/matcher.mjs';
import { saveSubmission } from '../../server/submissions.mjs';
export default createMatcher({ saveSubmission });
export const config = { rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ['ip', 'domain'] } };
