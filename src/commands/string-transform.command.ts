import * as vscode from 'vscode';

export { EditUpdate, StringTransform };

interface EditUpdate {
  range: vscode.Range;
  newText: string;
}
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

        const updates: EditUpdate[] = [];
        editor.selections.map((sel) => {
          const t = doc.getText(sel);
          if (!t) { return; }

          const fnItem = functions.find(({ label }) => (label === selectedItem.label));
          if (fnItem && fnItem.fn) { updates.push({ range: sel, newText: fnItem.fn(t) }); }
        });
        this.update(updates);
      });
  }
  protected update(updates: EditUpdate[]): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return; }

    editor.edit((builder) => {
      updates.map(({ range: sel, newText: t }) => builder.replace(sel, t));
    });
  }
  protected abstract functionMap(): Array<{ label: string, fn: (s: string) => string }>;
}
