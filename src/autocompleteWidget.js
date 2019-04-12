require('jquery-ui/themes/base/core.css');
require('jquery-ui/themes/base/menu.css');
require('jquery-ui/themes/base/autocomplete.css');
require('jquery-ui/themes/base/theme.css');

let $ = require('jquery');
require('jquery-ui/ui/widgets/autocomplete');

export default {
    name: 'autocomplete',

    widgetIsLoaded() {
        return !!$.ui.autocomplete;
    },

    // Doesn't let you type unles this is here...
    render(question) {
    },

    isDefaultRender: true,

    isFit(question) {
        return !!question.autocomplete;
    },

    afterRender(question, el) {
        let $el = $(el).is('input') ? $(el) : $(el).find('input');

        $el.autocomplete({
            appendTo: $('.sv_main'),
            classes: {
                'ui-autocomplete': 'sv_q_text_root',
            },
            source: [
                'foo',
                'bar',
                'baz',
            ],
        });
    },

    willUnMount(question, el) {
        let $el = $(el).is('input') ? $(el) : $(el).find('input');

        $el.autocomplete('destroy');
    },
}
