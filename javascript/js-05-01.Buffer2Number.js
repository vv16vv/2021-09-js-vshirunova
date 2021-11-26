const {Duplex} = require("stream")
const consts = require("./js-05-01.const");

class Buffer2Number extends Duplex {
    constructor(options = {
        writableObjectMode: true
    }) {
        super(options)

        this._prev = ""
        this._numbers = []
        this._isFinished = false
    }

    isFinished() {
        return this._isFinished
    }

    _write(chunk, encoding, callback) {
        if (chunk !== null) {
            const data = chunk.toString()
            const lastSpace = data.lastIndexOf(consts.NUMBER_SEPARATOR)
            this._numbers = this._numbers
                .concat((this._prev + data.slice(0, lastSpace)).split(consts.NUMBER_SEPARATOR))
            this._prev = data.slice(lastSpace + 1)
        }
        while (this._numbers.length > 0) {
            this.push(this._numbers.shift())
        }
        callback()
    }

    _read(size = 1) {
    }

    _final(callback) {
        if (this._prev !== "") {
            this._numbers = this._numbers.concat(this._prev.split(consts.NUMBER_SEPARATOR))
            this._prev = ""
        }
        while (this._numbers.length > 0) {
            this.push(this._numbers.shift())
        }
        this._isFinished = true
        callback()
    }
}

module.exports = {
    Buffer2Number
}