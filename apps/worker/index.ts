import cors from 'cors';
import express from 'express';
import {prismaClient} from 'db/client';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from './systemPrompt';
import {ArtifactProcessor} from './parser';
import {onFileUpdate, onShellCommand} from './os';

const app = express();
app.use(cors());
app.use(express.json());

app.post ("/prompt", async (req, res) => {
    const {prompt,projectId} = req.body;
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
        res.status(500).json({error: "API key is missing"});
        return;
    }
   //correct it
    const client = new GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({ model: "gemini-1.5-pro-preview-0409" });
    await prismaClient.prompt.create({
        data: {     
            content:prompt,
            projectId,
            type:"USER"
        },
    });

    const allPrompts = await prismaClient.prompt.findMany({
        where: { 
            projectId
        },
        orderBy: {
            createdAt: 'asc'
        },
    });

    let artifactProcessor=new ArtifactProcessor("", onFileUpdate, onShellCommand);
    let artifact = "";

    //Todo: Add streaming here

    // @ts-ignore
    const responseStream = await model.generateContentStream({
        contents: allPrompts.map((p:any) => ({
            role: p.type === "USER" ? "user" : "assistant",
            parts: [{ text: p.content }],
        })),
        systemInstruction: { role: "system", parts: [{ text: systemPrompt }] },
        generationConfig: { maxOutputTokens: 8000 }
    });

    for await (const chunk of responseStream.stream) {
        const text = chunk.text();
        if (text) {
            artifactProcessor.append(text);
            artifactProcessor.parse();
            artifact += text;
        }
    }

    await prismaClient.prompt.create({
        data: {
            content: artifact,
            projectId,
            type: "SYSTEM"
        },
    });

    res.json({ response: artifact });
});

app.listen(9091, () => {
    console.log("Worker started at 9091");
});