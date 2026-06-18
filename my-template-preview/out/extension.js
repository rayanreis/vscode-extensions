"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const markdown_1 = require("./markdown");
// VS Code's built-in Markdown preview picks up the object returned here and
// passes its own markdown-it instance to `extendMarkdownIt`.
function activate() {
    return {
        extendMarkdownIt(md) {
            return (0, markdown_1.templatePlugin)(md);
        },
    };
}
function deactivate() { }
//# sourceMappingURL=extension.js.map