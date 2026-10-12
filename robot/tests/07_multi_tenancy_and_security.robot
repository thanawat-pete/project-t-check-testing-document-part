*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Close Test Context

*** Test Cases ***
TC-SEC-001: User B cannot see User A documents
    Login To System
    Go To Documents Page
    ${user_a_document}=    Read Visible Document Title
    Close Context
    New Context
    New Page    ${BASE_URL}/
    Login As Second Test User
    Go To Documents Page
    ${user_b_documents}=    Get Text    xpath=//main
    Should Not Contain    ${user_b_documents}    ${user_a_document}
