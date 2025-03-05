import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";


export function Prompt(){
    return (
        <div className="relative">
            <Textarea placeholder="Create a chess application..." />
            <Button className="absolute top-4 right-4 cursor-pointer">
                <Send/>
            </Button>
        </div>
    )
}