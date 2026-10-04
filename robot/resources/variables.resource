*** Variables ***
${BASE_URL}             https://t-check-two.vercel.app
${LOGIN_URL}            ${BASE_URL}/sign-in
${DOCS_URL}             ${BASE_URL}/docs
${DOCS_EDITOR_URL}      ${BASE_URL}/docs/editor

# Test Accounts (Replace with actual credentials)
${TEST_USER_EMAIL}      thanawat
${TEST_USER_PASSWORD}   password1234

# Selectors - Auth
${INPUT_EMAIL}          id=login-identity
${INPUT_PASSWORD}       id=login-password
${BTN_LOGIN}            id=login-submit

# Selectors - Document Management
${BTN_CREATE_DOC}       xpath=//button[.//svg[contains(@class, 'lucide-plus')]]
${INPUT_SEARCH_DOC}     css=input[type="text"]
${BTN_SORT_DOC}         xpath=//label[.//svg[contains(@class, 'lucide-arrow-up-down')]]
${BTN_TRASH_ICON}       xpath=//button[.//svg[contains(@class, 'lucide-trash-2')]]
${BTN_CONFIRM_DELETE}   css=button.bg-red-500
${BTN_SAVE_DOC}         xpath=//button[.//svg[contains(@class, 'lucide-save')]]
