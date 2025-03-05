import { Appbar } from "@/components/Appbar";
import { Prompt } from "@/components/Prompt";
import { TemplateButtons } from "@/components/TemplateButtons";
import { Button } from "@/components/ui/button";

import Image from "next/image";

export default function Home() {
  return (
    <div className="p-4">
      <Appbar />
      <div className="max-w-2xl mx-auto pt-32">
        <div className="text-2xl font-bold text-center">
          What do you want to build?
        </div>
        <div className="text-sm text-muted-foreground text-center mt-2">
          Prompt, click generate and watch the magic happen.

        </div>
        <div className="pt-4">
          <Prompt />
          
        </div>

      </div>
      <div className="max-w-2xl mx-auto pt-4">
        <TemplateButtons />
      </div>


    </div>
  );
}
