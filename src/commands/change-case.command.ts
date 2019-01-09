import * as cc from 'change-case';
import { StringTransform } from './string-transform.command';

export { ChangeCase };

class ChangeCase extends StringTransform {
  protected functionMap() {
    const functions: Array<{ label: string, fn: (s: string) => string }> = [
      { label: 'PascalCase', fn: cc.pascal },
      { label: 'camelCase', fn: cc.camel },
      { label: 'lisp-case', fn: cc.param },
      { label: 'COBOL-CASE', fn: cc.constant },
      { label: 'snake_case', fn: cc.snake },
      { label: 'path/case', fn: cc.path },
      { label: 'dot.case', fn: cc.dot },
    ];
    return functions;
  }
}
