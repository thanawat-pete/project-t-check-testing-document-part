*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Close Test Context

*** Test Cases ***
# เคสตรวจว่า User B ไม่สามารถเห็นเอกสารที่สร้างโดย User A
TC-SEC-001: User B cannot see User A documents
    # ขั้นตอน: ล็อกอินเป็น A สร้างเอกสารชื่อเฉพาะ และตรวจว่าบันทึกในคลังแล้ว
    Login To System
    Go To Documents Page
    ${unique_suffix}=    Evaluate    str(uuid.uuid4())    modules=uuid
    ${user_a_document}=    Set Variable    TC-SEC-001-${unique_suffix}
    Create A New Document
    Fill Text    ${INPUT_TITLE}    ${user_a_document}
    Sleep    3s
    Wait For Elements State    text=บันทึกแล้ว    visible    timeout=15s
    Go To Documents Page
    Wait For Elements State    text=${user_a_document}    visible    timeout=10s
    # ขั้นตอน: เปลี่ยน context ล็อกอินเป็น B แล้วตรวจว่าเอกสารของ A ไม่ปรากฏ
    Close Context
    New Context
    New Page    about:blank
    Login As Second Test User
    Go To Documents Page
    ${user_b_documents}=    Get Text    xpath=//main
    Should Not Contain    ${user_b_documents}    ${user_a_document}
