import * as vscode from 'vscode';

export { TransformUpdate, StringTransform };

interface TransformUpdate {
  range: vscode.Range;
  transformedText: string;
}
abstract class StringTransform {
  public async exec() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return; }

    const doc = editor.document;
    if (!doc) { return; }

    const functions = this.functionMap();

    // show a drop-down list
    const items: vscode.QuickPickItem[] = functions.map(({ label }) => {
      return { label };
    });
    const selectedItem = await vscode.window.showQuickPick(items);
    if (!selectedItem) { return; }

    // transform every range of selected text
    // 1. collect all updates
    const updates: TransformUpdate[] = [];
    editor.selections.map((sel: vscode.Selection) => {
      const text = doc.getText(sel);
      if (!text) { return; }

      const fnItem = functions.find(({ label }) => (label === selectedItem.label));
      if (fnItem && fnItem.fn) { updates.push({ range: sel, transformedText: fnItem.fn(text) }); }
    });
    // 2. update all at once
    this.update(updates);
  }
  protected update(updates: TransformUpdate[]): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return; }

    editor.edit((builder: vscode.TextEditorEdit) => {
      updates.map(({ range: sel, transformedText: t }) => builder.replace(sel, t));
    });
  }
  protected abstract functionMap(): Array<{ label: string, fn: (s: string) => string }>;
}
