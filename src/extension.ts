import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    readConfig()

    // config
    vscode.workspace.onDidChangeConfiguration(async (e) => {
        if (e.affectsConfiguration(PACKAGE_NAME)) {
            readConfig()
        }
    })

    context.subscriptions.push(
        vscode.languages.registerHoverProvider('*', {
            provideHover(document, position) {
                const hoveredCode = document.getText(document.getWordRangeAtPosition(position, /%\w/));

                if (hoveredCode) {
                    const codeInfo = sprintfCodes.find((item: any) => item.label === hoveredCode)

                    if (codeInfo) {
                        const markdown = new vscode.MarkdownString();
                        markdown.isTrusted = true;
                        markdown.appendMarkdown(
                            `php-sprintf: \`${codeInfo.label}\` *[${codeInfo.description}](https://www.php.net/manual/en/function.sprintf.php)*`
                        );

                        return new vscode.Hover(markdown);
                    }
                };

                return
            }
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "php-sprintf.search",
            async () => {
                let items = sprintfCodes
                let moreInfo = 'More Info'

                let quickPick = vscode.window.createQuickPick()
                quickPick.placeholder = 'search label or description ...'
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
                                vscode.Uri.parse(docs_link)
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

/* Config ------------------------------------------------------------------- */
export const PACKAGE_NAME = 'phpSprintfCodes'
let config
let docs_link: string
let sprintfCodes: any

export function readConfig() {
    config = vscode.workspace.getConfiguration(PACKAGE_NAME)

    docs_link = config.docs_link
    sprintfCodes = config.codes
}

export function deactivate() {}
