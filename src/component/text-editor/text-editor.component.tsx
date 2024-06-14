import { Box } from "@mui/system";
import { Article, ArticleLabels } from "../../type/article.type";
import { Tabs } from "@mui/base";
import { Tab } from "@mui/material";
import React from "react";

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

const TextEditor = (props: TextEditorProps) => {
    return (
        <></>
    );
}

export default TextEditor;