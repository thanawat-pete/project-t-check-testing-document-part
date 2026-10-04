*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Suite Setup     New Browser    chromium    headless=false
Suite Teardown  Close Browser

*** Test Cases ***
Guest User Should Be Redirected To Editor
    [Documentation]    Test that unauthenticated users are redirected to the editor when trying to access the docs list.
    New Context
    New Page    ${DOCS_URL}
    Wait For Condition    URL    ==    ${DOCS_EDITOR_URL}
    Close Context
