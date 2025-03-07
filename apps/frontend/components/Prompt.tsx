"use client";
import { useState } from "react";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { TemplateButtons } from "./TemplateButtons";


export function Prompt(){
    const [prompt, setPrompt] = useState("");
    const {getToken}=useAuth();
    return (
        <div >
            <Textarea placeholder="Create a chess application..." value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
                <div className="flex justify-end pt-2">
                    <Button onClick={async () => {
                    const token=await getToken();
                    const response=await axios.post(`${BACKEND_URL}/project`,{
                        prompt:prompt
                    },
                    {
                        headers:{
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    console.log(response.data);
                    }

                    }
                    >
                        <Send/>
                    </Button>

                </div>
                <div className="max-w-2xl mx-auto pt-4">
				    <TemplateButtons />
			    </div>
            
        </div>
    )
}