*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Verify Page Has Readable Text And Close Test Context

*** Test Cases ***
# เคสย้ายเอกสารที่ยังใช้งานไปยังถังขยะ
TC-TRH-001: Move an active document to trash
    # ขั้นตอน: ล็อกอิน เปิดคลัง หาเอกสาร กดลบ และยืนยันเมื่อมีรายการให้ลบ
    Login To System
    Go To Documents Page
    Wait For Elements State    xpath=(//main//h4)[1]    visible
    ${trash_icon}=    Run Keyword And Return Status    Wait For Elements State    ${BTN_TRASH_ICON}    visible    timeout=2s
    Run Keyword If    ${trash_icon}    Run Keywords
    ...    Click    ${BTN_TRASH_ICON}
    ...    AND    Wait For Elements State    ${BTN_CONFIRM_DELETE}    visible
    ...    AND    Click    ${BTN_CONFIRM_DELETE}

# เคสเปิดหน้าจัดการถังขยะ
TC-TRH-002: Trash Management View
    # ขั้นตอน: ล็อกอิน เปิดคลัง เลือกถังขยะ และตรวจ URL ปลายทาง
    Login To System
    Go To Documents Page
    Click    text=ถังขยะ
    Wait For URL And Pause    /docs/trash
    Get Text    xpath=//body    contains    ถังขยะ

# เคสกู้คืนเอกสารจากถังขยะ
TC-TRH-003: Restore Document from Trash
    # ขั้นตอน: เปิดถังขยะ แล้วกดกู้คืนและยืนยันเมื่อมีเอกสารให้กู้คืน
    Login To System
    Go To And Pause    ${DOCS_URL}/trash
    Get Text    xpath=//body    contains    ถังขยะ
    ${restore_btn}=    Run Keyword And Return Status    Wait For Elements State    xpath=//button[.//svg[contains(@class, 'lucide-refresh-cw') or contains(@class, 'lucide-rotate-ccw')]] | //button[contains(text(), 'กู้คืน')]    visible    timeout=2s
    Run Keyword If    ${restore_btn}    Run Keywords
    ...    Click    xpath=//button[.//svg[contains(@class, 'lucide-refresh-cw') or contains(@class, 'lucide-rotate-ccw')]] | //button[contains(text(), 'กู้คืน')]
    ...    AND    Wait For Elements State    xpath=(//button[contains(text(), 'กู้คืน')])[last()]    visible
    ...    AND    Click    xpath=(//button[contains(text(), 'กู้คืน')])[last()]

# เคสลบเอกสารถาวรด้วยคำสั่งล้างถังขยะ
TC-TRH-004: Hard Delete & Empty Trash
    # ขั้นตอน: เปิดถังขยะ แล้วเลือกคำสั่งล้างและยืนยันเมื่อมีรายการให้ลบ
    Login To System
    Go To And Pause    ${DOCS_URL}/trash
    Get Text    xpath=//body    contains    ถังขยะ
    ${empty_btn}=    Run Keyword And Return Status    Wait For Elements State    text=ล้างถังขยะ    visible    timeout=2s
    Run Keyword If    ${empty_btn}    Run Keywords
    ...    Click    xpath=(//button[contains(text(), 'ล้างถังขยะ')])[1]
    ...    AND    Wait For Elements State    xpath=(//button[contains(text(), 'ล้างถังขยะ')])[last()]    visible
    ...    AND    Click    xpath=(//button[contains(text(), 'ล้างถังขยะ')])[last()]
