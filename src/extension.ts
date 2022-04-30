import * as vscode from "vscode";
import sprintfCodes from "./codes";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerHoverProvider('*', {
            provideHover(document, position) {
                const char = document.getText(document.getWordRangeAtPosition(position, /%\w/));

                if (char) {
                    const code = Object.keys(sprintfCodes).find((key) => key === char);
                    if (!code) return;

                    const codeInfo = sprintfCodes[code];

                    const markdown = new vscode.MarkdownString();
                    markdown.isTrusted = true;

                    markdown.appendMarkdown(
                        `php-sprintf: \`${codeInfo.title}\` *[${codeInfo.description}](https://www.php.net/manual/en/function.sprintf.php)*`
                    );

                    return new vscode.Hover(markdown);
                };

                return
            }
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "php-sprintf.search",
            async () => {
                const codes = Object.values(sprintfCodes);

                let items: any = []
                codes.map((c) => items.push({
                    label: c.title,
                    description: c.description
                }))

                let moreInfo = 'More Info'
                let quickPick = vscode.window.createQuickPick()
                quickPick.placeholder = 'enter code...'
                quickPick.matchOnDescription = true
                quickPick.canSelectMany = true

                items.push({label: 'Visit Docs' , kind: vscode.QuickPickItemKind.Separator})
                items.push({label: moreInfo})

                quickPick.items = items

                quickPick.onDidAccept(() => {
                    if (quickPick.selectedItems.length) {
                        let val = quickPick.selectedItems
                                .filter((item) => item.label !== moreInfo)
                                .map((item) => item.label)
                                .join('')

                        vscode.env.clipboard.writeText(val)

                        if (quickPick.selectedItems.some((item) => item.label == moreInfo)) {
                            vscode.env.openExternal(
                                vscode.Uri.parse('https://www.php.net/manual/en/function.sprintf.php')
                            )
                        }
                    }

                    quickPick.dispose()
                });

                quickPick.show();
            }
        )
    );
}

export function deactivate() {}
