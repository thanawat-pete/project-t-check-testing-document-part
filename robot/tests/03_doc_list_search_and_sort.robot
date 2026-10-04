*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource

*** Test Cases ***
TC-LST-001: View document cards in library
    New Context
    Login To System
    Go To    ${DOCS_URL}
    Wait For Elements State    text=การจัดการเอกสาร    visible

TC-SCH-001: Real-time search by document title or content
    New Context
    Login To System
    Go To    ${DOCS_URL}
    Fill Text    input    งบประมาณ

TC-SRT-001: Sort documents by title in ascending alphabetical order
    New Context
    Login To System
    Go To    ${DOCS_URL}
    # Click Sort
