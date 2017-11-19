'use babel'
import { join } from 'path'
import LinterEsprimaProvider from '../lib/linter-esprima-provider'

const { atom, describe, beforeEach, it, expect } = global

const fixture = (name) => join(__dirname, 'files', name)

describe('LinterEsprimaProvider', () => {
  beforeEach(() => atom.packages.activatePackage('linter-esprima'))

  describe('lint()', () => {
    it('retuns 3 syntax errors', async () => {
      const editor = await atom.workspace.open(fixture('syntax-errors.js'))
      const messages = await LinterEsprimaProvider.lint(editor)

      expect(messages.length).toEqual(3)

      expect(messages[0].text).toEqual('Syntax error: Illegal return statement')
      expect(messages[0].range).toEqual([[0, 0], [0, 52]])

      expect(messages[1].text).toEqual('Syntax error: Octal literals are not allowed in strict mode.')
      expect(messages[1].range).toEqual([[6, 2], [6, 14]])

      expect(messages[2].text).toEqual('Syntax error: Strict mode code may not include a with statement')
      expect(messages[2].range).toEqual([[12, 2], [12, 13]])
    })

    it('retuns 1 parse error (unexpected end)', async () => {
      const editor = await atom.workspace.open(fixture('parse-error-unexpected-end.js'))
      const messages = await LinterEsprimaProvider.lint(editor)

      expect(messages.length).toEqual(1)

      expect(messages[0].text).toEqual('Parse error: Unexpected end of input')
      expect(messages[0].range).toEqual([[1, 0], [1, 0]])
    })

    it('retuns 1 parse error (unexpected token)', async () => {
      const editor = await atom.workspace.open(fixture('parse-error-unexpected-token.js'))
      const messages = await LinterEsprimaProvider.lint(editor)

      expect(messages.length).toEqual(1)

      expect(messages[0].text).toEqual('Parse error: Unexpected token ;')
      expect(messages[0].range).toEqual([[0, 0], [0, 13]])
    })
  })
})
