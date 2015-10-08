"use babel"

import LinterEsprimaProvider from '../lib/linter-esprima-provider'

describe('LinterEsprimaProvider', () => {

  beforeEach(() => {
    waitsForPromise(() => atom.packages.activatePackage('linter-esprima'))
  })

  describe('lint()', () => {
    it('retuns 3 syntax errors', () => {
      waitsForPromise(() => {
        return atom.workspace.open('./files/syntax-errors.js')
          .then((editor) => LinterEsprimaProvider.lint(editor))
          .then((messages) => {
            expect(messages.length).toEqual(3)

            expect(messages[0].text).toEqual('Syntax error: Illegal return statement')
            expect(messages[0].range).toEqual([[0, 0], [0, 52]])

            expect(messages[1].text).toEqual('Syntax error: Octal literals are not allowed in strict mode.')
            expect(messages[1].range).toEqual([[6, 2], [6, 14]])

            expect(messages[2].text).toEqual('Syntax error: Strict mode code may not include a with statement')
            expect(messages[2].range).toEqual([[12, 2], [12, 13]])
          })
      })
    })

    it('retuns 1 parse error (unexpected end)', () => {
      waitsForPromise(() => {
        return atom.workspace.open('./files/parse-error-unexpected-end.js')
          .then((editor) => LinterEsprimaProvider.lint(editor))
          .then((messages) => {
            expect(messages.length).toEqual(1)

            expect(messages[0].text).toEqual('Parse error: Unexpected end of input')
            expect(messages[0].range).toEqual([[1, 0], [1, 0]])
          })
      })
    })

    it('retuns 1 parse error (unexpected token)', () => {
      waitsForPromise(() => {
        return atom.workspace.open('./files/parse-error-unexpected-token.js')
          .then((editor) => LinterEsprimaProvider.lint(editor))
          .then((messages) => {
            expect(messages.length).toEqual(1)

            expect(messages[0].text).toEqual('Parse error: Unexpected token ;')
            expect(messages[0].range).toEqual([[0, 0], [0, 13]])
          })
      })
    })
  })
})
