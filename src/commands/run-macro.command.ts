import * as vscode from 'vscode';

export { RunMacro };

type CommandType = string | { command: string, args: any[] };

class RunMacro {
  public exec() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return; }

    const doc = editor.document;
    if (!doc) { return; }

    const functions = this.functions();
    // show a drop-down list
    const items: vscode.QuickPickItem[] = functions.map(({ label }) => {
      return { label };
    });

    vscode.window.showQuickPick(items)
      .then((selectedItem) => {
        if (!selectedItem) { return; }

        editor.selections.map((sel) => {
          const fnItem = functions.find(({ label }) => (label === selectedItem.label));
          if (fnItem && fnItem.fn) { fnItem.fn(); }
        });
      });
  }
  protected functions() {
    const functions: Array<{ label: string, fn(): Promise<void> }> = [];

    const settings = vscode.workspace.getConfiguration('note.macros');
    const macros = Object.keys(settings).filter((prop) => {
      return settings[prop] && typeof settings[prop] !== 'function';
    });

    macros.forEach((name) => {
      const macro = settings.get<CommandType[]>(name);
      if (!macro) { return; }
      functions.push({
        fn: async () => {
          for (const action of macro) {
            if (typeof action === 'string') {
              if (action.startsWith('+')) { // type text
                await vscode.commands.executeCommand(
                  JSON.stringify({
                    args: { text: action.substr(1) },
                    command: 'type',
                  }),
                );
              } else { // command without args
                await vscode.commands.executeCommand(action);
              }
            } else { // command with args
              await vscode.commands.executeCommand(action.command, action.args);
            }
          }
        },
        label: name,
      });
    });
    return functions;
  }
}
