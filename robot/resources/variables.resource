*** Variables ***
${BASE_URL}             https://t-check-two.vercel.app
${LOGIN_URL}            ${BASE_URL}/sign-in
${DOCS_URL}             ${BASE_URL}/docs
${DOCS_EDITOR_URL}      ${BASE_URL}/docs/editor

# Primary account used by the Playwright suite
${TEST_USER_EMAIL}      thanawat
${TEST_USER_PASSWORD}   password1234
${TEST_USER_B_EMAIL}    %{TEST_USER_B_USERNAME}
${TEST_USER_B_PASSWORD}    %{TEST_USER_B_PASSWORD}

# Selectors - Auth
${INPUT_EMAIL}          id=login-identity
${INPUT_PASSWORD}       id=login-password
${BTN_LOGIN}            id=login-submit

# Selectors - Document Management
${BTN_CREATE_DOC}       role=button[name="สร้างเอกสารใหม่"]
${INPUT_TITLE}          role=textbox[name="เอกสารไม่มีชื่อ"]
${INPUT_EDITOR}         css=.ProseMirror
${INPUT_SEARCH_DOC}     role=textbox[name="ค้นหาเอกสาร..."]
${BTN_SORT_DOC}         text=ล่าสุดก่อน
${BTN_TRASH_ICON}       xpath=//button[.//svg[contains(@class, 'lucide-trash-2')]]
${BTN_CONFIRM_DELETE}   css=button.bg-red-500
${BTN_SAVE_DOC}         xpath=//button[.//svg[contains(@class, 'lucide-save')]]
