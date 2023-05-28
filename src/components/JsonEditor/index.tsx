import react, { FC, forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-dawn';
import { programStore } from '@/stores/mobx';

const JsonEditor: FC = (props: any, ref) => {
    return (
        <>
            <AceEditor
                style={{ borderRadius: ' 5px' }}
                mode={props?.mode || 'json'}
                width="600px"
                height="400px"
                showPrintMargin
                wrapEnabled
                highlightActiveLine //突出活动线
                enableSnippets //启用代码段
                setOptions={{
                    enableBasicAutocompletion: true, //启用基本自动完成功能
                    enableLiveAutocompletion: true, //启用实时自动完成功能 （比如：智能代码提示）
                    enableSnippets: true, //启用代码段
                    showLineNumbers: true,
                    tabSize: 4,
                }}
                value={programStore.selectProgramInfo.config[props.idx].configContent}
                // annotations={[{ row: 0, column: 2, type: 'error', text: 'Some error.' }]}
                fontSize={14}
                theme="dawn"
                onChange={data => {
                    programStore.selectProgramInfo.config[props.idx].configContent = data;
                }}
                name="JsonEditorModal"
                editorProps={{ $blockScrolling: true }}
            />
        </>
    );
};

export default forwardRef(JsonEditor as any) as any;
