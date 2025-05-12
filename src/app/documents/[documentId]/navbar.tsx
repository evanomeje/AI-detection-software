"use client";

import Image from "next/image"
import Link from "next/link"
import {    BsFilePdf } from "react-icons/bs";
import { ChevronRight, RemoveFormattingIcon, StrikethroughIcon } from "lucide-react"; 
import { BoldIcon, FileIcon, 
        FileJsonIcon, 
        FilePenIcon, 
        FilePlusIcon, 
        FileTextIcon, 
        GlobeIcon, 
        ItalicIcon, 
        PrinterIcon, 
        Redo2Icon, 
        TextIcon, 
        TrashIcon, 
        UnderlineIcon, 
        Undo2Icon 
    } from "lucide-react";

import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarShortcut,
} from "@/components/ui/menubar"

import { DocumentInput } from "./document-input";
import { MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger } from "@radix-ui/react-menubar";
import { useEditorStore } from "@/store/use-editor-store";

export const Navbar = () => {

  const {editor } = useEditorStore();

  const insertTable = ({ rows, cols }: {rows: number, cols: number}) => {
    editor
      ?.chain()
      .focus()
      .insertTable({rows, cols, withHeaderRow: false})
      .run()
  }

  const onDownload = (blob: Blob, filename: string) => {

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJson = () =>  {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json"
    });

    onDownload(blob, 'document.json') // TODO: Use document name
  }

  const onSaveHTML = () =>  {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html"
    });

    onDownload(blob, 'document.html') // TODO: Use document name
  }

  const onSaveText = () =>  {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain"
    });

    onDownload(blob, 'document.txt') // TODO: Use document name
  }

    return (
      <nav className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={136} height={36} />
          </Link>
          
          <div className="flex flex-col">
            <DocumentInput />
            
            <div className="flex">
              <Menubar className="border-4 bg-transparent shadow-none h-auto p-0">
                {/* FILE MENU */}
                <MenubarMenu>
                  <MenubarTrigger className="text-sm px-4 py-2 border-2 border-black text-xl rounded-none bg-orange-500 text-black font-amiri hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300">
                    FILE
                  </MenubarTrigger>
                  
                  <MenubarContent className="print:hidden">
                    {/* Save Submenu */}
                    <MenubarSub>
                      <MenubarSubTrigger className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded-md w-full group transition-colors">
                        <div className="flex items-center gap-2">
                          <FileIcon className="size-5 text-gray-600" />
                          <span>Save</span>
                        </div>
                        <svg
                          className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </MenubarSubTrigger>
                      
                      <MenubarSubContent className="bg-white border border-gray-200 shadow-lg rounded-md py-1 w-40">
                        <MenubarItem onClick={onSaveJson} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          <FileJsonIcon className="size-4" />
                          JSON
                        </MenubarItem>
                        <MenubarItem onClick={onSaveHTML} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          <GlobeIcon className="size-4" />
                          HTML
                        </MenubarItem>
                        <MenubarItem onClick={() => window.print()} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          <BsFilePdf className="size-4" />
                          PDF
                        </MenubarItem>
                        <MenubarItem onClick={onSaveText} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          <FileTextIcon className="mr-2 size-4" />
                          TEXT
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
  
                    <MenubarItem>
                      <FilePlusIcon className="mr-2 size-6" />
                      NEW DOCUMENT
                    </MenubarItem>
                    
                    <MenubarSeparator />
                    
                    <MenubarItem>
                      <FilePenIcon className="mr-2 size-6" />
                      RENAME 
                    </MenubarItem>
                    
                    <MenubarItem>
                      <TrashIcon className="mr-2 size-6" />
                      REMOVE
                    </MenubarItem>
                    
                    <MenubarSeparator />
                    
                    <MenubarItem onClick = {()=> window.print()}>
                      <PrinterIcon className="mr-2 size-6" />
                      PRINT <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
  
                {/* EDIT MENU */}
                <MenubarMenu>
                  <MenubarTrigger className="text-sm px-4 py-2 border-2 border-black text-xl rounded-none bg-orange-500 text-black font-amiri hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300">
                    EDIT
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem onClick={()=>editor?.chain().undo().run()}>
                        <Undo2Icon className="size-4 mr-2"/>
                        UNDO <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={()=>editor?.chain().redo().run()}>
                        <Redo2Icon className="size-4 mr-2"/>
                        REDO <MenubarShortcut>⌘Y</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
  
                {/* INSERT MENU */}
                <MenubarMenu>
                  <MenubarTrigger className="text-sm px-4 py-2 border-2 border-black text-xl rounded-none bg-orange-500 text-black font-amiri hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300">
                    INSERT
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>
                            TABLE
                        </MenubarSubTrigger>
                        <MenubarSubContent className="min-w-20 bg-white dark:bg-zinc-900 shadow-md border border-zinc-200 dark:border-zinc-800 rounded-none">
                            <MenubarItem onClick= {()=> insertTable ({rows: 1, cols: 1})}>
                                1 X 1

                            </MenubarItem>
                            <MenubarItem onClick= {()=> insertTable ({rows: 2, cols: 2})}>
                                2 X 2
                                
                            </MenubarItem>
                            <MenubarItem onClick= {()=> insertTable ({rows: 3, cols: 3})}>
                                3 X 3
                                
                            </MenubarItem>
                            <MenubarItem onClick= {()=> insertTable ({rows: 4, cols: 4})}>
                                4 X 4
                                
                            </MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                  </MenubarContent>
                </MenubarMenu>
  
                {/* FORMAT MENU */}
                <MenubarMenu>
                  <MenubarTrigger className="text-sm px-4 py-2 border-2 border-black text-xl rounded-none bg-orange-500 text-black font-amiri hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300">
                    FORMAT
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                    <MenubarSubTrigger className="flex items-center justify-between w-full px-2 py-1.5">
  <div className="flex items-center">
    <TextIcon className="size-4 mr-2" />
    TEXT
  </div>
  <ChevronRight className="size-4 ml-2" />
</MenubarSubTrigger>

<MenubarSubContent className="bg-white shadow-md rounded-md p-1">
  <MenubarItem  onClick = {() => editor?. chain().focus().toggleBold().run()} className="flex items-center px-2 py-1.5 hover:bg-gray-100 rounded">
    <BoldIcon className="size-4 mr-2" />
    BOLD <MenubarShortcut> ⌘B</MenubarShortcut>
  </MenubarItem>
  <MenubarItem onClick = {() => editor?. chain().focus().toggleItalic().run()} className="flex items-center px-2 py-1.5 hover:bg-gray-100 rounded">
    <ItalicIcon className="size-4 mr-2" />
    ITALIC <MenubarShortcut>  ⌘ I</MenubarShortcut>
  </MenubarItem>
  <MenubarItem onClick = {() => editor?. chain().focus().toggleUnderline().run()} className="flex items-center px-2 py-1.5 hover:bg-gray-100 rounded">
    <UnderlineIcon className="size-4 mr-2" />
    UNDERLINE &nbsp; &nbsp;<MenubarShortcut>  ⌘U</MenubarShortcut>
  </MenubarItem>
  <MenubarItem onClick = {() => editor?. chain().focus().toggleStrike().run()} className="flex items-center px-2 py-1.5 hover:bg-gray-100 rounded">
    <StrikethroughIcon className="size-4 mr-2" />
    <span>DASH&nbsp;&nbsp;</span> <MenubarShortcut>  ⌘S</MenubarShortcut>
  </MenubarItem>
</MenubarSubContent>

                    </MenubarSub>
                    <MenubarItem>
                      <RemoveFormattingIcon onClick = {() => editor?. chain().focus().unsetAllMarks().run()} className="size-4 mr-2"/>
                      CLEAR FORMATTING
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </div>
      </nav>
    );
  };