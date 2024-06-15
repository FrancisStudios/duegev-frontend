import { Box } from "@mui/system";
import { Article, ArticleLabels } from "../../type/article.type";
import { Tabs } from "@mui/base";
import { Button, Card, CardActions, CardContent, Step, StepButton, Stepper, Tab, Typography } from "@mui/material";
import React from "react";
import './text-editor.component.css';
import { DuegevTextEditorUtil } from "./text-editor.helper";

export type TextEditorProps = {
    edit?: Article,
    prefill?: TextEditorPrefill
}

type TextEditorPrefill = {
    title?: string,
    text?: string,
    game_date?: number,
    real_date?: string,
    author_id?: number,
    article_id?: string,
    labels?: Array<ArticleLabels>
}

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const TextEditor = (props: TextEditorProps) => {

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{ [k: number]: boolean; }>({});


    /**
     * Step Button handlers - helpers are in the 
     * text-editor.helper.tsx utility class -->
     */
    const handlers = {
        next: () => {
            const newActiveStep =
                DuegevTextEditorUtil.isLastStep(activeStep, steps) && !DuegevTextEditorUtil.allStepsCompleted(completed, steps)
                    ? steps.findIndex((step, i) => !(i in completed))
                    : activeStep + 1;
            setActiveStep(newActiveStep);
        },
        back: () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); },
        step: (step: number) => () => { setActiveStep(step); },
        complete: () => {
            const newCompleted = completed;
            newCompleted[activeStep] = true;
            setCompleted(newCompleted);
            handlers.next();
        },
        reset: () => { setActiveStep(0); setCompleted({}); }
    }

    /**
     * Sub compoents for the Text Editor
     * Steppers and Panels should be here
     */
    const TextEditorStepper = () => {
        return (
            <Box sx={{ width: '100%' }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handlers.step(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        );
    }

    const TextEditorStepperActions = () => {
        return (
            <div>
                {DuegevTextEditorUtil.allStepsCompleted(completed, steps) ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handlers.reset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                            Step {activeStep + 1}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handlers.back}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handlers.next} sx={{ mr: 1 }}>
                                Next
                            </Button>
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button onClick={handlers.complete}>
                                        {DuegevTextEditorUtil.completedSteps(completed) === DuegevTextEditorUtil.totalSteps(steps) - 1
                                            ? 'Finish'
                                            : 'Complete Step'}
                                    </Button>
                                ))}
                        </Box>
                    </React.Fragment>
                )}
            </div>
        );
    }

    /**
     * Main Component return is here
     * sub components are above bby :3
     */
    return (
        <Card id="duegev-text-editor" >
            <CardContent>
                {TextEditorStepper()}
            </CardContent>
            <CardActions>
                {TextEditorStepperActions()}
            </CardActions>
        </Card >
    );
}

export default TextEditor;