*** Settings ***
Library     Browser
Resource    variables.resource

*** Keywords ***
Login To System
    [Arguments]    ${email}=${TEST_USER_EMAIL}    ${password}=${TEST_USER_PASSWORD}
    New Page       ${LOGIN_URL}
    Fill Text      ${INPUT_EMAIL}       ${email}
    Fill Text      ${INPUT_PASSWORD}    ${password}
    Click          ${BTN_LOGIN}
    # Wait until home page is loaded (since redirect goes to /)
    Wait For Condition    URL    ==    ${BASE_URL}/

Go To Documents Page
    Go To    ${DOCS_URL}
    Wait For Elements State    ${BTN_CREATE_DOC}    visible    timeout=10s

Create A New Document
    Click    ${BTN_CREATE_DOC}
    Wait For Condition    URL    contains    ${DOCS_EDITOR_URL}

Search For Document
    [Arguments]    ${keyword}
    Fill Text      ${INPUT_SEARCH_DOC}    ${keyword}

Delete First Document
    # Click the first trash icon on the document cards
    Click    (${BTN_TRASH_ICON})[1]
    # Click confirm delete
    Click    ${BTN_CONFIRM_DELETE}
    # Wait for success toast
    Wait For Elements State    text=ลบเอกสารสำเร็จ    visible    timeout=5s

Verify Document Not Found
    Wait For Elements State    text=ไม่พบเอกสารที่ตรงกับคำค้นหา    visible    timeout=5s

Save Document Without Name
    # Type something so it can save
    Fill Text    .ProseMirror    ทดสอบเอกสารไม่มีชื่อ
    # Click save button
    Click    ${BTN_SAVE_DOC}
    Sleep    2s
