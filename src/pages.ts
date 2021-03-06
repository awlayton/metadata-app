/* eslint import/no-webpack-loader-syntax: off */
import pages from '!import-glob!./pages-loader';

pages.forEach((page) => {
    // Add a footer to each page
    page.elements.push(
        {
            name: `notes-${page.name}`,
            // @ts-ignore
            title: `${page.title} notes or comments`,
            type: 'comment',
        },
        {
            type: 'html',
            html: '* Indicates required field',
        }
    );
});

export default pages;
