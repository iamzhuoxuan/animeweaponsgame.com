// Lightweight live stub: we are not using Sanity Live content streaming in this build.
// Fallback to normal client fetch to avoid bundling the deprecated live package.
import { client } from './client';

export const sanityFetch = client.fetch.bind(client);
export const SanityLive = () => null;
