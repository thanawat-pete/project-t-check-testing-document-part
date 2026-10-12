*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Close Test Context

*** Test Cases ***
# เคสตรวจสอบการเปลี่ยนเส้นทางผู้ใช้ที่ยังไม่ได้เข้าสู่ระบบ
Guest User Should Be Redirected To Editor
    [Documentation]    Test that unauthenticated users are redirected to the editor when trying to access the docs list.
    # ขั้นตอน: เปิดหน้ารายการเอกสารโดยไม่ล็อกอิน แล้วตรวจว่า URL เปลี่ยนไปหน้า editor
    Go To And Pause    ${DOCS_URL}
    Wait For URL And Pause    /docs/editor
