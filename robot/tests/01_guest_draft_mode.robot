*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Close Test Context

*** Test Cases ***
# เคสผู้เยี่ยมชมเปิดหน้ารายการเอกสารแล้วถูกส่งไปหน้า editor
TC-GST-001: Guest navigating to /docs is redirected to /docs/editor
    # ขั้นตอน: เข้าหน้า /docs โดยไม่ล็อกอิน และตรวจ URL ปลายทาง
    Go To And Pause    ${DOCS_URL}
    Wait For URL And Pause    /docs/editor

# เคสข้อความร่างของผู้เยี่ยมชมยังอยู่หลังรีโหลดหน้า
TC-GST-002: Guest types text and draft is restored after page reload
    # ขั้นตอน: กรอกข้อความ รอระบบบันทึกอัตโนมัติ รีโหลด แล้วตรวจข้อความเดิม
    Go To And Pause    ${DOCS_EDITOR_URL}
    Fill Text    ${INPUT_EDITOR}    ข้อความร่างสำหรับทดสอบระบบ Guest
    Sleep    2.5s
    Reload
    Sleep    3s
    Wait For Elements State    .ProseMirror    visible
    Get Text    .ProseMirror    contains    ข้อความร่างสำหรับทดสอบระบบ Guest

# เคสตรวจสอบโควตาเริ่มต้นของผู้เยี่ยมชม
TC-GST-003: Guest token quota is initialized to 1000 tokens
    # ขั้นตอน: เปิด editor และตรวจว่ามีโควตา 1,000 tokens แสดงอยู่
    Go To And Pause    ${DOCS_EDITOR_URL}
    Wait For Elements State    text=1,000    visible    timeout=10s
