*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Close Test Context

*** Test Cases ***
Guest User Should Be Redirected To Editor
    [Documentation]    Test that unauthenticated users are redirected to the editor when trying to access the docs list.
    Go To And Pause    ${DOCS_URL}
    Wait For URL And Pause    /docs/editor
