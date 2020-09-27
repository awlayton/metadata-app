import * as Survey from 'survey-react';

require('jquery-ui/themes/base/core.css');
require('jquery-ui/themes/base/menu.css');
require('jquery-ui/themes/base/autocomplete.css');
require('jquery-ui/themes/base/theme.css');

let $ = require('jquery');
require('jquery-ui/ui/widgets/autocomplete');

Survey.JsonObject.metaData.addProperty('question', {
    name: 'autocomplete',
    default: false,
});
Survey.JsonObject.metaData.addProperty('text', 'choices:itemvalues');
/* TODO: What is this??
Survey.JsonObject.metaData.addProperty('text', {
    name: 'choicesByUrl:restfull',
    className: 'ChoicesRestfull',
    onGetValue(obj) {
        return obj && obj.choicesByUrl && obj.choicesByUrl.getData();
    },
    onSetValue(obj, value) {
        if (!obj.choicesByUrl) {
            obj.choicesByUrl = new Survey.ChoicesRestfull();
        }
        obj.choicesByUrl.setData(value);
    },
});
*/

export const autocompleteWidget = {
    name: 'autocomplete',

    widgetIsLoaded() {
        return !!$.ui.autocomplete;
    },

    // Doesn't let you type unles this is here...
    render(question) {},

    isDefaultRender: true,

    isFit(question) {
        return !!question.autocomplete;
    },

    activatedByChanged(activatedBy) {
        if (Survey.JsonObject.metaData.findProperty('text', 'autofill')) {
            return;
        }
    },

    afterRender(question, el) {
        let $el = $(el).is('input') ? $(el) : $(el).find('input');

        $el.autocomplete({
            appendTo: $('.sv_main'),
            classes: {
                'ui-autocomplete': 'sv_q_text_root',
            },
            source: (question.choices || []).map((it) => it.text),
        });
    },

    willUnMount(question, el) {
        let $el = $(el).is('input') ? $(el) : $(el).find('input');

        $el.autocomplete('destroy');
    },
};

export default autocompleteWidget;
