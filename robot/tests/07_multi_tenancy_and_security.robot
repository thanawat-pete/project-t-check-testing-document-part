*** Settings ***
Library         Browser
Resource        ../resources/variables.resource
Resource        ../resources/keywords.resource

*** Test Cases ***
TC-SEC-001: User B cannot see or query User A documents
    New Context
    # Ensure Multi-tenant works
    
TC-SEC-002: LocalStorage drafts are isolated by User ID
    New Context
