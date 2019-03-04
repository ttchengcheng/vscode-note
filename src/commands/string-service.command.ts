import * as vscode from 'vscode';
import { openUrl } from '../util/vscode-util';

export { StringService };

function getPackageName() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || !editor.document) { return ''; }

  if (!editor.selection.isEmpty) {
    return editor.document.getText(editor.selections[0]);
  }

  const line = editor.document
    .getText(editor.document.lineAt(editor.selection.start).range)
    .replace('"', '\'');

  // style like `import xx from 'module'`, get 'module'
  let result = new RegExp(/\bfrom\s+\'(.+)\'\s*;?$/).exec(line);
  if (result) { return result[1]; }

  // style like `const xx = require('module')` or `import xx = require("module")`, get 'module'
  result = new RegExp(/\brequire\s*\(\s*\'(.+)\'\s*\)\s*;?$/).exec(line);
  if (result) { return result[1]; }

  return '';
}

function googleTranslate(s: string) {
  if (!s) { return; }
  const firstCharCode = s.codePointAt(0);
  if (firstCharCode === (void 0)) { return; }

  // 65 is 'A' and 122 is 'z'
  if (firstCharCode >= 65 && firstCharCode <= 122) { // English => Chinese
    openUrl(`https://translate.google.cn/#view=home&op=translate&sl=en&tl=zh-CN&text=${s}`);
  } else { // Chinese => English
    openUrl(`https://translate.google.cn/#view=home&op=translate&sl=zh-CN&tl=en&text=${s}`);
  }
}

class StringService {
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

    const fnItem = functions.find(({ label }) => (label === selectedItem.label));
    if (!fnItem || !fnItem.fn) { return; }

    const text = fnItem.fnGetText();
    if (!text) { return; }
    fnItem.fn(text);
  }

  protected functionMap() {
    const functions: Array<{ label: string, fn: (s: string) => void, fnGetText: () => string }> = [
      { label: 'introduction(npm package)', fn: (s: string) => { openUrl(`https://www.npmjs.com/package/${s}`); }, fnGetText: getPackageName },
      { label: 'dependencies(npm package)', fn: (s: string) => { openUrl(`https://npm.anvaka.com/#/view/2d/${s}`); }, fnGetText: getPackageName },
      { label: 'size(npm package)', fn: (s: string) => { openUrl(`https://bundlephobia.com/result?p=${s}`); }, fnGetText: getPackageName },
      { label: 'translate', fn: googleTranslate, fnGetText: getPackageName },
    ];
    return functions;
  }
}
