/* ==========================================================================
   stryXplain — SITE CONFIGURATION
   --------------------------------------------------------------------------
   Edit this file to change your contact details, services and prices.
   You do NOT need to touch index.html or app.js for these changes.

   After editing, save the file and refresh the page (or re-upload to GitHub).
   ========================================================================== */

/* ---------- 1. Brand + contact details ---------- */
window.STRYX_SITE = {
  brand: "stryXplain",

  // WhatsApp number: country code + number, digits only (no +, spaces or dashes).
  whatsappNumber: "919339573623",
  whatsappDisplay: "+91 9339573623",

  instagramHandle: "@StryXplain",
  instagramUrl: "https://www.instagram.com/StryXplain/",

  email: "hasmiimranr@gmail.com",

  // Message used by general "Hire Me" / "Discuss Your Project" buttons.
  defaultMessage:
    "Hello stryXplain! I would like to discuss a video editing project. Please share your services and pricing details.",

  // Message used when a client picks a specific service. `name` is the English service name.
  serviceMessage: function (name) {
    return (
      "Hello stryXplain! I am interested in your " +
      name +
      " service. Please share more details about pricing and the project requirements."
    );
  },
};

/* ---------- 2. Services ----------
   id    : used for translations (keys "svc.<id>.title" and "svc.<id>.desc")
   name  : English name, used inside WhatsApp messages
   icon  : icon name defined in app.js (clapperboard, book, layers, captions, image, sparkles)
*/
window.STRYX_SERVICES = [
  { id: "anime", name: "Anime Recap Editing", icon: "clapperboard" },
  { id: "manga", name: "Manga Recap Editing", icon: "book" },
  { id: "manhwa", name: "Manhwa Recap Editing", icon: "layers" },
  { id: "english", name: "English Videos with Subtitles", icon: "captions" },
  { id: "thumbnail", name: "YouTube Thumbnail Design", icon: "image" },
  { id: "custom", name: "Custom Editing Projects", icon: "sparkles" },
];

/* ---------- 3. Pricing (INR, starting rates) ----------
   To change a price, edit the `price` number only.
   unit: "minute" = per finished video HOUR (internal name kept as "minute"; only the text below is shown to visitors)
         "thumbs" = for 3 different thumbnail designs for one video
   waName: English name used in the WhatsApp quote message.
*/
window.STRYX_PRICING = {
  currency: "₹",
  groups: [
    {
      id: "hinglish",
      items: [
        { id: "hAnime", waName: "Anime Recap Editing (Hindi / Hinglish)", price: 300, unit: "hours" },
        
        { id: "hManhwa", waName: "Manhwa Recap Editing (Hindi / Hinglish)", price: 320, unit: "hours" },
      ],
    },
    {
      id: "english",
      items: [
        { id: "eAnime", waName: "Anime Editing + Subtitles (English)", price: 450, unit: "minute" },
        { id: "eMangaManhwa", waName: "Manga and Manhwa Editing + Subtitles (English)", price: 475, unit: "minute" },
      ],
    },
    {
      id: "thumbs",
      items: [
        { id: "thumb", waName: "YouTube Thumbnail Design (3 different designs for one video)", price: 39, unit: "thumbs" },
      ],
    },
  ],
  // English text of each unit, used only inside WhatsApp messages.
  unitEnglish: {
    minute: "per finished video hour",
    thumbs: "for 3 different thumbnail designs for one video",
  },
  customQuoteMessage:
    "Hello stryXplain! I would like a custom quote for a project that does not fit the listed services. Please share more details about pricing and the project requirements.",
};
