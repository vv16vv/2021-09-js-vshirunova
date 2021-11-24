const {Duplex} = require("stream")

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
            const lastSpace = data.lastIndexOf(" ")
            this._numbers = this._numbers
                .concat((this._prev + data.slice(0, lastSpace)).split(" "))
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
            this._numbers = this._numbers.concat(this._prev.split(" "))
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