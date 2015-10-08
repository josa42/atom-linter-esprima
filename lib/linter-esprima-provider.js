"use babel"

import esprima from 'esprima'

export default {

  name: "Esprima",

  grammarScopes: ['source.js'],

  scope: 'file',

  lintOnFly: true,

  lint: function(textEditor) {
    return new Promise((resolve) => {
      let errors
      try {
        const syntax = esprima.parse(textEditor.getText(), { tolerant: true })

        errors = (syntax.errors || [])
          .map(error => this.formate(error, textEditor, 'Syntax error'))


      } catch(error) {
        console.log('error', error)
        errors = [this.formate(error, textEditor, 'Parse error')]
      }

      resolve(errors)
    })
  },

  formate(error, textEditor, label) {

    const filePath = textEditor.getPath()
    const lineIdx = error.lineNumber - 1
    const line = textEditor.lineTextForBufferRow(lineIdx)
    let startIdx = 0, endIdx = 0

    if (line) {
      startIdx = line.replace(/^(\s*).*/, '$1').length
      endIdx = line.length
    }

    return {
      type: "Error",
      text: `${label}: ${error.description}`,
      filePath: filePath,
      range: [[lineIdx, startIdx], [lineIdx, endIdx]]
    }
  }
}
