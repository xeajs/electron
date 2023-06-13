#!macro 定义宏
#customInstall 会在文件安装后自动调用
#DetailPrint 执行打印
#DeleteRegKey 删除原有的注册表
#WriteRegStr 写入注册表
#$INSTDIR 所选的文件安装路径

#xeajs://
#项目启动时获取url协议传递的参数 `electron.remote.argv[1]` === `xeajs://******/`
!define PROTOCOL_NAME "xeajs"

#安装写入注册表
!macro customInstall
  #DetailPrint "Register ${PROTOCOL_NAME} URI Handler"
  DeleteRegKey HKCR "${PROTOCOL_NAME}"
  WriteRegStr HKCR "${PROTOCOL_NAME}" "" "URL:${PROTOCOL_NAME}"
  WriteRegStr HKCR "${PROTOCOL_NAME}" "URL Protocol" ""
  WriteRegStr HKCR "${PROTOCOL_NAME}\shell" "" ""
  WriteRegStr HKCR "${PROTOCOL_NAME}\shell\Open" "" ""
  WriteRegStr HKCR "${PROTOCOL_NAME}\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"
!macroend

#卸载删除注册表
!macro customUnInstall
  DeleteRegKey HKCR "${PROTOCOL_NAME}"
!macroend
