*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Verify Page Has Readable Text And Close Test Context

*** Test Cases ***
# เคสสร้างเอกสารใหม่และตรวจว่าหน้า editor เปิดขึ้น
TC-CRE-001: Click create new document and redirect to editor
    # ขั้นตอน: ล็อกอิน เปิดหน้ารายการ กดสร้างเอกสาร และตรวจช่องชื่อเอกสาร
    Login To System
    Go To Documents Page
    Create A New Document
    Wait For Elements State    ${INPUT_TITLE}    visible
    Wait For Elements State    ${INPUT_EDITOR}    visible

# เคสเปลี่ยนชื่อเอกสารและตรวจข้อความภาษาไทยใน editor
TC-EDT-001: Rename document title and monitor live Thai statistics
    # ขั้นตอน: ล็อกอิน เปลี่ยนชื่อ ตรวจค่าชื่อ และกรอกข้อความใน editor
    Login To System
    Go To And Pause    ${DOCS_EDITOR_URL}
    Fill Text    ${INPUT_TITLE}    รายงานผลการวิเคราะห์ภาษาไทย 2569
    ${title}=    Get Attribute    ${INPUT_TITLE}    value
    Should Be Equal    ${title}    รายงานผลการวิเคราะห์ภาษาไทย 2569
    Fill Text    ${INPUT_EDITOR}    ระบบตรวจสอบไวยากรณ์ภาษาไทยรุ่นใหม่ล่าสุด
    Get Text    ${INPUT_EDITOR}    contains    ระบบตรวจสอบไวยากรณ์ภาษาไทยรุ่นใหม่ล่าสุด

# เคสตรวจการบันทึกอัตโนมัติและคำสั่งบันทึก Ctrl+S
TC-EDT-002: Debounced auto-save and manual Ctrl+S shortcut
    # ขั้นตอน: กรอกข้อความรอสถานะบันทึก แล้วแก้ข้อความและสั่งบันทึกด้วย Ctrl+S
    Login To System
    Go To And Pause    ${DOCS_EDITOR_URL}
    Fill Text    ${INPUT_EDITOR}    ทดสอบ Auto-save
    Wait For Elements State    text=บันทึกแล้ว    visible    timeout=10s
    Fill Text    ${INPUT_EDITOR}    ทดสอบ Manual Save
    Press Keys    ${INPUT_EDITOR}    Control+s
    Wait For Elements State    text=บันทึกแล้ว    visible    timeout=10s
    Get Text    ${INPUT_EDITOR}    contains    ทดสอบ Manual Save
