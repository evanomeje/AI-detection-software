import { Editor } from "./editor";

interface DocumentIdpageProps {
params: Promise<{ documentId: string }>;
};



const DocumentIdpage = async ({ params }: DocumentIdpageProps) => {

    const {documentId} = await params;

    return (
    <div className= "min-h-screen bg-[#FAFBFD]">
    <Editor />
    </div>
);
}

export default DocumentIdpage;