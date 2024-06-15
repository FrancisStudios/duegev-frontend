/**
 * Yes, this is an utility class, but I refuse to put it into /util/ cuz' 
 * this belongs solely to the Duegev Text Edtior, and the main part is 
 * needed for the stepper logic. Thanks for ye understanding m8.
 */

export class DuegevTextEditorUtil {

    public static totalSteps = (steps: Array<string>) => {
        return steps.length;
    };

    public static completedSteps = (completed: { [k: number]: boolean; }) => {
        return Object.keys(completed).length;
    };

    public static isLastStep = (activeStep: number, steps: Array<string>) => {
        return activeStep === DuegevTextEditorUtil.totalSteps(steps) - 1;
    };

    public static allStepsCompleted = (completed: { [k: number]: boolean; }, steps: Array<string>) => {
        return DuegevTextEditorUtil.completedSteps(completed) === DuegevTextEditorUtil.totalSteps(steps);
    };
}