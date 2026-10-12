*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource
Suite Setup     Start Test Browser
Suite Teardown  Close Browser
Test Setup      Start Test Context
Test Teardown   Close Test Context

*** Test Cases ***
TC-LST-001: View document cards in library
    Login To System
    Go To Documents Page
    Wait For Elements State    ${BTN_CREATE_DOC}    visible
    Wait For Elements State    ${INPUT_SEARCH_DOC}    visible

TC-SCH-001: Real-time search by document title or content
    Login To System
    Go To Documents Page
    Search For Document    เอกสารไม่มีชื่อ
    ${search}=    Get Attribute    ${INPUT_SEARCH_DOC}    value
    Should Be Equal    ${search}    เอกสารไม่มีชื่อ

TC-SRT-001: Sort documents by title in ascending alphabetical order
    Login To System
    Go To Documents Page
    Click    ${BTN_SORT_DOC}
    Click    text=ชื่อ (A-Z)
