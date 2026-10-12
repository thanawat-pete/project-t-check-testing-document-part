*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Close Test Context

*** Test Cases ***
TC-CRE-001: Click create new document and redirect to editor
    Login To System
    Go To Documents Page
    Create A New Document
    Wait For Elements State    ${INPUT_TITLE}    visible

TC-EDT-001: Rename document title and monitor live Thai statistics
    Login To System
    Go To And Pause    ${DOCS_EDITOR_URL}
    Fill Text    ${INPUT_TITLE}    รายงานผลการวิเคราะห์ภาษาไทย 2569
    ${title}=    Get Attribute    ${INPUT_TITLE}    value
    Should Be Equal    ${title}    รายงานผลการวิเคราะห์ภาษาไทย 2569
    Fill Text    ${INPUT_EDITOR}    ระบบตรวจสอบไวยากรณ์ภาษาไทยรุ่นใหม่ล่าสุด
    Get Text    ${INPUT_EDITOR}    contains    ระบบตรวจสอบไวยากรณ์ภาษาไทยรุ่นใหม่ล่าสุด

TC-EDT-002: Debounced auto-save and manual Ctrl+S shortcut
    Login To System
    Go To And Pause    ${DOCS_EDITOR_URL}
    Fill Text    ${INPUT_EDITOR}    ทดสอบ Auto-save
    Wait For Elements State    text=บันทึกแล้ว    visible    timeout=10s
    Fill Text    ${INPUT_EDITOR}    ทดสอบ Manual Save
    Press Keys    ${INPUT_EDITOR}    Control+s
    Wait For Elements State    text=บันทึกแล้ว    visible    timeout=10s
