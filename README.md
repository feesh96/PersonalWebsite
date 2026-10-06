# Matt Fishman personal website

The current site is a static homepage in `dist/personalWebsite`. It includes an introduction, selected work, interests, contact links, and seven playable beats. The older Angular source remains in `src/` for reference.

Preview locally with `python3 -m http.server 4173 -d dist/personalWebsite`, then open `http://127.0.0.1:4173/`. There is no build step. Fonts load from Google Fonts, with system font fallbacks.

Pushes to `master` deploy `dist/personalWebsite` to the existing `mattfishman.com` S3 bucket. The workflow updates the homepage cache metadata and attempts a CloudFront invalidation when the AWS credentials allow distribution lookup. It does not delete unrelated S3 objects.

The portrait came from Matt's public GitHub profile. Project visuals are CSS illustrations until project screenshots and links are selected. Music files and contact links came from the earlier site.
