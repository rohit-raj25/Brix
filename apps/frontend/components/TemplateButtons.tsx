import { Button } from "./ui/button";

export function TemplateButtons() {
    return   (
        <div className="flex gap-2">
            <Button className="cursor-pointer border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 p-3" variant="outline">Build a chess app</Button>
            <Button className="cursor-pointer border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 p-3" variant="outline">Build a todo app</Button>
            <Button className="cursor-pointer border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 p-3" variant="outline">Build a blog</Button>
            <Button className="cursor-pointer border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 p-3 " variant="outline">Create a base app using nativewind</Button>

        </div>
    )
}