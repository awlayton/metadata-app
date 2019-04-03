/* eslint import/no-webpack-loader-syntax: off */
import pages from '!import-glob!./pages-loader';

// Add a footer to each page
pages.forEach(page => page.elements.push({
    type: 'html',
    html: '* Indicates required field',
}));

export default pages;
