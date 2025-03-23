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
    RemoveFormattingIcon,
    ChevronDownIcon,
    HighlighterIcon,
    Link2Icon
        } from "lucide-react";
import {cn} from "@/lib/utils";

import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Level } from "@tiptap/extension-heading";
import { ColorResult, CirclePicker } from "react-color";
import { motion } from "framer-motion";
import { useState } from "react";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";


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
            onClick={onClick}
            //makes the popup appear when the button is clicked
            className={cn(
                "w-9 h-9 flex items-center justify-center rounded-full border-2 border-black transition-all relative",
                "hover:-translate-y-1 hover:shadow-[0_6px_0_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[0_2px_0_rgba(0,0,0,1)]",
                isActive ? "bg-neutral-300" : "bg-neutral-200/80"
            )}            
        >
            <Icon className= "size-6  "/>    
        </button>
    );
}

const FontFamilyButton = () => {
    const {editor} = useEditorStore();

    const fonts = [
        { label: "Arial", value: "Arial" },
        { label: "Courier New", value: "Courier New" },
        { label: "Georgia", value: "Georgia" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Verdana", value: "Verdana" },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button 
                 className= "h-7 w-[120px] shrink-0 flex items-center justify-between rounded-full hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm border-2 border-black"
                >
                    <span className="truncate ">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0 rounded-full bg-black" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-[yellow] border-black border-2 rounded-none ">
                {
                    fonts.map(({label, value}) => (
                        <button 
                        onClick = {() => editor?.chain().focus().setFontFamily(value).run()}
                        key={value}
                            className={cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover-bg-neuatral-200/80 border-2 border-black bg-white",
                                editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                            )}
                            style= {{fontFamily: value}}
                            >
                                <span className="text-sm">{label}</span>

                        </button>
                    )
                )}

            </DropdownMenuContent>
        </DropdownMenu>
    );
};


