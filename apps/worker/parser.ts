/*
    <brixArtifact>
        <brixAction type="shell">
            npm run start
        </brixAction>
        <brixAction type="file" filePath="src/index.js">
            console.log("Hello, world!");
        </brixAction>
    </brixArtifact>
*/

export class ArtifactProcessor {
    public currentArtifact: string;
    private onFileContent: (filePath: string, fileContent: string) => void;
    private onShellCommand: (shellCommand: string) => void;

    constructor(currentArtifact: string, onFileContent: (filePath: string, fileContent: string) => void, onShellCommand: (shellCommand: string) => void) {
        this.currentArtifact = currentArtifact;
        this.onFileContent = onFileContent;
        this.onShellCommand = onShellCommand;
    }

    append(artifact: string) {
        this.currentArtifact += artifact;
    }

    parse() {
       const latestActionStart = this.currentArtifact.split("\n").findIndex((line) => line.includes("<brixAction type="));
       const latestActionEnd = this.currentArtifact.split("\n").findIndex((line) => line.includes("</brixAction>")) ?? (this.currentArtifact.split("\n").length - 1);

       if (latestActionStart === -1) {
        return;
       }

       const latestActionType = this.currentArtifact.split("\n")[latestActionStart].split("type=")[1].split(" ")[0].split(">")[0];
       const latestActionContent = this.currentArtifact.split("\n").slice(latestActionStart, latestActionEnd + 1).join("\n");

       try {
       if (latestActionType === "\"shell\"") {
        let shellCommand = latestActionContent.split('\n').slice(1).join('\n');
        if (shellCommand.includes("</brixAction>")) {
            shellCommand = shellCommand.split("</brixAction>")[0];
            this.currentArtifact = this.currentArtifact.split(latestActionContent)[1];
            this.onShellCommand(shellCommand);
        }
       } else if (latestActionType === "\"file\"") {
        const filePath = this.currentArtifact.split("\n")[latestActionStart].split("filePath=")[1].split(">")[0];
        let fileContent = latestActionContent.split("\n").slice(1).join("\n");
        if (fileContent.includes("</brixAction>")) {
            fileContent = fileContent.split("</brixAction>")[0];
            this.currentArtifact = this.currentArtifact.split(latestActionContent)[1];
            this.onFileContent(filePath.split("\"")[1], fileContent);
        }
       }
    } catch(e) {}
    }
}