# **SPRS-Master-Test-Specification — ชุดข้อกำหนดการทดสอบฉบับสมบูรณ์ (Master Test Specification)**

**โครงการ:** T-check (ระบบตรวจสอบและจัดการเอกสารภาษาไทยอัจฉริยะ)  
**โมดูล:** ระบบการจัดการเอกสาร (Document Management Subsystem)  
**เป้าหมายการทดสอบ:** Web Application (https://t-check-two.vercel.app) & Backend REST API (tcheck-backend-real)  
**เวอร์ชันเอกสาร:** 3.2.0 (Consolidated Master Specification)  
**วันที่จัดทำ:** 2026-10-12  
**อ้างอิงจาก:**
- SPRS-Test-Cases Full Specification (V2).md — แผนการทดสอบและชุดกรณีทดสอบ v3.1.0
- SPRS-E2E-BDD-UserStories — ระบบจัดการเอกสาร v3.1.0

---

## **1. ข้อมูลภาพรวมและขอบเขต (Overview & Scope)**

### **1.1 วัตถุประสงค์ (Objectives)**

เอกสารฉบับนี้รวบรวมข้อกำหนดการทดสอบเชิง Functional (E2E BDD User Stories) และ Test Case Specifications ไว้ในที่เดียวกัน เพื่อใช้เป็นแหล่งอ้างอิงหลัก (Single Source of Truth) สำหรับทีมพัฒนา QA และ CI/CD pipeline ของโครงการ T-check

ครอบคลุมการทดสอบใน **7 Feature Groups:**

1. Guest Mode & Local Draft Management (TG-01)
2. Document Creation, Editing & Auto-Save (TG-02)
3. Document List, Search & Sort (TG-03)
4. AI Grammar Check, Tone & Correction History (TG-04)
5. Document Import & Export (TG-05)
6. Trash Lifecycle, Recovery & Hard Delete (TG-06)
7. Multi-Tenancy Security & IDOR Protection (TG-07)

### **1.2 สภาพแวดล้อมทดสอบ (Test Environment)**

| พารามิเตอร์ | ค่า |
|:---|:---|
| **Frontend Target URL** | https://t-check-two.vercel.app (Vite + React) |
| **Backend API** | REST API / Deterministic Mock Route via auth.helper.ts |
| **Authentication Mechanism** | Zustand Persist Store ใน localStorage (auth-storage) + Session Storage |
| **Playwright Config** | baseURL, slowMo: 800ms, video, screenshot, trace, timeout: 60000ms |
| **Robot Framework Config** | Browser Library (Playwright), headless=false, timeout: 10s |
| **CI/CD Runner** | ubuntu-latest, Chromium Headless |
| **Stack** | React 18 + Vite + Tailwind CSS + Lucide + Zustand + Express.js + MongoDB 7.0+ |

### **1.3 บัญชีทดสอบ (Test Personas)**

| Role | บัญชีทดสอบ | Password | โควตา Token | สิทธิ์พิเศษ |
|:---|:---|:---|:---:|:---|
| **Guest** | ไม่มี Session | - | 1,000 | ใช้งาน Editor ได้, บันทึกร่างใน localStorage, ไม่สามารถเข้า /docs |
| **User-Free (A)** | user_free_a@test.com | password123 | 4,000 | สร้าง/แก้ไข/ค้นหา/ลบเอกสาร, ส่งออก PDF & Word |
| **User-Free (B)** | user_free_b@test.com | password123 | 4,000 | ใช้ทดสอบ IDOR — ต้องไม่เห็นเอกสารของ User A |
| **User-Pro (C)** | user_pro_c@test.com | password123 | 10,000 | ส่งออกไปยัง Google Docs, สลับโทนเสียง AI ขั้นสูง |
| **Admin** | admin@tcheck.com | password123 | 50,000 | สิทธิ์ระดับผู้ดูแลระบบ |

---

## **2. Test Suite Matrix & Execution Status**

| Test Group ID | Feature | Playwright Spec File | Robot Spec File | จำนวน TC | สถานะ |
|:---|:---|:---|:---|:---:|:---|
| **TG-01** | Guest Mode & Local Draft | 01_guest_draft_mode.spec.js | 01_guest_draft_mode.robot | 3 | **PASSED (3/3)** |
| **TG-02** | Document Creation & Editing | 02_doc_creation_and_editing.spec.js | 02_doc_creation_and_editing.robot | 3 | **PASSED (3/3)** |
| **TG-03** | List, Search & Sort | 03_doc_list_search_and_sort.spec.js | 03_doc_list_search_and_sort.robot | 4 | **PASSED (4/4)** |
| **TG-04** | AI Grammar & Tone | 04_doc_editor_advanced_features.spec.js | 04_doc_editor_advanced_features.robot | 4 | **PASSED (4/4)** |
| **TG-05** | Import & Export | 05_doc_import_export.spec.js | 05_doc_import_export.robot | 2 | **PASSED (2/2)** |
| **TG-06** | Trash Lifecycle | 06_doc_trash_and_recovery.spec.js | 06_doc_trash_and_recovery.robot | 4 | **PASSED (4/4)** |
| **TG-07** | Multi-Tenancy Security | 07_multi_tenancy_and_security.spec.js | 07_multi_tenancy_and_security.robot | 2 | **PASSED (2/2)** |
| **รวม** | **7 Features** | **7 Playwright Specs** | **7 Robot Specs** | **22** | **100% (22/22)** |

---

## **3. Feature Map & User Story Traceability**

| Story ID | Feature Name | URL | Test Case IDs | Playwright Spec | Robot Spec |
|:---|:---|:---|:---|:---|:---|
| US-DOC-001 | Guest Access & Auto-Redirect | /docs → /docs/editor | TC-GST-001, TC-GST-003 | 01_guest_draft_mode.spec.js | 01_guest_draft_mode.robot |
| US-DOC-002 | Guest Local Draft & Storage | /docs/editor | TC-GST-002, TC-GST-003 | 01_guest_draft_mode.spec.js | 01_guest_draft_mode.robot |
| US-DOC-003 | Document List View & Header | /docs | TC-CRE-001, TC-LST-001, TC-NAV-001 | 02_*, 03_* | 02_*, 03_* |
| US-DOC-004 | Create Document from List | /docs → /docs/editor | TC-CRE-001 | 02_doc_creation_and_editing.spec.js | 02_doc_creation_and_editing.robot |
| US-DOC-005 | Real-time Search | /docs | TC-SCH-001 | 03_doc_list_search_and_sort.spec.js | 03_doc_list_search_and_sort.robot |
| US-DOC-006 | Sort Document Cards | /docs | TC-SRT-001 | 03_doc_list_search_and_sort.spec.js | 03_doc_list_search_and_sort.robot |
| US-DOC-007 | Editor Title & Multi-Page | /docs/editor/:id | TC-EDT-001, TC-NAV-001, TC-AI-001 | 02_*, 04_* | 02_*, 04_* |
| US-DOC-008 | Live Thai Stats & Counters | /docs/editor | TC-EDT-001 | 02_doc_creation_and_editing.spec.js | 02_doc_creation_and_editing.robot |
| US-DOC-009 | Debounced Auto-Save & Badge | /docs/editor | TC-EDT-001 | 02_doc_creation_and_editing.spec.js | 02_doc_creation_and_editing.robot |
| US-DOC-010 | Manual Save Shortcut (Ctrl+S) | /docs/editor | TC-EDT-002 | 02_doc_creation_and_editing.spec.js | 02_doc_creation_and_editing.robot |
| US-DOC-011 | AI Grammar Check & Analysis Panel | /docs/editor | TC-AI-002 | 04_doc_editor_advanced_features.spec.js | 04_doc_editor_advanced_features.robot |
| US-DOC-012 | AI Tone Switching Modal | /docs/editor | TC-TON-001 | 04_doc_editor_advanced_features.spec.js | 04_doc_editor_advanced_features.robot |
| US-DOC-013 | Accept AI Suggestions & History | /docs/editor | TC-HIS-001 | 04_doc_editor_advanced_features.spec.js | 04_doc_editor_advanced_features.robot |
| US-DOC-014 | Local File Import (TXT/DOCX/PDF) | /docs, /docs/editor | TC-IMP-001 | 05_doc_import_export.spec.js | 05_doc_import_export.robot |
| US-DOC-015 | Export Document (PDF/DOCX/Google Docs) | /docs/editor | TC-EXP-001 | 05_doc_import_export.spec.js | 05_doc_import_export.robot |
| US-DOC-016 | Move to Trash (Soft Delete) | /docs, /docs/editor | TC-TRH-001 | 06_doc_trash_and_recovery.spec.js | 06_doc_trash_and_recovery.robot |
| US-DOC-017 | Trash Management & Search | /docs/trash | TC-TRH-002 | 06_doc_trash_and_recovery.spec.js | 06_doc_trash_and_recovery.robot |
| US-DOC-018 | Restore Document from Trash | /docs/trash | TC-TRH-003 | 06_doc_trash_and_recovery.spec.js | 06_doc_trash_and_recovery.robot |
| US-DOC-019 | Hard Delete & Empty Trash | /docs/trash | TC-TRH-004 | 06_doc_trash_and_recovery.spec.js | 06_doc_trash_and_recovery.robot |
| US-DOC-020 | Multi-Tenancy & Data Isolation | /docs, /docs/editor | TC-SEC-001, TC-SEC-002 | 07_multi_tenancy_and_security.spec.js | 07_multi_tenancy_and_security.robot |

---

## **4. รายละเอียด BDD Gherkin Scenarios & Test Cases**

---

### **Feature 1: Guest Mode & Local Draft Management (TG-01)**

**Story ID:** US-DOC-001, US-DOC-002  
**ในฐานะ** ผู้ใช้งานทั่วไปที่ยังไม่ได้เข้าสู่ระบบ (Guest)  
**ฉันต้องการ** สามารถพิมพ์ข้อความและตรวจสอบคำผิดบนหน้า Editor ได้ทันที และให้ระบบบันทึกร่างไว้บน LocalStorage  
**เพื่อที่จะ** ทดลองใช้งานระบบได้ทันทีโดยไม่ต้องสมัครสมาชิก และข้อมูลไม่สูญหายเมื่อรีเฟรชเบราว์เซอร์

```gherkin
Feature: Guest Mode and Local Draft Management
  As a guest visitor
  I want to use the document editor and have my draft saved locally
  So that I can try the system without signing in and avoid losing my writing
```

#### **TC-GST-001 — Guest navigating to /docs is redirected to /docs/editor**

| รหัส | TC-GST-001 | อ้างอิง US | US-DOC-001 | ความสำคัญ | High / Positive |
|:---|:---|:---|:---|:---|:---|
| **เงื่อนไขตั้งต้น** | ไม่มี Session ในเบราว์เซอร์ (auth-storage และ sessionStorage ว่างเปล่า) | | | | |
| **ขั้นตอน** | 1. เปิดเบราว์เซอร์ไปที่ /docs 2. ตรวจสอบ Route Guard 3. ตรวจสอบ URL Redirection | | | | |
| **ผลที่คาดหวัง** | เบราว์เซอร์ Redirect ไปยัง /docs/editor โดยอัตโนมัติ และแสดงหน้า Editor ในโหมด Guest | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @guest @navigation
  Scenario: Guest navigating to /docs is redirected to /docs/editor
    Given the visitor is not authenticated
    When the visitor navigates to "https://t-check-two.vercel.app/docs"
    Then the browser should automatically redirect to "https://t-check-two.vercel.app/docs/editor"
    And the editor interface should be displayed in guest mode
```

#### **TC-GST-002 — Guest types text and draft is restored after page reload**

| รหัส | TC-GST-002 | อ้างอิง US | US-DOC-002 | ความสำคัญ | High / Positive (State Persistence) |
|:---|:---|:---|:---|:---|:---|
| **เงื่อนไขตั้งต้น** | อยู่ในหน้า /docs/editor ในสถานะ Guest | | | | |
| **ข้อมูลทดสอบ** | Text: "ข้อความร่างสำหรับทดสอบระบบ Guest" / Storage Key: tcheck_local_draft_guest | | | | |
| **ผลที่คาดหวัง** | ข้อมูลร่างถูกบันทึกใน LocalStorage และกู้คืนได้หลังรีเฟรช 100% | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @guest @storage @auto-save
  Scenario: Guest types text and draft is restored after page reload
    Given the visitor is on "https://t-check-two.vercel.app/docs/editor"
    When the visitor types "ข้อความร่างสำหรับทดสอบระบบ Guest" into the editor textarea
    And the visitor waits for 2 seconds
    Then the browser localStorage key "tcheck_local_draft_guest" should contain "ข้อความร่างสำหรับทดสอบระบบ Guest"
    When the visitor reloads the web page
    Then the editor textarea should display "ข้อความร่างสำหรับทดสอบระบบ Guest"
```

#### **TC-GST-003 — Guest token quota is initialized to 1000 tokens**

| รหัส | TC-GST-003 | อ้างอิง US | US-DOC-001, US-DOC-002 | ความสำคัญ | Medium / Positive |
|:---|:---|:---|:---|:---|:---|
| **ข้อมูลทดสอบ** | Storage Key: tcheck_guest_tokens | | | | |
| **ผลที่คาดหวัง** | localStorage.getItem('tcheck_guest_tokens') === "1000" | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @guest @quota
  Scenario: Guest token quota is initialized to 1000 tokens
    Given the visitor opens the editor for the first time
    Then the guest token counter should display 1000 remaining tokens
    And the token limit in localStorage "tcheck_guest_tokens" should equal "1000"
```

---

### **Feature 2: Document Creation & Editing (TG-02)**

**Story ID:** US-DOC-004, US-DOC-007, US-DOC-008, US-DOC-009, US-DOC-010  
**ในฐานะ** ผู้ใช้งานระบบ  
**ฉันต้องการ** สร้างเอกสารใหม่ เปลี่ยนชื่อเรื่อง พิมพ์ข้อความ และให้ระบบบันทึกอัตโนมัติ  
**เพื่อที่จะ** จัดการงานเขียนภาษาไทยได้อย่างมีประสิทธิภาพและปลอดภัยจากการสูญหายของข้อมูล

```gherkin
Feature: Document Creation and Editor Capabilities
  As an authenticated user
  I want to create, rename, and edit multi-page documents with automatic saving
  So that my writing is continuously preserved and organized

  Background:
    Given the user is authenticated as "user_free_a@test.com"
```

#### **TC-CRE-001 — Click create new document and redirect to editor**

| รหัส | TC-CRE-001 | อ้างอิง US | US-DOC-003, US-DOC-004 | ความสำคัญ | High / Positive (Core Feature) |
|:---|:---|:---|:---|:---|:---|
| **เงื่อนไขตั้งต้น** | เข้าสู่ระบบเป็น user_free_a@test.com และอยู่ที่หน้า /docs | | | | |
| **ผลที่คาดหวัง** | นำทางไปยัง /docs/editor พร้อม Input ชื่อ "เอกสารไม่มีชื่อ" และ Textarea ว่าง | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @create @positive
  Scenario: Click create new document and redirect to editor
    Given the user is on "https://t-check-two.vercel.app/docs"
    When the user clicks the "+ สร้างเอกสารใหม่" button
    Then the system should navigate to "https://t-check-two.vercel.app/docs/editor"
    And the document title input should show "เอกสารไม่มีชื่อ"
    And a fresh blank page textarea should be ready for typing
```

#### **TC-EDT-001 — Rename document title and monitor live Thai statistics**

| รหัส | TC-EDT-001 | อ้างอิง US | US-DOC-007, US-DOC-008, US-DOC-009 | ความสำคัญ | High / Positive |
|:---|:---|:---|:---|:---|:---|
| **ข้อมูลทดสอบ** | Title: "เอกสารวิเคราะห์โครงสร้างไวยากรณ์ไทย" / Content: "การประมวลผลภาษาธรรมชาติภาษาไทยมีเอกลักษณ์เฉพาะตัว" | | | | |
| **ผลที่คาดหวัง** | ตัวนับคำ/ตัวอักษรอัปเดต Real-time และ Badge แสดง "บันทึกแล้ว" | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @edit @counters
  Scenario: Rename document title and monitor live Thai statistics
    Given the user is on the document editor page
    When the user changes the document title to "รายงานผลการวิเคราะห์ภาษาไทย 2569"
    And the user types "ระบบตรวจสอบไวยากรณ์ภาษาไทยรุ่นใหม่ล่าสุด" into page 1
    Then the character counter should update to match the exact character length
    And the Thai word counter should update with the segmented word count
    And the estimated read time should be calculated
```

#### **TC-EDT-002 — Debounced auto-save and manual Ctrl+S shortcut**

| รหัส | TC-EDT-002 | อ้างอิง US | US-DOC-010 | ความสำคัญ | Medium / Positive (Usability & Shortcut) |
|:---|:---|:---|:---|:---|:---|
| **ข้อมูลทดสอบ** | Shortcut: Control+s | | | | |
| **ผลที่คาดหวัง** | Badge "บันทึกแล้ว" ปรากฏทั้งหลัง Debounce 3 วินาที และทันทีเมื่อกด Ctrl+S | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @auto-save @shortcut
  Scenario: Debounced auto-save and manual Ctrl+S shortcut
    Given the user is typing new content in the editor
    When 2.5 seconds have elapsed without further keystrokes
    Then the save status badge in the header should change to "บันทึกแล้ว" with a green checkmark
    When the user edits the text and presses "Ctrl + S"
    Then the system should immediately trigger save without waiting for the debounce timer
```

---

### **Feature 3: Document List, Search & Sort (TG-03)**

**Story ID:** US-DOC-003, US-DOC-005, US-DOC-006  
**ในฐานะ** สมาชิกที่เข้าสู่ระบบ  
**ฉันต้องการ** ดูคลังเอกสาร ค้นหาเอกสารด้วยคำสำคัญ และจัดเรียงลำดับ  
**เพื่อที่จะ** ค้นหาและเข้าถึงเอกสารได้อย่างสะดวกและรวดเร็ว

```gherkin
Feature: Document Listing, Search and Sorting
  As an authenticated user
  I want to view, search, and sort my document library
  So that I can quickly organize and access my stored documents

  Background:
    Given the user is authenticated as "user_free_a@test.com"
    And the user is on the document management page "https://t-check-two.vercel.app/docs"
```

#### **TC-LST-001 — View all document cards in library**

| รหัส | TC-LST-001 | อ้างอิง US | US-DOC-003 | ความสำคัญ | High / Positive |
|:---|:---|:---|:---|:---|:---|
| **เงื่อนไขตั้งต้น** | User A มีเอกสารจำลอง 3 ฉบับในระบบ (doc_mock_001, 002, 003) | | | | |
| **ผลที่คาดหวัง** | แสดงการ์ดเอกสารครบ 3 รายการ พร้อมชื่อเรื่อง ตัวอย่างเนื้อหา และเวลาอัปเดตล่าสุด | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @positive @ui
  Scenario: View document cards in library
    Then the page header should display "การจัดการเอกสาร"
    And the document grid should display the user's active documents
    And each document card should show the document title, preview snippet, and last updated time
```

#### **TC-SCH-001 — Real-time search by document title or content**

| รหัส | TC-SCH-001 | อ้างอิง US | US-DOC-005 | ความสำคัญ | High / Positive |
|:---|:---|:---|:---|:---|:---|
| **ข้อมูลทดสอบ** | Keyword: "งบประมาณ" | | | | |
| **ผลที่คาดหวัง** | กรองเฉพาะ "รายงานการเงินฯ" แสดง / การ์ดอื่นถูกซ่อน / ล้างคืนทั้งหมด | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @search @realtime
  Scenario: Real-time search by document title or content
    When the user types "งบประมาณ" into the search input box
    Then the document list should filter in real-time
    And only documents containing "งบประมาณ" in title or content should be visible
    When the user clears the search input box
    Then all active documents should be restored in the list
```

#### **TC-SRT-001 — Sort documents by title ascending (ก-ฮ)**

| รหัส | TC-SRT-001 | อ้างอิง US | US-DOC-006 | ความสำคัญ | Medium / Positive |
|:---|:---|:---|:---|:---|:---|
| **ข้อมูลทดสอบ** | Sort Value: titleAsc | | | | |
| **ผลที่คาดหวัง** | รายการเรียงตามพยัญชนะ ก-ฮ ถูกต้อง | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @sort @functional
  Scenario: Sort documents by title in ascending alphabetical order (A-Z)
    When the user selects "ชื่อ (ก-ฮ)" from the sort dropdown
    Then the document cards should be reordered alphabetically from ก to ฮ
```

#### **TC-NAV-001 — Click document card to open in Editor**

| รหัส | TC-NAV-001 | อ้างอิง US | US-DOC-003, US-DOC-007 | ความสำคัญ | High / Positive (Navigation) |
|:---|:---|:---|:---|:---|:---|
| **ข้อมูลทดสอบ** | Document ID: doc_mock_001 | | | | |
| **ผลที่คาดหวัง** | URL เปลี่ยนเป็น /docs/editor/doc_mock_001 และโหลดข้อมูลเอกสารสำเร็จ | | | | |
| **สถานะ** | PASSED | | | | |

---

### **Feature 4: AI Grammar Check, Tone & Correction History (TG-04)**

**Story ID:** US-DOC-011, US-DOC-012, US-DOC-013  
**ในฐานะ** ผู้ใช้งานระบบ  
**ฉันต้องการ** ให้ AI วิเคราะห์ตรวจจับคำผิด สลับระดับภาษา และยอมรับคำแนะนำ  
**เพื่อที่จะ** ปรับปรุงคุณภาพงานเขียนภาษาไทยให้ถูกต้องตามหลักภาษา

```gherkin
Feature: AI Grammar Checking and Tone Customization
  As a writer
  I want AI-assisted grammar analysis, tone adaptation, and correction history
  So that my Thai documents maintain high linguistic quality

  Background:
    Given the user is authenticated and has an open document in the editor
```

#### **TC-AI-001 — Load existing document by Document ID**

| รหัส | TC-AI-001 | อ้างอิง US | US-DOC-007 | ความสำคัญ | High / Positive |
|:---|:---|:---|:---|:---|:---|
| **ข้อมูลทดสอบ** | URL: /docs/editor/doc_mock_001 | | | | |
| **ผลที่คาดหวัง** | Title Input แสดง "แผนงานวิจัยและพัฒนาระบบ AI ภาษาไทย 2569" และ Textarea แสดงเนื้อหาครบถ้วน | | | | |
| **สถานะ** | PASSED | | | | |

#### **TC-AI-002 — Trigger AI Grammar Check with Ctrl+Enter**

| รหัส | TC-AI-002 | อ้างอิง US | US-DOC-011 | ความสำคัญ | High / Positive (AI Feature) |
|:---|:---|:---|:---|:---|:---|
| **ข้อมูลทดสอบ** | Content: "สวัดดีตอนเช้าทุกท่าน" / Shortcut: Control+Enter | | | | |
| **ผลที่คาดหวัง** | AI Analysis Panel เปิด, ไฮไลต์ "สวัดดี", แนะนำ "สวัสดี" | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @ai @grammar
  Scenario: Trigger AI Grammar Check with Ctrl+Enter shortcut
    Given the editor contains text with spelling errors such as "สวัดดีตอนเช้า"
    When the user presses "Ctrl + Enter" or clicks the grammar check button
    Then the AI Analysis Panel should expand
    And the misspelled word "สวัดดี" should be highlighted with a red wavy underline
    And a correction card suggesting "สวัสดี" should appear in the suggestions list
```

#### **TC-TON-001 — Open Tone Selector Modal**

| รหัส | TC-TON-001 | อ้างอิง US | US-DOC-012 | ความสำคัญ | Medium / Positive |
|:---|:---|:---|:---|:---|:---|
| **ผลที่คาดหวัง** | Tone Selector Modal เปิด แสดงตัวเลือก "เป็นทางการ (Strict)" และ "เป็นกันเอง (Casual)" | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @tone @modal
  Scenario: Switch writing tone between Strict and Casual
    When the user clicks the Tone selection button in the toolbar
    Then the Tone Selector modal should open
    When the user selects "เป็นทางการ (Strict)"
    Then the editor active tone setting should update to "strict"
```

#### **TC-HIS-001 — View correction history in History Tab**

| รหัส | TC-HIS-001 | อ้างอิง US | US-DOC-013 | ความสำคัญ | Medium / Positive |
|:---|:---|:---|:---|:---|:---|
| **ข้อมูลทดสอบ** | Mock History: "สวัดดี" -> "สวัสดี" (FIFO cap 50 items) | | | | |
| **ผลที่คาดหวัง** | แท็บประวัติแสดงรายการคำเดิม -> คำที่ถูกแก้ไขครบถ้วน | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @correction @history
  Scenario: Accept AI correction suggestion and verify FIFO history limit
    Given a spelling suggestion for "สวัดดี" -> "สวัสดี" is displayed
    When the user clicks "ยอมรับการแก้ไข" on the suggestion card
    Then the text in the editor should replace "สวัดดี" with "สวัสดี"
    And the correction should be logged in the Corrections History tab (maximum 50 items)
```

---

### **Feature 5: Document Import & Export (TG-05)**

**Story ID:** US-DOC-014, US-DOC-015  
**ในฐานะ** ผู้ใช้งานระบบ  
**ฉันต้องการ** นำเข้าไฟล์จากภายนอก และส่งออกเอกสารเป็น PDF, Word หรือ Google Docs  
**เพื่อที่จะ** ทำงานร่วมกับโปรแกรมสำนักงานภายนอกได้อย่างไร้รอยต่อ

```gherkin
Feature: Document Import and Export
  As an authenticated user
  I want to import text files and export my documents to PDF, Word, and Google Docs
  So that I can share and publish my documents across platforms
```

#### **TC-IMP-001 — Import menu shows file and Google Docs options**

| รหัส | TC-IMP-001 | อ้างอิง US | US-DOC-014 | ความสำคัญ | Medium / Positive |
|:---|:---|:---|:---|:---|:---|
| **ผลที่คาดหวัง** | เมนูแสดง "TXT, DOCX, PDF" สำหรับไฟล์ในเครื่อง และ "Google Docs" | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @import @local-file
  Scenario: Import local text file into document
    Given the user is on the document list or editor page
    When the user clicks "Import" and uploads a ".txt" file with Thai content
    Then the system should parse the file and populate the editor pages with the text
    And a success notification "นำเข้าไฟล์สำเร็จ" should be displayed
```

#### **TC-EXP-001 — Open Export Modal and verify export options**

| รหัส | TC-EXP-001 | อ้างอิง US | US-DOC-015 | ความสำคัญ | Medium / Positive |
|:---|:---|:---|:---|:---|:---|
| **ผลที่คาดหวัง** | Modal ส่งออกแสดงตัวเลือก PDF และ Word (DOCX) | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @export @pdf @docx
  Scenario: Open Export modal and select export format
    Given the user is in the editor with a completed document
    When the user clicks the "Export / ส่งออก" button in the toolbar
    Then the Export modal should open with options:
      | Export Option | File Format |
      | PDF Document  | .pdf        |
      | Word Document | .docx       |
      | Google Docs   | Cloud Sync  |
```

---

### **Feature 6: Trash Lifecycle, Recovery & Hard Delete (TG-06)**

**Story ID:** US-DOC-016, US-DOC-017, US-DOC-018, US-DOC-019  
**ในฐานะ** ผู้ใช้งานระบบ  
**ฉันต้องการ** ย้ายเอกสารลงถังขยะ ตรวจสอบรายการ กู้คืน หรือลบแบบถาวร  
**เพื่อที่จะ** จัดการพื้นที่เก็บข้อมูลและป้องกันการลบผิดพลาด

```gherkin
Feature: Trash Lifecycle, Recovery and Permanent Deletion
  As an authenticated user
  I want a safety trash system to recover deleted documents or permanently erase them
  So that I have full control over document retention

  Background:
    Given the user is authenticated as "user_free_a@test.com"
```

#### **TC-TRH-001 — Move document to trash (Soft Delete)**

| รหัส | TC-TRH-001 | อ้างอิง US | US-DOC-016 | ความสำคัญ | High / Positive (Data Lifecycle) |
|:---|:---|:---|:---|:---|:---|
| **ผลที่คาดหวัง** | เอกสารเปลี่ยนสถานะเป็น is_deleted: true และหายจากหน้ารายการปกติ | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @trash @soft-delete
  Scenario: Move an active document to trash
    Given the user is on "https://t-check-two.vercel.app/docs"
    When the user clicks the delete trash icon on a document card
    And confirms the delete action
    Then the document should be removed from the active document list
    And its database status should become "is_deleted: true"
```

#### **TC-TRH-002 — View trash list at /docs/trash**

| รหัส | TC-TRH-002 | อ้างอิง US | US-DOC-017 | ความสำคัญ | High / Positive |
|:---|:---|:---|:---|:---|:---|
| **ผลที่คาดหวัง** | หน้าถังขยะโหลด พร้อมการ์ดเอกสารที่ถูกลบ + ปุ่มกู้คืน/ลบถาวร | | | | |
| **สถานะ** | PASSED | | | | |

#### **TC-TRH-003 — Restore document from trash**

| รหัส | TC-TRH-003 | อ้างอิง US | US-DOC-018 | ความสำคัญ | High / Positive |
|:---|:---|:---|:---|:---|:---|
| **ผลที่คาดหวัง** | POST /api/docs/:id/restore สำเร็จ / เอกสารกลับสู่รายการ Active | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @trash @restore
  Scenario: Restore document from trash back to active library
    Given the user navigates to "https://t-check-two.vercel.app/docs/trash"
    When the user clicks "กู้คืน" on a deleted document item
    Then the document should disappear from the trash list
    And the document should reappear in the active document library on "/docs"
```

#### **TC-TRH-004 — Hard delete document permanently**

| รหัส | TC-TRH-004 | อ้างอิง US | US-DOC-019 | ความสำคัญ | High / Positive (Safety & Security) |
|:---|:---|:---|:---|:---|:---|
| **ผลที่คาดหวัง** | DELETE /api/docs/:id/permanent สำเร็จ / เอกสารหายจากระบบถาวร | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @trash @hard-delete
  Scenario: Permanently hard delete a document
    Given the user is on "https://t-check-two.vercel.app/docs/trash"
    When the user clicks "ลบถาวร" on a deleted document item
    And confirms the permanent deletion dialog
    Then the document record should be completely removed from MongoDB
```

---

### **Feature 7: Multi-Tenancy Isolation & IDOR Security (TG-07)**

**Story ID:** US-DOC-020  
**ในฐานะ** สถาปัตยกรรมความปลอดภัยของระบบ  
**ฉันต้องการ** ให้ระบบแบ่งแยกข้อมูลผู้ใช้แต่ละบัญชีอย่างเด็ดขาด  
**เพื่อที่จะ** ป้องกันช่องโหว่ IDOR และรักษาความลับของเอกสาร

```gherkin
Feature: Multi-Tenancy Isolation and Access Security
  As a security compliance requirement
  I want complete isolation of documents between users
  So that no user can view, edit, or delete documents belonging to another user
```

#### **TC-SEC-001 — User B cannot see or access User A documents**

| รหัส | TC-SEC-001 | อ้างอิง US | US-DOC-020 | ความสำคัญ | Critical / Security (IDOR Protection) |
|:---|:---|:---|:---|:---|:---|
| **ผลที่คาดหวัง** | หน้า /docs ของ User B ว่างเปล่า / เข้า URL เอกสาร User A ถูก deny (HTTP 403) | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @security @idor
  Scenario: User B cannot see or query User A documents
    Given User A has created private documents in the database
    When User B logs into the system and visits "https://t-check-two.vercel.app/docs"
    Then the document list must NOT contain any documents belonging to User A
    When User B attempts to access "https://t-check-two.vercel.app/docs/editor/doc_user_a_001"
    Then the system must deny access with HTTP 403 or redirect to safe view
```

#### **TC-SEC-002 — LocalStorage drafts isolated by User ID**

| รหัส | TC-SEC-002 | อ้างอิง US | US-DOC-020 | ความสำคัญ | Critical / Security & Data Privacy |
|:---|:---|:---|:---|:---|:---|
| **ข้อมูลทดสอบ** | User A Draft Key: tcheck_local_draft_user_free_a / User B: tcheck_local_draft_user_free_b | | | | |
| **ผลที่คาดหวัง** | User B ไม่สามารถอ่าน Draft Key ของ User A ในเบราว์เซอร์ได้ | | | | |
| **สถานะ** | PASSED | | | | |

```gherkin
  @security @storage
  Scenario: LocalStorage drafts are isolated by User ID
    Given User A writes a draft in the editor
    Then the draft is saved under key "tcheck_local_draft_user_a"
    When User B logs in on the same browser
    Then User B cannot read User A draft key
    And User B operates on their isolated key "tcheck_local_draft_user_b"
```

---

## **5. คำสั่งรันการทดสอบ (Test Execution Commands)**

### **5.1 Playwright (JavaScript)**

```bash
# ติดตั้ง Dependencies
npm install
npx playwright install chromium

# รันทดสอบทั้งหมด (Headless)
npm test
# หรือ
npx playwright test

# รันแบบ Headed (เห็นหน้าต่างเบราว์เซอร์)
npm run test:headed

# รัน Playwright UI Mode
npm run test:ui

# เปิดรายงาน HTML
npm run test:report

# รันเฉพาะ Test Group เดียว
npx playwright test playwright/tests/01_guest_draft_mode.spec.js
```

### **5.2 Robot Framework**

```bash
# ติดตั้ง Dependencies
pip install -r robot/requirements.txt

# รันทดสอบทั้งหมด
robot --outputdir robot/results robot/tests/

# รันเฉพาะ Suite เดียว
robot --outputdir robot/results robot/tests/01_guest_draft_mode.robot

# รันด้วย Tag เฉพาะ
robot --include guest --outputdir robot/results robot/tests/
robot --include security --outputdir robot/results robot/tests/

# เปิดรายงาน
start robot/results/report.html
```

### **5.3 CI/CD Pipeline (GitHub Actions)**

Pipeline ทำงานอัตโนมัติเมื่อ push หรือ pull_request ไปยัง branch main/master:
1. **Trigger:** push, pull_request, workflow_dispatch
2. **Environment:** ubuntu-latest, Node.js LTS, Python 3.x
3. **Artifacts:** บันทึก HTML Report + Video 30 วัน
4. **Auto-Deploy:** GitHub Pages อัปเดตอัตโนมัติ

---

## **6. สรุป Traceability Matrix**

| User Story ID | Gherkin Feature | Test Case IDs | Playwright Spec | Robot Spec | สถานะ |
|:---|:---|:---|:---|:---|:---|
| US-DOC-001, 002 | Feature 1: Guest Mode & Local Draft | TC-GST-001~003 | 01_guest_draft_mode.spec.js | 01_guest_draft_mode.robot | PASSED (3/3) |
| US-DOC-004, 007~010 | Feature 2: Creation, Title Edit & Save | TC-CRE-001, TC-EDT-001~002 | 02_doc_creation_and_editing.spec.js | 02_doc_creation_and_editing.robot | PASSED (3/3) |
| US-DOC-003, 005, 006 | Feature 3: List, Search & Sort | TC-LST-001, TC-SCH-001, TC-SRT-001, TC-NAV-001 | 03_doc_list_search_and_sort.spec.js | 03_doc_list_search_and_sort.robot | PASSED (4/4) |
| US-DOC-011, 012, 013 | Feature 4: AI Grammar, Tone & History | TC-AI-001~002, TC-TON-001, TC-HIS-001 | 04_doc_editor_advanced_features.spec.js | 04_doc_editor_advanced_features.robot | PASSED (4/4) |
| US-DOC-014, 015 | Feature 5: Import & Export | TC-IMP-001, TC-EXP-001 | 05_doc_import_export.spec.js | 05_doc_import_export.robot | PASSED (2/2) |
| US-DOC-016~019 | Feature 6: Trash Lifecycle & Hard Delete | TC-TRH-001~004 | 06_doc_trash_and_recovery.spec.js | 06_doc_trash_and_recovery.robot | PASSED (4/4) |
| US-DOC-020 | Feature 7: Multi-Tenancy & IDOR | TC-SEC-001~002 | 07_multi_tenancy_and_security.spec.js | 07_multi_tenancy_and_security.robot | PASSED (2/2) |
| **รวม** | **7 Features** | **22 Test Cases** | **7 Playwright Specs** | **7 Robot Specs** | **100% (22/22)** |

---

*เอกสารนี้จัดทำโดยอ้างอิงจาก SPRS-Test-Cases Full Specification (V2) และ SPRS-E2E-BDD-UserStories (V3.1.0)*  
*Last Updated: 2026-10-12 | Version: 3.2.0*
