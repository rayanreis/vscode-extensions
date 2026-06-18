# Template Preview

Turn fenced ` ```template ` code blocks into **interactive, fillable forms** in
the built-in VS Code Markdown preview, then copy the resolved code with one
click.

## Features

Write a code block tagged `template` and use `{{name}}` for the parts you want
to fill in:

````markdown
```template
SELECT *
FROM users
WHERE id = {{id}};
```
````

In the Markdown preview (`Shift+Cmd+V` / `Shift+Ctrl+V`) this renders as:

- Each `{{name}}` becomes an editable input.
- Inputs that share a name are **linked** — type once and every occurrence
  fills in.
- A **Copy** button copies the resolved code to your clipboard. Any input you
  leave blank keeps its original `{{name}}` marker, so nothing is silently lost.

Non-`template` code blocks render exactly as they normally do.

## How it works

The extension hooks into VS Code's Markdown preview via `extendMarkdownIt` and
adds a custom `markdown-it` fence renderer. A small preview script handles
input linking and the clipboard copy. There are no settings to configure.

## Requirements

VS Code 1.125.0 or newer. No other dependencies.

## Known limitations

- Placeholders use the literal `{{name}}` syntax; there is no escaping for a
  literal `{{` inside a template block yet.
- Resolution is plain text replacement — there is no type validation on inputs.


# Commmands
## Create Extension
```
npm install -g yo generator-code
yo code
```

Choose:
- New Extension (TypeScript)

```
cd my-template-preview
npm install
```

## Install Markerdown parser
```
npm install markdown-it
```


## Package it

```
npm install -g @vscode/vsce
```

```
vsce package
```

# Install:
```
code --install-extension my-template-preview-0.0.1.vsix
```