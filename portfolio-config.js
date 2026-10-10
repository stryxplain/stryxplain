/* ==========================================================================
   stryXplain — PORTFOLIO CONFIGURATION
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to add, replace or remove projects.

   HOW TO ADD A REAL PROJECT
   1. Copy one block { ... }, from the opening brace to the closing "},".
   2. Change `placeholder` to false.
   3. Fill in the fields below. Leave unused fields as "" (empty).

   FIELDS
   id         Unique short name, e.g. "my-anime-recap-1" (letters, numbers, dashes).
   title      Project title shown on the card (your own words, not translated).
   category   One of: "anime", "manga", "manhwa", "english", "thumbnails"
   youtubeId  The 11-character ID from a YouTube link.
              https://www.youtube.com/watch?v=ABCDEFGHIJK  ->  "ABCDEFGHIJK"
              The video only loads when a visitor clicks play (lazy loaded).
   youtubeUrl Optional link to open the video on YouTube. If you set youtubeId and
              leave this empty, the link is built automatically.
   videoSrc   Optional uploaded video sample, e.g. "my-sample.mp4"
              (upload the file next to index.html). Use MP4 (H.264).
              Keep files small (ideally under 25 MB) so the site stays fast.
              If both youtubeId and videoSrc are set, YouTube is used.
   thumbnail  Image for the card, e.g. "my-sample.jpg"
              (upload the file next to index.html), or a full https:// link.
              Recommended: 1280 x 720 JPG or WebP, under 200 KB.
              If empty and youtubeId is set, YouTube's own thumbnail is used.
   thumbAlt   Optional description of the image for screen readers.
   placeholder true = shows a "Demo placeholder" label (NOT real client work).
               false = real project (no label).

   HOW TO REMOVE A PROJECT: delete its whole { ... }, block.

   The demo placeholders below are layout examples only. They are not real client
   work. Delete them once you have your own projects. If you delete every project in
   a category, that filter shows a tidy "nothing here yet" message automatically.
   ========================================================================== */

window.STRYX_PORTFOLIO = [
  {
    id: "demo-anime",
    title: "Anime Recap — sample slot",
    category: "anime",
    youtubeId: "",
    youtubeUrl: "",
    videoSrc: "",
    thumbnail: "",
    thumbAlt: "",
    placeholder: true,
  },
  {
    id: "demo-manga",
    title: "Manga Recap — sample slot",
    category: "manga",
    youtubeId: "",
    youtubeUrl: "",
    videoSrc: "",
    thumbnail: "",
    thumbAlt: "",
    placeholder: true,
  },
  {
    id: "demo-manhwa",
    title: "Manhwa Recap — sample slot",
    category: "manhwa",
    youtubeId: "",
    youtubeUrl: "",
    videoSrc: "",
    thumbnail: "",
    thumbAlt: "",
    placeholder: true,
  },
  {
    id: "demo-english",
    title: "English + Subtitles — sample slot",
    category: "english",
    youtubeId: "",
    youtubeUrl: "",
    videoSrc: "",
    thumbnail: "",
    thumbAlt: "",
    placeholder: true,
  },
  {
    id: "demo-thumbnails",
    title: "Thumbnail Design — sample slot",
    category: "thumbnails",
    youtubeId: "",
    youtubeUrl: "",
    videoSrc: "",
    thumbnail: "",
    thumbAlt: "",
    placeholder: true,
  },

  /* ---- EXAMPLE of a real project. To use it, delete the comment markers around it ----
  {
    id: "my-first-manhwa-recap",
    title: "Your real video title here",
    category: "manhwa",
    youtubeId: "ABCDEFGHIJK",
    youtubeUrl: "",
    videoSrc: "",
    thumbnail: "",
    thumbAlt: "",
    placeholder: false,
  },
  ---- end of example ---- */
];
