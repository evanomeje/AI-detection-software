import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";

interface DocumentIdpageProps {
params: Promise<{ documentId: string }>;
};



const DocumentIdpage = async ({ params }: DocumentIdpageProps) => {

    const {documentId} = await params;

    return (
    <div className= "min-h-screen bg-[#FAFBFD]">
    <div className="flex flex-col px-4 pt-2 gap-y-0 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
    <Navbar />
    <Toolbar />
    </div>
    <div className="mt-[195px] print:mt-0 py-4">
    <Editor />
    </div>
    </div>
);
}

export default DocumentIdpage;