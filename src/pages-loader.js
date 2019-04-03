import pages from './pages/**/*.js';

// Load the default export of all pages
export default pages.map(page => page.default);
