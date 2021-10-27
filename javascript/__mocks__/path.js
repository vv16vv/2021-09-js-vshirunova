const path = jest.createMockFromModule('path')

path.sep = "\\"
module.exports = path