'use client';

import { useEditor, EditorContent } from '@tiptap/react'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { fontSizeExtension } from '@/extensions/font-size';
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { LineHeightExtension } from '@/extensions/line-height';

import {Ruler} from './ruler';



import {useEditorStore} from '@/store/use-editor-store'


export const Editor = () => {

  const { setEditor } = useEditorStore();

  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);      
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({editor}) {
      setEditor(editor);      
    },
    onSelectionUpdate({editor}) {
      setEditor(editor);      
    },
    onTransaction({editor}) {
      setEditor(editor);      
    },
    onFocus({editor}) {
      setEditor(editor);      
    },
    onBlur({editor}) {
      setEditor(editor);      
    },
    onContentError({editor}) {
      setEditor(editor);
    },  
    editorProps:{
        //paper attriubutes
        attributes: {
            style: "padding-left: 56px; padding-right: 56px;",
            class: "focus:outline-none print:border-0 bg-white border border-[#000] border-4 flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text rounded-3xl"
        },
    },
    extensions: [
        StarterKit,
        TaskItem.configure({
          nested: true,
        }),
        TaskList,
        Table,
        TableCell,
        TableHeader,
        TableRow,
        Image,
        ImageResize,
        Underline,
        FontFamily,
        TextStyle,
        Color,
        Highlight.configure({
          multicolor: true,
        }),
        Link.configure({
          autolink: false,
          defaultProtocol: 'https',
          openOnClick: false,
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"]
        }),
        fontSizeExtension,
        BulletList,
        OrderedList,
        ListItem,
        fontSizeExtension,
        LineHeightExtension,

    ],
   content: `

`,
  })

  return ( 
  <div className= "size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-red print:overflow-visible ">
    <Ruler/>
    <div className= "min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
    </div>
    </div>
  );
};
