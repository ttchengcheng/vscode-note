import { Base64 } from 'js-base64';
import { StringTransform } from './string-transform.command';

export { CommonTransform };

class CommonTransform extends StringTransform {
  protected functionMap() {
    const functions: Array<{ label: string, fn: (s: string) => string }> = [
      { label: 'Upper', fn: (s: string) => s.toUpperCase() },
      { label: 'lower', fn: (s: string) => s.toLowerCase() },
      { label: 'escape', fn: encodeURIComponent },
      { label: 'unescape', fn: decodeURIComponent },
      { label: 'escapeURI', fn: encodeURI },
      { label: 'unescapeURI', fn: decodeURI },
      { label: 'en-base64', fn: Base64.encode },
      { label: 'de-base64', fn: Base64.decode },
    ];
    return functions;
  }
}
