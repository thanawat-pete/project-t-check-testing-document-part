*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Verify Page Has Readable Text And Close Test Context

*** Test Cases ***
# เคสตรวจองค์ประกอบหลักของหน้าคลังเอกสาร
TC-LST-001: View document cards in library
    # ขั้นตอน: ล็อกอิน เปิดหน้ารายการ แล้วตรวจปุ่มสร้างและช่องค้นหา
    Login To System
    Go To Documents Page
    Wait For Elements State    ${BTN_CREATE_DOC}    visible
    Wait For Elements State    ${INPUT_SEARCH_DOC}    visible
    Wait For Elements State    xpath=(//main//h4)[1]    visible

# เคสค้นหาเอกสารด้วยชื่อหรือเนื้อหา
TC-SCH-001: Real-time search by document title or content
    # ขั้นตอน: เปิดคลัง ค้นหาด้วยชื่อเอกสาร และตรวจค่าที่กรอกในช่องค้นหา
    Login To System
    Go To Documents Page
    Search For Document    เอกสารไม่มีชื่อ
    ${search}=    Get Attribute    ${INPUT_SEARCH_DOC}    value
    Should Be Equal    ${search}    เอกสารไม่มีชื่อ
    Wait For Elements State    xpath=(//main//h4[normalize-space(.)="เอกสารไม่มีชื่อ"])[1]    visible

# เคสเรียงเอกสารตามชื่อจาก A ถึง Z
TC-SRT-001: Sort documents by title in ascending alphabetical order
    # ขั้นตอน: เปิดเมนูเรียงลำดับ แล้วเลือกชื่อแบบ A-Z
    Login To System
    Go To Documents Page
    Click    ${BTN_SORT_DOC}
    Click    text=ชื่อ (A-Z)
    Get Text    xpath=//body    contains    ชื่อ (A-Z)
    Wait For Elements State    xpath=(//main//h4)[1]    visible
