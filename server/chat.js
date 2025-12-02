import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
// The process of splitting docs to vector/splits is called embedding.
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const chat = async (filePath = "./uploads/hbs-lean-startup.pdf", query) => {
  // Get API key from environment
  const apiKey = process.env.OPENAI_API_KEY;

  // Steps:
  // Document Loading -> Splitting -> Storage -> Retrieval -> Output.

  // Step 1
  const loader = new PDFLoader(filePath);

  const data = await loader.load();

  // Step 2
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500, // Define the size of each split by 500 characters.
    chunkOverlap: 0,
  });

  const splitDocs = await textSplitter.splitDocuments(data);

  // Step 3
  const embeddings = new OpenAIEmbeddings(apiKey ? { apiKey } : {});

  // Memory vector store is stored locally on the computer.
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );
  // Step 4: retrieval (For testing)

  // const relevantDocs = await vectorStore.similaritySearch(
  // "What is task decomposition?"
  // );

  // Step 5: QA w/ customize the prompt
  const model = new ChatOpenAI({
    model: "gpt-5",
    ...(apiKey && { apiKey }),
  });

  const template = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.

{context}
Question: {question}
Helpful Answer:`;
  const prompt = PromptTemplate.fromTemplate(template);

  // Use retriever to get relevant documents
  const retriever = vectorStore.asRetriever();
  const relevantDocs = await retriever.invoke(query);

  // Format context from retrieved documents
  const context = relevantDocs.map((doc) => doc.pageContent).join("\n\n");

  // Create a simple chain using the prompt template
  const formattedPrompt = await prompt.format({
    context,
    question: query,
  });

  // Get response from the model
  const response = await model.invoke(formattedPrompt);

  return { text: response.content };
};

export default chat;