const HeadingLevelButton = () => {

    const { editor } = useEditorStore();

    const heading = [
        {label: "NORMAL TEXT", value: 0, fontSize: "16px"},
        {label: "Heading 1", value: 1, fontSize: "32px"},
        {label: "Heading 2", value: 2, fontSize: "24px"},
        {label: "Heading 3", value: 3, fontSize: "20px"},
        {label: "Heading 4", value: 4, fontSize: "18px"},
        {label: "Heading 5", value: 5, fontSize: "16px"},
    ];
    
    const getCurrentHeading = () => { 
    for ( let level =1; level <=5; level++) {
        if (editor?.isActive("heading", {level})) {
            return 'Heading ${level}';
            }
         }

            return "NORMAL TEXT";
    };
return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <button 
                 className= "h-7 min-w-7 shrink-0 flex items-center justify-center rounded-full hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm border-2 border-black"
                >
                    <span className="truncate ">
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0 rounded-full bg-black" />
                </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className= "p-1 flex flex-col gay-y-1 ">
            {heading.map(({ label, value, fontSize}) => (
                <button
                key={value}
                style={{fontSize}}
                onClick={() =>
                    {
                        if (value === 0) {
                            editor?.chain().focus().setParagraph().run();
                        } else {
                            editor?.chain().focus().toggleHeading({level: value as Level}).run();
                    } 
                }}
                className={cn(
                    "flex items-center gap-x-2 px-2 py-1 rounded-sm hover-bg-neuatral-200/80 border-2 border-black bg-white",
                    (value === 0 && !editor?.isActive("heading")) ||  editor?.isActive("heading", {label: value})  && "bg-neutral-200/80"
                )}
                >

                  {label}  
                </button>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
)
    
};

const HighlightColorButton = () => {
    const { editor } = useEditorStore();
    const [selectedColor, setSelectedColor] = useState<string>("#FFFF00"); // Default highlight color

    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00",];

    const onChange = (color: string) => {
        setSelectedColor(color);
        editor?.chain().focus().setHighlight({ color }).run();
    };

    const isActive = editor?.isActive("textStyle", { color: selectedColor });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "w-9 h-9 flex items-center justify-center rounded-full border-2 border-black transition-all relative",
                        "hover:-translate-y-1 hover:shadow-[0_6px_0_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[0_2px_0_rgba(0,0,0,1)]",
                        isActive ? "bg-neutral-300" : "bg-neutral-200/80"
                    )}
                >  
                   <HighlighterIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                className="p-2.5 w-max border-[black] border-2 rounded-full transition-all duration-300"
                style={{ backgroundColor: selectedColor === "#000000" ? "rgba(229, 229, 229, 1)" : selectedColor }}
            >
                <div className="flex flex-row items-center">   
                    {colors.map((color, index) => (
                        <button
                            key={color}
                            className="w-10 h-10 rounded-full border-4 border-black outline outline-[4px]"
                            style={{ 
                                backgroundColor: color, 
                                outlineColor: color, 
                                marginLeft: index !== 0 ? "-1.25rem" : "0"
                            }}
                            onClick={() => onChange(color)}
                        />
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


const TextColorButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes("textStyle").color || "#000000"; 

    const colors = [ "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFFFFF"];

    const onChange = (color: string) => {
        editor?.chain().focus().setColor(color).run();
    };

    const isActive = editor?.isActive("textStyle", { color: value });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button 
                    className={cn(
                        "w-9 h-9 flex items-center justify-center rounded-full border-2 border-black transition-all relative",
                        "hover:-translate-y-1 hover:shadow-[0_6px_0_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[0_2px_0_rgba(0,0,0,1)]",
                        isActive ? "bg-neutral-300" : "bg-neutral-200/80"
                    )}
                >  
                    <span className="text-xs">colour</span>
                    <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                className="p-2.5 w-max border-[black] border-2 rounded-full transition-all duration-300" // Add transition class for smooth color change
                style={{ backgroundColor: value === "#000000" ? "rgba(229, 229, 229, 1)" : value }} // Default color
            >
                <div className="flex flex-row items-center">   
                    {colors.map((color, index) => (
                        <button
                            key={color}
                            className={`w-10 h-10 rounded-full border-4 border-black outline outline-[4px]`}
                            style={{ 
                                backgroundColor: color, 
                                outlineColor: color, 
                                marginLeft: index !== 0 ? "-1.25rem" : "0"  // Adjust overlap
                            }}
                            onClick={() => onChange(color)}
                        />
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const LinkButton = () => {
    const { editor } = useEditorStore();
    const [value, setValue] = useState(" ");

    const  onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({href}).run();
        setValue("");

    };

    const isActive = editor?.isActive("link");


    return (
        <DropdownMenu onOpenChange={(open)=> {
            if (open) {
             setValue(editor?.getAttributes("link").href || " ")
            }
            }} >
            
            <DropdownMenuTrigger asChild>
                <button
                    
                    className={cn(
                        "w-9 h-9 flex items-center justify-center rounded-full border-2 border-black transition-all relative",
                        "hover:-translate-y-1 hover:shadow-[0_6px_0_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[0_2px_0_rgba(0,0,0,1)]",
                        isActive ? "bg-neutral-300" : "bg-neutral-200/80"
                    )}
                >  
                   <Link2Icon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                className="p-0.5 flex items-center gap-x-2  w-max border-[black] border-2 transition-all duration-300">
                <Input
                    placeholder="http//example.com"
                    value = {value} 
                    onChange= {(e) => setValue(e.target.value)}
                />
                <Button onClick={() => onChange(value)}> 
                    Apply 
                    </Button>

            </DropdownMenuContent>
        </DropdownMenu> 
    );

};









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
        <div className = "bg-[#f97316] px-2.5 py-0.5 rounded-[60px] border-spacing-9 border-4 border-[#1f2937] min-h-[20px] min-w-[10px] flex items-center gap-x-0.5 overflow-x-auto shadow-2xl mt-0.5" >
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item}/>
            ))}
        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />
        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />
        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />
        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />


        {/* TODO: FONT FAMILY*/}

        <FontFamilyButton/> 
        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />
        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />
        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />

        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />
        <HeadingLevelButton/>

        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />
        {/* TODO: FONT SIZE*/}
        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />
        {sections[1].map((item) => (
            <ToolbarButton key={item.label} {...item}/>
        ))}
        {/* TOD0: TEXT Color */}
        <TextColorButton/>

        <HighlightColorButton/>

        {/* TOD0: HIghlight Color */}
        < Separator orientation="vertical" className="h-11 w-[3px] bg-black" />
        <LinkButton/>
        {/* TOD0: IMage */}
        {/* TOD0: ALign */}
        {/* TOD0: LIST */}
        {sections[2].map((item) => (
            <ToolbarButton key={item.label} {...item}/>
        ))}

        </div>
    );
};