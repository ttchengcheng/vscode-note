import * as vscode from 'vscode';

export { StringTransform };

abstract class StringTransform {
  public exec() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return; }

    const doc = editor.document;
    if (!doc) { return; }

    const functions = this.functionMap();
    // show a drop-down list
    const items: vscode.QuickPickItem[] = functions.map(({ label }) => {
      return { label };
    });

    vscode.window.showQuickPick(items)
      .then((selectedItem) => {
        if (!selectedItem) { return; }

        const updates: Array<[vscode.Range, string]> = [];
        editor.selections.map((sel) => {
          const t = doc.getText(sel);
          if (!t) { return; }

          const fnItem = functions.find(({ label }) => (label === selectedItem.label));
          if (fnItem && fnItem.fn) { updates.push([sel, fnItem.fn(t)]); }
        });
        this.update(updates);
      });
  }
  protected update(updates: Array<[vscode.Range, string]>): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return; }

    editor.edit((builder) => {
      updates.map(([sel, t]) => builder.replace(sel, t));
    });
  }
  protected abstract functionMap(): Array<{ label: string, fn: (s: string) => string }>;
}
