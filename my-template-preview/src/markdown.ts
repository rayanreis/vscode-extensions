import MarkdownIt from "markdown-it";

const PLACEHOLDER = /\{\{(.*?)\}\}/g;

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function escapeAttr(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/\n/g, "&#10;");
}

export function templatePlugin(md: MarkdownIt) {

    const defaultFence = md.renderer.rules.fence;

    md.renderer.rules.fence =
    function (tokens, idx, options, env, self) {

        const token = tokens[idx];

        if (token.info.trim() === "template") {

            // markdown-it fences always carry a trailing newline; drop it
            // so the copied text matches what the author wrote.
            const raw = token.content.replace(/\n$/, "");

            // Render the code with an <input> in place of every {{name}},
            // escaping the surrounding static text so code like `<` is safe.
            let body = "";
            let last = 0;
            let m: RegExpExecArray | null;
            PLACEHOLDER.lastIndex = 0;
            while ((m = PLACEHOLDER.exec(raw)) !== null) {
                body += escapeHtml(raw.slice(last, m.index));
                const name = m[1].trim();
                const attr = escapeAttr(name);
                const size = Math.max(name.length, 4);
                body +=
                    `<input class="ph" type="text" data-name="${attr}"` +
                    ` placeholder="${attr}" size="${size}" />`;
                last = PLACEHOLDER.lastIndex;
            }
            body += escapeHtml(raw.slice(last));

            // Stash the raw template so the Copy button can reconstruct it.
            return `<div class="template-block" data-template="${escapeAttr(raw)}">
<pre class="template-code">${body}</pre>
<button class="template-copy" type="button">Copy</button>
</div>
`;
        }

        return defaultFence!(
            tokens,
            idx,
            options,
            env,
            self
        );

    };

    return md;
}
