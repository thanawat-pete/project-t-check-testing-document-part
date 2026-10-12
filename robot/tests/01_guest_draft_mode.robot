*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Close Test Context

*** Test Cases ***
TC-GST-001: Guest navigating to /docs is redirected to /docs/editor
    Go To And Pause    ${DOCS_URL}
    Wait For URL And Pause    /docs/editor

TC-GST-002: Guest types text and draft is restored after page reload
    Go To And Pause    ${DOCS_EDITOR_URL}
    Fill Text    ${INPUT_EDITOR}    ข้อความร่างสำหรับทดสอบระบบ Guest
    Sleep    2.5s
    Reload
    Sleep    3s
    Wait For Elements State    .ProseMirror    visible
    Get Text    .ProseMirror    contains    ข้อความร่างสำหรับทดสอบระบบ Guest

TC-GST-003: Guest token quota is initialized to 1000 tokens
    Go To And Pause    ${DOCS_EDITOR_URL}
    Wait For Elements State    text=1,000    visible    timeout=10s
