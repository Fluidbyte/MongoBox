import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-twilight'

const Editor = ({ value, setValue, setValid, readOnly }) => {
  return (
    <AceEditor
      mode='json'
      theme='twilight'
      onChange={(val) => {
        setValue && setValue(val)
        if (setValue && typeof setValid === 'function') {
          try {
            JSON.parse(val)
            setValid(true)
          } catch (e) {
            setValid(false)
          }
        }
      }}
      value={value}
      name='editor'
      editorProps={{ $blockScrolling: true }}
      setOptions={{ useWorker: false }}
      width='100%'
      height='inherit'
      fontSize='.9em'
      onLoad={(editor) => {
        editor.renderer.setPadding(15)
        editor.renderer.setScrollMargin(10)
      }}
      readOnly={readOnly}
    />
  )
}

export default Editor
