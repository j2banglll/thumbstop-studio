# Thumbstop Studio

A one-page portfolio site for a short-form video-ad editor who works with e-commerce brands.
Plain HTML, CSS and JavaScript: no build step and no server, so it runs on GitHub Pages as is.

## Files

| File | What it is |
| --- | --- |
| `index.html` | All the words and sections. Look for the `<!-- ... -->` notes. |
| `styles.css` | Colors, fonts, layout. Brand colors are at the very top. |
| `script.js` | Mobile menu, fade-in on scroll, and the video popup. |
| `favicon.svg` | The little icon in the browser tab. |
| `assets/videos/` | Put your own portfolio clips (`.mp4`) and poster images here. |

## Preview it on your computer

From this folder, run:

```bash
python -m http.server 5173
```

Then open http://localhost:5173 in your browser. Press `Ctrl+C` in the terminal to stop it.

## Things to change before you share it

1. **Email**: in `index.html`, search for `hello@example.com` and replace it with your email.
2. **Social links**: search for `instagram.com/`, `tiktok.com/` and so on, and add your handle (e.g. `https://www.tiktok.com/@yourname`). Delete any you don't use.
3. **Prices**: in the Pricing section. They're starting suggestions in USD.
4. **Your videos**: see below.
5. **Testimonials**: when you have real client quotes, follow the note above the `#results` section to switch it on. Don't publish made-up reviews.

## Adding your videos

Each card in the "Selected work" section is a `<button class="reel">`. Fill in one of these:

- **A YouTube Short or video**: `data-youtube="VIDEO_ID"` (the part after `shorts/` or `v=` in the link).
- **Your own file**: copy it to `assets/videos/` and set `data-video="assets/videos/my-ad.mp4"`.
- **Thumbnail (optional)**: `data-poster="assets/videos/my-ad.jpg"`.

Also change the tag (e.g. "UGC ad") and the title. Keep each `.mp4` under about 20 MB (GitHub rejects files over 100 MB),
and only post client work you have permission to show.

To make a small web-friendly copy with FFmpeg:

```bash
ffmpeg -i input.mp4 -vf "scale=720:-2" -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 96k -movflags +faststart assets/videos/my-ad.mp4
```

## Why the page is laid out this way

The page follows the path a brand owner takes when deciding whether to hire someone:

1. **Hook**: the headline talks about their result (ads that sell), not about you.
2. **Problem**: names the pain they already feel (skipped ads, no testing, ad fatigue), so they think "that's me".
3. **Proof**: the work grid. Real ads beat any claim.
4. **Offer**: concrete deliverables (3 hooks per ad, every size) make the value easy to picture.
5. **Process**: shows exactly what happens next, which removes uncertainty.
6. **Pricing anchor**: the middle plan is highlighted, and the bigger plan makes it look reasonable.
7. **Risk reversal**: the free test edit means trying you costs nothing.
8. **FAQ**: answers the objections that stop people from emailing.
9. **One action**: every button leads to the same next step, "Get a free test edit".

## Publishing on GitHub Pages

Every time you push changes to the `main` branch, the live site updates within a minute or two.

```bash
git add .
git commit -m "Describe what you changed"
git push
```
