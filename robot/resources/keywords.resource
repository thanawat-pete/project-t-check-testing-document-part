*** Settings ***
Library     Browser
Resource    variables.resource

*** Keywords ***
Start Test Browser
    New Browser    chromium    headless=false

Start Test Context
    New Context
    New Page    ${BASE_URL}/

Close Test Context
    Close Context

Go To And Pause
    [Arguments]    ${url}
    Go To    ${url}
    Sleep    3s

Wait For URL And Pause
    [Arguments]    ${url_fragment}
    Wait For Condition    URL    contains    ${url_fragment}
    Sleep    3s

Login To System
    [Arguments]    ${email}=${TEST_USER_EMAIL}    ${password}=${TEST_USER_PASSWORD}
    Go To And Pause    ${LOGIN_URL}
    Fill Text      ${INPUT_EMAIL}       ${email}
    Fill Text      ${INPUT_PASSWORD}    ${password}
    Click          ${BTN_LOGIN}
    Wait For Condition    URL    ==    ${BASE_URL}/
    Sleep    3s

Go To Documents Page
    Go To And Pause    ${DOCS_URL}
    Wait For Elements State    ${BTN_CREATE_DOC}    visible    timeout=10s

Create A New Document
    Click    ${BTN_CREATE_DOC}
    Wait For URL And Pause    /docs/editor

Search For Document
    [Arguments]    ${keyword}
    Fill Text      ${INPUT_SEARCH_DOC}    ${keyword}

Read Visible Document Title
    ${title}=    Get Text    xpath=(//main//h4)[1]
    RETURN    ${title}

Login As Second Test User
    Login To System    ${TEST_USER_B_EMAIL}    ${TEST_USER_B_PASSWORD}
