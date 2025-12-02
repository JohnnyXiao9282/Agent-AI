import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const chat = async (filePath = "./uploads/hbs-lean-startup.pdf", query) => {
    // Get API key from environment
  const apiKey = process.env.OPENAI_API_KEY;

  // Step 1
  const loader = new PDFLoader(filePath);

  const data = await loader.load();

  // Step 2
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500, //  (in terms of number of characters)
    chunkOverlap: 0,
  });

  const splitDocs = await textSplitter.splitDocuments(data);


}