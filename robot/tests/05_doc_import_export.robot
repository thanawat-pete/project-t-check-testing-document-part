*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Verify Page Has Readable Text And Close Test Context

*** Test Cases ***
# เคสตรวจว่าหน้าคลังเอกสารแสดงทางเลือกนำเข้าไฟล์
TC-IMP-001: Import local text file into document
    # ขั้นตอน: ล็อกอิน เปิดหน้าคลัง เปิดเมนู Import และตรวจตัวเลือกประเภทไฟล์
    Login To System
    Go To Documents Page
    Wait For Elements State    text=Import    visible
    Click    text=Import
    Wait For Elements State    role=button[name="File (TXT, DOCX, PDF)"]    visible

# เคสเปิดเมนูส่งออกเอกสารจากหน้า editor
TC-EXP-001: Open Export modal and select export format
    # ขั้นตอน: เปิดเมนูส่งออก ตรวจรูปแบบ PDF/Word เลือก PDF แล้วตรวจ toast
    Login To System
    Go To And Pause    ${DOCS_EDITOR_URL}
    Wait For Elements State    css=button:has(svg.lucide-download)    visible
    Click    css=button:has(svg.lucide-download)
    Wait For Elements State    xpath=//button[contains(., 'PDF')]    visible
    Wait For Elements State    text=Word Document (.docx)    visible
    Click    xpath=//button[contains(., 'PDF')]
    Wait For Elements State    role=status    visible
    Get Text    role=status    contains    ไม่มีเนื้อหาให้ส่งออก
