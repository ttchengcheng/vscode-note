import * as vscode from 'vscode';
import { openUrl } from '../util/vscode-util';

export { StringService };

class StringService {
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

        const fnItem = functions.find(({ label }) => (label === selectedItem.label));
        if (!fnItem || !fnItem.fn) { return; }

        fnItem.fnGetText().map((t) => {
          if (!t) { return; }
          fnItem.fn(t);
        });
      });
  }
  protected functionMap() {
    const getPackageName = () => {
      const names: string[] = [];
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.document) {
        if (editor.selection.isEmpty) {
          const line = editor.document.getText(editor.document.lineAt(editor.selection.start).range);
          const regex = new RegExp(/\bfrom\s+\'(.+)\';?$/);
          const result = regex.exec(line.replace('"', '\'').replace('require', 'import'));
          if (result) {
            names.push(result[1]);
          }
        } else {
          names.push(editor.document.getText(editor.selection));
        }
      }
      return names;
    };

    const functions: Array<{ label: string, fn: (s: string) => void, fnGetText: () => string[] }> = [
      { label: 'introduction', fn: (s: string) => { openUrl(`https://www.npmjs.com/package/${s}`); }, fnGetText: getPackageName },
      { label: 'dependencies', fn: (s: string) => { openUrl(`http://npm.anvaka.com/#/view/2d/${s}`); }, fnGetText: getPackageName },
      { label: 'size', fn: (s: string) => { openUrl(`https://bundlephobia.com/result?p=${s}`); }, fnGetText: getPackageName },
    ];
    return functions;
  }
}
