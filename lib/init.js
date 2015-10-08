"use babel"

import LinterEsprimaProvider from './linter-esprima-provider'

module.exports = {
  activate() {
    if (atom.inDevMode()) {
      console.log('activate linter-esprima')
    }
  },

  provideLinter() { return LinterEsprimaProvider }
}
