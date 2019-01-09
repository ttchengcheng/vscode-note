import * as vscode from 'vscode';
import * as cc from 'change-case';

export { cmdChangeCase };

function cmdChangeCase() {
  // Display a message box to the user
  const editor = vscode.window.activeTextEditor;
  if (!editor) { return; }

  const doc = editor.document;
  if (!doc) { return; }

  let items: vscode.QuickPickItem[] = [];

  items.push({ label: "PascalCase" });
  items.push({ label: "camelCase" });
  items.push({ label: "lisp-case" });
  items.push({ label: "COBOL-CASE" });
  items.push({ label: "snake_case" });
  items.push({ label: "path/case" });

  vscode.window.showQuickPick(items)
    .then((selectedItem) => {
      if (!selectedItem) { return; }

      const updates: [vscode.Range, string][] = [];
      editor.selections.map(sel => {
        let t = doc.getText(sel);
        if (!t) { return; }

        switch (selectedItem.label) {
          case "PascalCase":
            t = cc.pascal(t);
            break;
          case "camelCase":
            t = cc.camel(t);
            break;
          case "lisp-case":
            t = cc.param(t);
            break;
          case "COBOL-CASE":
            t = cc.constant(t);
            break;
          case "snake_case":
            t = cc.snake(t);
            break;
          case "path/case":
            t = cc.pathCase(t);
          default:
            break;
        }
        updates.push([sel, t]);
      });
      editor.edit((builder) => {
        updates.map(([sel, t]) =>builder.replace(sel, t));
      });
    });
}