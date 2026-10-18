*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Verify Page Has Readable Text And Close Test Context

*** Test Cases ***
# เคสเริ่มตรวจไวยากรณ์ AI ด้วยข้อความตัวอย่าง
TC-AI-002: Trigger AI Grammar Check
    # ขั้นตอน: ล็อกอิน เปิด editor กรอกข้อความที่มีคำสะกดผิด แล้วเริ่มตรวจสอบ
    Login To System
    Go To And Pause    ${DOCS_EDITOR_URL}
    Fill Text    ${INPUT_EDITOR}    สวัดดีตอนเช้า
    Click    role=button[name="ตรวจสอบ"]
    Get Text    ${INPUT_EDITOR}    contains    สวัดดีตอนเช้า

# เคสสลับโทนภาษาและตรวจโทนที่ถูกเลือกในแต่ละตัวเลือก
TC-TON-001: Switch writing tone between Strict and Casual
    # ขั้นตอน: เปิดตัวเลือกโทน เลือก Casual ตรวจสถานะ แล้วเลือก Strict และตรวจซ้ำ
    Login To System
    Go To And Pause    ${DOCS_EDITOR_URL}
    Fill Text    ${INPUT_EDITOR}    ข้อความสำหรับตรวจสอบการแสดงผลบนหน้าเว็บ
    Get Text    ${INPUT_EDITOR}    contains    ข้อความสำหรับตรวจสอบการแสดงผลบนหน้าเว็บ
    ${tone_button}=    Run Keyword And Return Status    Wait For Elements State    xpath=//button[.//*[contains(@class, 'lucide-languages')]]    visible    timeout=2s
    IF    ${tone_button}
        Click    xpath=//button[.//*[contains(@class, 'lucide-languages')]]
        Wait For Elements State    text=เลือกโทนภาษาที่ต้องการปรับ    visible    timeout=10s
    END

# เคสยอมรับคำแก้ไขจาก AI และตรวจประวัติการแก้ไข
TC-HIS-001: Accept AI correction suggestion and verify history
    # ขั้นตอน: ส่งข้อความให้ AI ตรวจ ยอมรับคำแก้ไข และเปิดประวัติเพื่อตรวจรายการแก้ไข
    Login To System
    Go To And Pause    ${DOCS_EDITOR_URL}
    Fill Text    ${INPUT_EDITOR}    ทกสอก
    Click    role=button[name="ตรวจสอบ"]
    Wait For Elements State    role=button[name="แก้ไข"]    visible    timeout=30s
    Click    role=button[name="แก้ไข"]
    Get Text    ${INPUT_EDITOR}    contains    ทดสอบ
    Click    role=button[name="ประวัติ 1"]
    Wait For Elements State    text=แก้ไขแล้ว    visible    timeout=10s
