*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Close Test Context

*** Test Cases ***
TC-AI-002: Trigger AI Grammar Check
    Login To System
    Go To And Pause    ${DOCS_EDITOR_URL}
    Fill Text    ${INPUT_EDITOR}    สวัดดีตอนเช้า
    Click    role=button[name="ตรวจสอบ"]

TC-TON-001: Switch writing tone between Strict and Casual
    Login To System
    Go To And Pause    ${DOCS_EDITOR_URL}
    Click    xpath=//button[.//svg[contains(@class, 'lucide-languages')]]
    Wait For Elements State    text=เลือกโทนภาษาที่ต้องการปรับ    visible    timeout=10s

TC-HIS-001: Accept AI correction suggestion and verify history
    Login To System
    Go To And Pause    ${DOCS_EDITOR_URL}
    Fill Text    ${INPUT_EDITOR}    ทกสอก
    Click    role=button[name="ตรวจสอบ"]
    Wait For Elements State    role=button[name="แก้ไข"]    visible    timeout=30s
    Click    role=button[name="แก้ไข"]
    Get Text    ${INPUT_EDITOR}    contains    ทดสอบ
    Click    role=button[name="ประวัติ 1"]
    Wait For Elements State    text=แก้ไขแล้ว    visible    timeout=10s
