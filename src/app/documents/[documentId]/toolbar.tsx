'use client';

import { 
    LucideIcon, 
    PrinterIcon, 
    SpellCheckIcon, 
    Redo2Icon, 
    Undo2Icon, 
    BoldIcon,
    ItalicIcon,  
    UnderlineIcon, 
    MessageSquarePlusIcon,
    ListTodoIcon,
    RemoveFormattingIcon
        } from "lucide-react";
import {cn} from "@/lib/utils";

import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
};

const ToolbarButton = ( {
    onClick,
    isActive,  
    icon: Icon,
}: ToolbarButtonProps ) => {
    return (
        <button
            onClick= {onClick}
            className={cn(
                "test-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg- bg-neutral-200/80",
                isActive && "bg-neutral-200/80"
            )}>
            <Icon className= "size-6  "/>    
        </button>
    );
}

export const Toolbar = () => {

    //const { editor } = useEditorStore();
    const { editor } = useEditorStore();

    

    const sections: { 
        label: string; 
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
        [
            {
                label: "Undo",
                icon: Undo2Icon,
                onClick: () => editor?.chain().focus().undo().run(),
            },
            {
                label: "Redo",
                icon: Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run(),
            },
            {   
                label: "Print",
                icon: PrinterIcon,
                onClick: () => window.print(),

            },
            {
                label: "Spell Check",
                icon: SpellCheckIcon,
                onClick: () => {
                const current = editor?.view.dom.getAttribute("spellcheck");
                editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
                }
        }
        ],
        [
            {
                label: "Bold",
                icon: BoldIcon,
                isActive: editor?.isActive("bold"),
                onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: "Italic",
                icon: ItalicIcon,
                isActive: editor?.isActive("italic"),
                onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: "Underline",
                icon: UnderlineIcon,
                isActive: editor?.isActive("underline"),
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
            }
        ],
        [
            {
                label: "Commnet",
                icon: MessageSquarePlusIcon,
                onClick: () => console.log("Comment"),
                isActive: false, //TODO: Implement this functionality
            },
            {
                label: "List Todo",
                icon: ListTodoIcon,
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                isActive: editor?.isActive("taskList"),
            },
            {
                label: "Remove Formatting",
                icon: RemoveFormattingIcon,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                isActive: editor?.isActive("taskList"),
            }
        ]
    ] ;

    return (
        <div className = "bg-[yellow] px-2.5 py-0.5 rounded-[60px] border-4 border-black min-h-[20px] min-w-[10px] flex items-center gap-x-0.5 overflow-x-auto shadow-2xl mt-0.5" >
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item}/>
            ))}
        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />
        {/* TODO: FONT FAMILY*/}

        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />
        {/* TODO: HEADING*/}

        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />
        {/* TODO: FONT SIZE*/}
        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />
        {sections[1].map((item) => (
            <ToolbarButton key={item.label} {...item}/>
        ))}
        {/* TOD0: TEXT Color */}

        {/* TOD0: HIghlight Color */}
        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />
        {/* TOD0: link */}
        {/* TOD0: IMage */}
        {/* TOD0: ALign */}
        {/* TOD0: LIST */}
        {sections[2].map((item) => (
            <ToolbarButton key={item.label} {...item}/>
        ))}

        </div>
    );
};