import MarkdownIt from "markdown-it";
import { templatePlugin } from "./markdown";

// VS Code's built-in Markdown preview picks up the object returned here and
// passes its own markdown-it instance to `extendMarkdownIt`.
export function activate() {
    return {
        extendMarkdownIt(md: MarkdownIt) {
            return templatePlugin(md);
        },
    };
}

export function deactivate() {}
