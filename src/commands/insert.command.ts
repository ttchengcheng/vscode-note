import * as dayjs from 'dayjs';
import * as vscode from 'vscode';
import { StringTransform } from './string-transform.command';

export { Insert };

function getDateString() {
    let settings = vscode.workspace.getConfiguration('note.format').get<string>('date');
    settings = settings || 'YY/MM/DD';

    const s = dayjs().format(settings);
    return s;
}

class Insert extends StringTransform {
    protected functionMap() {
        return [
            { label: 'Date', fn: getDateString },
        ];
    }
}
