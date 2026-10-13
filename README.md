# Matt Fishman personal website

The current site is a static homepage in `dist/personalWebsite`. It includes an introduction, selected work, interests, contact links, and seven playable beats. The older Angular source remains in `src/` for reference.

Preview locally with `python3 -m http.server 4173 -d dist/personalWebsite`, then open `http://127.0.0.1:4173/`. There is no build step. Fonts load from Google Fonts, with system font fallbacks.

Pushes to `master` deploy `dist/personalWebsite` to the existing `mattfishman.com` S3 bucket. The workflow versions CSS and JavaScript URLs by content hash, updates the homepage cache metadata, and attempts a CloudFront invalidation when the AWS credentials allow distribution lookup. Versioned URLs let returning visitors receive changed scripts and styles without relying on invalidation permissions. It does not delete unrelated S3 objects.

The studio portrait was supplied by Matt. About and selected-work copy highlights LinkedIn Creator Analytics, Creator Monetization, and Capital One Android account opening. Project visuals are decorative CSS illustrations. Music files and contact links came from the earlier site.

The beat archive starts with Be Alright, My World, and One and Only. Beyond the screen opens My Favorite Albums, My Favorite Podcasts, and My Favorite Movies. Albums include Donuts, Love Deluxe, My Beautiful Dark Twisted Fantasy, and Spotify’s This Is KAYTRANADA / This Is Chris Lake best-of playlists. Podcasts show stable show overview cards with cover art, descriptions, and Spotify links. Movie cards include posters, years, directors, and IMDb links.

Spotify’s iframe API and the native beat player share a playback state machine in `dist/personalWebsite/playback-state.js`. Starting one player pauses its predecessor. Switching categories or closing the dialog pauses Spotify while preserving playback position. The coordinator handles buffering, delayed events, and hidden-player starts. The deployment workflow runs nine playback tests before upload and versions both the coordinator and main frontend assets.

Run tests with `PLAYBACK_MODULE=../dist/personalWebsite/playback-state.js node --test tests/playback-state.test.cjs`. The older Angular source remains unchanged.
