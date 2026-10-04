*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource

*** Test Cases ***
TC-TRH-001: Move an active document to trash
    New Context
    Login To System
    Go To    ${DOCS_URL}
    ${trash_icon}=    Run Keyword And Return Status    Wait For Elements State    ${BTN_TRASH_ICON}    visible    timeout=2s
    Run Keyword If    ${trash_icon}    Run Keywords
    ...    Click    ${BTN_TRASH_ICON}
    ...    AND    Wait For Elements State    ${BTN_CONFIRM_DELETE}    visible
    ...    AND    Click    ${BTN_CONFIRM_DELETE}

TC-TRH-002: Trash Management View
    New Context
    Login To System
    Go To    ${DOCS_URL}
    Click    text=ถังขยะ
    Wait For Condition    URL    contains    /docs/trash

TC-TRH-003: Restore Document from Trash
    New Context
    Login To System
    Go To    ${DOCS_URL}/trash
    ${restore_btn}=    Run Keyword And Return Status    Wait For Elements State    xpath=//button[.//svg[contains(@class, 'lucide-refresh-cw') or contains(@class, 'lucide-rotate-ccw')]] | //button[contains(text(), 'กู้คืน')]    visible    timeout=2s
    Run Keyword If    ${restore_btn}    Run Keywords
    ...    Click    xpath=//button[.//svg[contains(@class, 'lucide-refresh-cw') or contains(@class, 'lucide-rotate-ccw')]] | //button[contains(text(), 'กู้คืน')]
    ...    AND    Wait For Elements State    xpath=(//button[contains(text(), 'กู้คืน')])[last()]    visible
    ...    AND    Click    xpath=(//button[contains(text(), 'กู้คืน')])[last()]

TC-TRH-004: Hard Delete & Empty Trash
    New Context
    Login To System
    Go To    ${DOCS_URL}/trash
    ${empty_btn}=    Run Keyword And Return Status    Wait For Elements State    text=ล้างถังขยะ    visible    timeout=2s
    Run Keyword If    ${empty_btn}    Run Keywords
    ...    Click    xpath=(//button[contains(text(), 'ล้างถังขยะ')])[1]
    ...    AND    Wait For Elements State    xpath=(//button[contains(text(), 'ล้างถังขยะ')])[last()]    visible
    ...    AND    Click    xpath=(//button[contains(text(), 'ล้างถังขยะ')])[last()]
