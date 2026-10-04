*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource

*** Test Cases ***
TC-GST-001: Guest navigating to /docs is redirected to /docs/editor
    New Context
    Go To    ${DOCS_URL}
    Wait For Condition    URL    contains    /docs/editor

TC-GST-002: Guest types text and draft is restored after page reload
    New Context
    Go To    ${DOCS_EDITOR_URL}
    Fill Text    .ProseMirror    ข้อความร่างสำหรับทดสอบระบบ Guest
    Sleep    2.5s
    Reload
    Wait For Elements State    .ProseMirror    visible
    Get Text    .ProseMirror    contains    ข้อความร่างสำหรับทดสอบระบบ Guest
