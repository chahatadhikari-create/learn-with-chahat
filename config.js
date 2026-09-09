/**
 * Google Form setup
 * -----------------
 * 1. Create a form at https://forms.google.com
 * 2. In form settings → Presentation:
 *    - Theme: Header #243966 · Background #ffffff
 *    - Turn OFF “Show form title” and “Show form description” (the site has its own header)
 *    - Remove per-question help text (?) if icons overlap question labels
 * 3. Click Send → embed icon (</>) → copy the iframe src URL
 * 4. Paste it below (any share or embed URL works — it is normalized automatically)
 */
const PORTFOLIO_CONFIG = {
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdiD0C0XdfEqOpX6esRksTF2YQd6giUNAATrCtIxz5T4qezEw/viewform?usp=sharing&ouid=102903142893977698153',

  // GitHub Pages (project site: https://<user>.github.io/learn-with-chahat/)
  githubRepoName: 'learn-with-chahat',
  basePath: '', // leave empty to auto-detect, or set e.g. '/learn-with-chahat'

  // Pixels to hide Google’s built-in title bar (lower this if you turn off
  // “Show form title” in Google Forms → Settings → Presentation)
  formEmbedHeaderOffset: 128,

  // Optional: pre-select language when user clicks a service card CTA
  formPrefill: {
    spanish: '',
    english: '',
  },
};
