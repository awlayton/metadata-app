// TODO: This is probably the wrong way to do stuff, but I don't know cerebral
// Want a singleton of survey model
import type { SurveyModel } from 'survey-react';

export default {
    model: null,
} as { model: SurveyModel | null };
