import debug from 'debug';

import * as Survey from 'survey-react';

import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.min.css';

import './select2.scss';

let info = debug('contxt:tagbox');

export const tagboxWidget = {
    name: 'tagbox',
    title: 'Tag box',
    iconName: 'icon-tagbox',
    widgetIsLoaded: function () {
        return typeof $ == 'function' && !!$.fn.select2;
    },
    defaultJSON: {
        choices: ['Item 1', 'Item 2', 'Item 3'],
    },
    htmlTemplate: '<select multiple="multiple" style="width: 100%;"></select>',
    isFit: function (question) {
        return question.getType() === 'tagbox';
    },
    activatedByChanged: function (activatedBy) {
        Survey.JsonObject.metaData.addClass(
            'tagbox',
            [
                {
                    name: 'hasOther',
                    visible: false,
                },
            ],
            null,
            'checkbox'
        );
        Survey.JsonObject.metaData.addProperty('tagbox', {
            name: 'select2Config',
            default: null,
        });
        Survey.JsonObject.metaData.addProperty('tagbox', {
            name: 'placeHolder',
            default: null,
        });
        Survey.matrixDropdownColumnTypes.tagbox = {
            properties: [
                'choices',
                'choicesOrder',
                'choicesByUrl',
                'optionsCaption',
                'otherText',
                'choicesVisibleIf',
            ],
        };
    },
    fixStyles: function (el) {
        let e = el.parentElement.querySelector('.select2-search__field');
        if (e) {
            e.style.border = 'none';
        }
    },
    afterRender: function (question, el) {
        var self = this;
        var settings = {
            tags: true,
            disabled: question.isReadOnly,
            placeholder: question.placeHolder,
            theme: 'material',
            tokenSeparators: [','],
            ...question.select2Config,
        };
        var $el = $(el).is('select') ? $(el) : $(el).find('select');
        $el.select2(settings);

        self.fixStyles(el);

        var updateValueHandler = function () {
            (question.value || []).forEach((it) => {
                if ($el.find(`option[value="${it}"]`).length === 0) {
                    let option = new Option(it, it, true, true);
                    $el.append(option).trigger('change');
                }
            });
            $el.val(question.value).trigger('change');
            self.fixStyles(el);
        };
        var updateChoices = function () {
            $el.select2().empty();

            if (settings.ajax) {
                $el.select2(settings);
            } else {
                settings.data = question.visibleChoices.map(function (choice) {
                    return {
                        id: choice.value,
                        text: choice.text,
                    };
                });
                $el.select2(settings);
            }

            updateValueHandler();
        };

        question.readOnlyChangedCallback = function () {
            $el.prop('disabled', question.isReadOnly);
        };
        question.registerFunctionOnPropertyValueChanged(
            'visibleChoices',
            function () {
                updateChoices();
            }
        );
        question.valueChangedCallback = updateValueHandler;
        let setValue = function (e) {
            info('setValue %o', e);

            let val = $el.select2('data').map((it) => it.id);
            val.forEach((val) => {
                // Add choice if it does not exist
                if (!question.choices.some((choice) => choice.value === val)) {
                    let choice = new Survey.ItemValue(e.params.data.id);
                    question.choices.push(choice);
                }
            });

            question.value = val;
        };
        $el.on('select2:select', setValue);
        $el.on('select2:unselect', setValue);
        updateChoices();
    },
    willUnmount: function (question, el) {
        $(el).find('select').off('select2:select').select2('destroy');
        question.readOnlyChangedCallback = null;
    },
};

export default tagboxWidget;
