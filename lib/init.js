'use babel'

import LinterEsprimaProvider from './linter-esprima-provider'

const { atom } = global

module.exports = {
  activate () {
    if (atom.inDevMode() && !atom.inSpecMode()) {
      console.log('activate linter-esprima')
    }
    require('atom-package-deps').install('linter-esprima')
  },

  provideLinter () { return LinterEsprimaProvider }
}
