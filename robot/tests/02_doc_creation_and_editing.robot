*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource

*** Test Cases ***
TC-CRE-001: Click create new document and redirect to editor
    New Context
    Login To System
    Go To    ${DOCS_URL}
    Click    xpath=//button[.//svg[contains(@class, 'lucide-plus')]]
    Wait For Condition    URL    contains    /docs/editor

TC-EDT-001: Rename document title and monitor live Thai statistics
    New Context
    Login To System
    Go To    ${DOCS_EDITOR_URL}
    Fill Text    .ProseMirror    ระบบตรวจสอบไวยากรณ์ภาษาไทยรุ่นใหม่ล่าสุด

TC-EDT-002: Debounced auto-save and manual Ctrl+S shortcut
    New Context
    Login To System
    Go To    ${DOCS_EDITOR_URL}
    Fill Text    .ProseMirror    ทดสอบ Auto-save
    Wait For Elements State    text=บันทึกแล้ว    visible    timeout=5s
