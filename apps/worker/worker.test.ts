import { expect,test } from "bun:test";
import { ArtifactProcessor } from "./parser";


test("Action withshell and file", () => {
    const brixAction = `<brixArtifact>
        <brixAction type="shell">
            npm run start
        </brixAction>
        <brixAction type="file" filePath="src/index.js">
            console.log("Hello, world!");
        </brixAction>

    </brixArtifact>`

    const artifactProcessor = new ArtifactProcessor(brixAction, (filePath, fileContent) => {
        expect(filePath).toBe("src/index.js");
        expect(fileContent).toBe("console.log(\"Hello, world!\");");
    }
    , (shellCommand) => {    
        expect(shellCommand).toBe("npm run start");
    }
    );

    artifactProcessor.parse();
    artifactProcessor.parse();
    expect(artifactProcessor.currentArtifact).not.toContain("<brixAction >");

})

test("Action with appends", () => {
    const brixAction = `<brixArtifact>
        <brixAction type="shell">
            npm run start
        </brixAction>
        <brixAction type="file" filePath="src/index.js">
            console.log("Hello, world!");
        </brixAction>
    </brixArtifact>`


    const artifactProcessor = new ArtifactProcessor(brixAction, (filePath, fileContent) => {
        expect(filePath).toBe("src/index.js");
        expect(fileContent).toBe("console.log(\"Hello, world!\");");
    }, (shellCommand) => {
        console.log(shellCommand);
        expect(shellCommand).toBe("npm run start");
    });

    artifactProcessor.parse();
    artifactProcessor.append(`<brixAction type="shell">
        npm run start   
    </brixAction>`);
    artifactProcessor.parse();
    artifactProcessor.parse();
    artifactProcessor.append(`<brixAction type="file" filePath="src/index.js">
        console.log("Hello, world!");
    </brixAction>`);
    artifactProcessor.parse();
    expect(artifactProcessor.currentArtifact).not.toContain("<brixAction >");
 


});