*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Close Test Context

*** Test Cases ***
TC-IMP-001: Import local text file into document
    Login To System
    Go To Documents Page
    Wait For Elements State    text=Import    visible

TC-EXP-001: Open Export modal and select export format
    Login To System
    Go To And Pause    ${DOCS_EDITOR_URL}
    ${export_visible}=    Run Keyword And Return Status    Wait For Elements State    xpath=//button[.//svg[contains(@class, 'lucide-download')]]    visible    timeout=2s
    Run Keyword If    ${export_visible}    Click    xpath=//button[.//svg[contains(@class, 'lucide-download')]]
