import React from "react";
import './text-editor.component.css';
import { Box, border } from "@mui/system";
import { Article, ArticleLabels } from "../../type/article.type";
import { Button, Card, CardActions, CardContent, Step, StepButton, Stepper, TextField, Typography } from "@mui/material";
import { DuegevTextEditorUtil } from "./text-editor.helper";
import getString from "../../util/language-server.util";
import Post from "../post/post.component";
import OptionSelectCustom from "../atomic-components/option-select/option-select.component";


export type TextEditorProps = {
    prefill?: TextEditorPrefill | Article
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

const steps: Array<string> = [getString('METADATA_TE') as string, getString('ARTICLE_TEXT_TE') as string, getString('PREVIEW_TE') as string];

const TextEditor = (props: TextEditorProps) => {

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{ [k: number]: boolean; }>({});
    const [article, setArticle] = React.useState<Article>(
        {
            title: '',
            text: 'Blin blinochki sdfsfsdfsdfsdfsdsdf sdf dsf sdflksd fksd flsdlkf sdk fklsdfl ksdkfl dsk fdsk fljskdf jlkdskfj ldsjlkf ljskdf jlksdjlk fdsljkf jlkds fljksdkl slkfskld flks',
            game_date: 2410,
            real_date: '',
            author_id: 1,
            article_id: '',
            labels: ['test label', 'another']
        }
    );


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
            <div id="duegev-te-cc-wrapper">
                {DuegevTextEditorUtil.allStepsCompleted(completed, steps) ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            {getString('ALL_STEPS_COMPLETED_TE_MSG')}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handlers.reset}>{getString('PUBLISH')}</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div id="editor-stepper-card-content-wrapper">
                            <div id="text-editor-content-wrapper">
                                {TextEditorViewServer(activeStep)}
                            </div>
                            <div id="text-editor-stepper-handlers">
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handlers.back}
                                        sx={{ mr: 1 }}
                                    >
                                        {getString('BACK')}
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handlers.next} sx={{ mr: 1 }}>
                                        {getString('NEXT')}
                                    </Button>
                                    {activeStep !== steps.length &&
                                        (completed[activeStep] ? (
                                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                {/* If something is done I can put a text here */}
                                            </Typography>
                                        ) : (
                                            <Button onClick={handlers.complete}>
                                                {DuegevTextEditorUtil.completedSteps(completed) === DuegevTextEditorUtil.totalSteps(steps) - 1
                                                    ? getString('FINISH_TE')
                                                    : getString('COMPLETE')}
                                            </Button>
                                        ))}
                                </Box>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }

    const TextEditorViewServer = (activeStep: number) => {
        switch (activeStep) {
            case 0:
                return <TextEditorMetadataForm></TextEditorMetadataForm>;

            case 1:
                return <TextEditorEditorView></TextEditorEditorView>;

            case 2:
                return <TextEditorPreview></TextEditorPreview>;
        }
    }

    const TextEditorMetadataForm = () => {
        return (
            <div id="metadata-editor-wrapper">
                <TextField id="duegev-te-title-field" label="Cím" variant="outlined" />
                <div id="duegev-article-auth-info">
                    <TextField id="duegev-te-title-field" className="field" label="2410" variant="outlined" />
                    <TextField id="duegev-te-title-field" className="field" label="Francis" variant="outlined" disabled />
                    <TextField id="duegev-te-title-field" className="field" label="2024-06-15" variant="outlined" disabled />
                </div>
                <div id="duegev-label-selector-wrapper">
                    <OptionSelectCustom options={[{value: '1', label: 'blin'}]} label={'Label Select'} helperText={'Label Select HT'}></OptionSelectCustom>
                </div>
            </div>
        );
    }

    const TextEditorEditorView = () => {
        return (
            <div id="duegev-md-editor-wrapper">
                <TextField
                    fullWidth
                    id="duegev-md-editor"
                    label="Duegev MD Editor"
                    multiline
                    rows={10}
                    placeholder="Write your document here..."
                />
            </div>
        );
    }

    const TextEditorPreview = () => {
        return (
            <div id="duegev-md-preview">
                <Post data={article}></Post>
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