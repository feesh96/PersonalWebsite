# Matt Fishman personal website

The current site is a static homepage in `dist/personalWebsite`. It includes an introduction, selected work, interests, contact links, and seven playable beats. The older Angular source remains in `src/` for reference.

Preview locally with `python3 -m http.server 4173 -d dist/personalWebsite`, then open `http://127.0.0.1:4173/`. There is no build step. Fonts load from Google Fonts, with system font fallbacks.

Pushes to `master` deploy `dist/personalWebsite` to the existing `mattfishman.com` S3 bucket. The workflow updates the homepage cache metadata and attempts a CloudFront invalidation when the AWS credentials allow distribution lookup. It does not delete unrelated S3 objects.

The studio portrait was supplied by Matt. About and selected-work copy highlights LinkedIn Creator Analytics, Creator Monetization, and Capital One Android account opening. Project visuals are decorative CSS illustrations. Music files and contact links came from the earlier site.

The beat archive starts with Be Alright, My World, and One and Only. Beyond the screen opens Music, Podcasts, and Movies in a keyboard-accessible dialog. Music begins with J Dilla’s Donuts album. Music and podcast entries include Spotify embeds and direct links; inactive players unload when switching categories or closing the dialog. Movies include local posters, release years, director credits, and IMDb links. Poster sources are recorded in `dist/personalWebsite/assets/movies/sources.json`.
