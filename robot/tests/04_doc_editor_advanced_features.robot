*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource

*** Test Cases ***
TC-AI-002: Trigger AI Grammar Check and Accept Correction
    New Context
    Login To System
    Go To    ${DOCS_EDITOR_URL}
    Fill Text    .ProseMirror    ทกสอก
    ${check_btn_visible}=    Run Keyword And Return Status    Wait For Elements State    xpath=//button[contains(text(), 'ตรวจสอบ')]    visible    timeout=2s
    Run Keyword If    ${check_btn_visible}    Click    xpath=//button[contains(text(), 'ตรวจสอบ')]
    Wait For Elements State    xpath=//button[contains(text(), 'แก้ไข')]    visible    timeout=10s
    Click    xpath=(//button[contains(text(), 'แก้ไข')])[1]
    Get Text    .ProseMirror    contains    ทดสอบ
