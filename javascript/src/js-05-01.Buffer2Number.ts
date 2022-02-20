import {
    Transform,
    TransformCallback,
    TransformOptions,
} from "stream"

import {NUMBER_SEPARATOR} from "./js-05-01.const"

export class Buffer2Number extends Transform {
    _prev: string
    _numbers: Array<string>

    constructor(options: TransformOptions = {
        writableObjectMode: true,
    }) {
        super(options)

        this._prev = ""
        this._numbers = []
    }

    _transform(chunk: string, encoding: string, callback: TransformCallback) {
        if (chunk !== null) {
            const data = chunk.toString()
            const lastSpace = data.lastIndexOf(NUMBER_SEPARATOR)
            this._numbers = this._numbers
                .concat((this._prev + data.slice(0, lastSpace)).split(NUMBER_SEPARATOR))
            this._prev = data.slice(lastSpace + 1)
        }
        while (this._numbers.length > 0) {
            this.push(this._numbers.shift())
        }
        callback()
    }

    _flush(callback: TransformCallback) {
        if (this._prev !== "") {
            this._numbers = this._numbers.concat(this._prev.split(NUMBER_SEPARATOR))
            this._prev = ""
        }
        while (this._numbers.length > 0) {
            this.push(this._numbers.shift())
        }
        callback()
    }
}
