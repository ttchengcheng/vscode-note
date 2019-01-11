# Note

Note is a tiny VSCode extension

## Features

* change case

  change case of selected text in current editor

  shortcuts: `ctrl`+`shift`+`F1` on Windows / `cmd`+`shift`+`F1` on macOS

| style | before | after |
|---|---|---|
| PascalCase | Variable-Name | VariableName |
| lisp-case | Variable-Name | variable-name |
| COBOL-CASE | Variable-Name | VARIABLE_NAME |
| snake_case | Variable-Name | variable_name |
| path/case | Variable-Name | variable/name |
| dot.case | Variable-Name | variable.name |
| PascalCase | Variable-Name | VariableName |

* string transformation

  transform selected text in current editor

  shortcuts: `ctrl`+`shift`+`F2` on Windows / `cmd`+`shift`+`F2` on macOS

| style | before | after |
|---|---|---|
| Upper | Some String | SOME STRING |
| lower | Some String | some string |
| escape | /Some String | %2FSome%20String |
| unescape | %2FSome%20String | /Some String |
| escapeURI | /Some String | /Some%20String |
| unescapeURI | /Some%20String | /Some String |
| en-base64 | Some String | U29tZSBTdHJpbmc= |
| de-base64 | U29tZSBTdHJpbmc= | Some String |

* npm package service

  shortcuts: `ctrl`+`shift`+`F8` on Windows / `cmd`+`shift`+`F8` on macOS

| serivce |   |
|---|---|
| introduction | show package introduction page on `https://www.npmjs.com` |
| dependencies | show package dependency tree on `https://npm.anvaka.com` |
| size | show size of package on `https://bundlephobia.com` |

## Requirements

This extension has only tested on VSCode 1.30.0+

<!--

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.
-->

## Release Notes

### 0.0.1

Basic functions

## License

MIT
