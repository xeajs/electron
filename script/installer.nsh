!include WordFunc.nsh
!define SERVER_MIN_VERSION 115
!define IP_CONFIG_PATH "C:\voice_identify\ipConfig.json"
!define CLIENT_VERSION "2.8.2"
!define ERROR_MESSAGE "无法安装校验，请先确定网络是否正常。若网络正常，请与系统运维人员联系进行处理。(当前客户端版本为v${VERSION})"

!macro customInit
    ${If} ${FileExists} ${IP_CONFIG_PATH}
        nsJSON::Set /file "${IP_CONFIG_PATH}"
        nsJSON::Get "ip" /end
        Pop $1
        nsJSON::Get "port" /end
        Pop $2
        inetc::post "{}" /header "Content-Type:application/json;charset=utf-8$\r$\nClient-Version:${CLIENT_VERSION}" "http://$1:$2/call?id=experts.ListVersion&v=" "$TEMP\output.json" /END
        Pop $3
        StrCmp $3 "OK" success error
        error:
            MessageBox MB_OK "${ERROR_MESSAGE}"
            Quit
            Abort
        success:
            nsJSON::Set /file "$TEMP\output.json"
            ClearErrors
            nsJSON::Get "hasError" /end
            ${If} ${Errors}
                MessageBox MB_OK "${ERROR_MESSAGE}"
                Quit
            ${EndIf}
            nsJSON::Get "data" "version" /end
            Pop $4
            ${WordFind} "$4" "-" +2 $5
            ${If} $5 < ${SERVER_MIN_VERSION}
                MessageBox MB_OK "当前客户端版本(v${VERSION})与服务端版本($4)不匹配，请与系统运维人员联系进行处理，再尝试安装。"
                Quit
            ${EndIf}
    ${EndIf}
!macroend

!macro customUnInstall
    DeleteRegKey HKCR "SpeakinJd"
!macroend
