*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource

*** Test Cases ***
TC-IMP-001: Import local text file into document
    New Context
    Login To System
    Go To    ${DOCS_URL}
    # Click Import
    
TC-EXP-001: Open Export modal and select export format
    New Context
    Login To System
    Go To    ${DOCS_EDITOR_URL}
    # Click Export
