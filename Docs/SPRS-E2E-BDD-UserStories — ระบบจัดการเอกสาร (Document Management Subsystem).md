# **SPRS-E2E-BDD-UserStories — ระบบจัดการเอกสาร (Document Management Subsystem)**

**โครงการ:** T-check (ระบบตรวจสอบและจัดการเอกสารภาษาไทยอัจฉริยะ)  
**โมดูลหลัก:** ระบบการจัดการเอกสาร (Document Management Subsystem)  
**เป้าหมายระบบ (Target Base URL):** https\://t-check-two.vercel.app (Vite \+ React Frontend) เชื่อมโยงกับ Backend REST API (tcheck-backend-real)  
**GitHub Repository:** [https\://github.com/thanawat-pete/exam-midterm-user-stories-manage-document](https://github.com/thanawat-pete/exam-midterm-user-stories-manage-document)  
**Live Test Report (GitHub Pages):** [Playwright Test Report](https://thanawat-pete.github.io/exam-midterm-user-stories-manage-document/)  
**CI/CD Pipeline:** GitHub Actions (.github/workflows/playwright.yml)  
**รูปแบบเอกสาร:** End-to-End (E2E) Behavior-Driven Development (BDD) User Stories & Gherkin Scenarios  
**สถาปัตยกรรม & เทคโนโลยีที่ใช้งานจริง:** React 18 \+ Vite \+ Tailwind CSS \+ Lucide Icons \+ Zustand (Persist Auth) \+ Express.js \+ Mongoose \+ MongoDB 7.0+ \+ Playwright Test Suites (SlowMo & HD Video) \+ GitHub Actions CI/CD  
**เวอร์ชัน:** 3.1.0 (Production & CI/CD Synchronized)  
**วันที่จัดทำ:** 2026-08-18

## 

## 

## 

## 

## 

## 

## 

## 

## 

## **1\. บทนำและขอบเขตของระบบ (Introduction & Scope)**

เอกสารฉบับนี้จัดทำขึ้นเพื่อกำหนดข้อกำหนดความต้องการเชิงฟังก์ชัน (Functional Requirements) และพฤติกรรมของระบบแบบครบวงจร (End-to-End) ในรูปแบบ BDD (Behavior-Driven Development) โดยเน้นลงลึกเฉพาะ **"ระบบจัดการเอกสาร (Document Management)"** ของระบบ T-check ตามโครงสร้าง Source Code จริงใน T-check (Frontend) และ tcheck-backend-real (Backend) ครอบคลุม:

> 1. **การควบคุมสิทธิ์และโหมดผู้ใช้ (Authentication, Guest Mode & Protected Routes):**  
   * ผู้ใช้ทั่วไป (Guest) สามารถเข้าเขียนข้อความใน Editor ได้ทันที และถูกจำกัดไม่ให้เข้าหน้าจัดการคลังเอกสาร (/docs จะ Redirect ไป /docs/editor อัตโนมัติ)  
   * บัญชีสมาชิกที่เข้าสู่ระบบแล้วจะสามารถบันทึก จัดการ ค้นหา และกู้คืนเอกสารบน MongoDB ได้อย่างสมบูรณ์  
> 2. **การสร้างเอกสารใหม่ (Document Creation & Initialization):**  
   * สร้างเอกสารใหม่จากปุ่ม \+ สร้างเอกสารใหม่ บนหน้ารายการเอกสาร หรือสร้างจากแถบเครื่องมือในหน้า Editor  
   * ตั้งชื่อเอกสารเริ่มต้นเป็น "เอกสารไม่มีชื่อ" (ความยาวสูงสุด 80 ตัวอักษร) พร้อมกำหนดเนื้อหาเริ่มต้น  
> 3. **การเปิดอ่าน แสดงผล และสถิติคำภาษาไทย (Document Viewing & Thai Language Stats):**  
   * การตัดคำและคำนวณสถิติตัวอักษร (Character Count), จำนวนคำไทย (Word Count), และเวลาในการอ่านโดยประมาณ (Estimated Read Time)  
> 4. **การสืบค้น กรอง และจัดเรียงรายการเอกสาร (Document Search, Filter & Sort):**  
   * ค้นหาเอกสารแบบ Real-time Search กรองตามชื่อเรื่องและเนื้อหา  
   * จัดเรียงตามเวลาแก้ไขล่าสุด (Newest / Oldest) และชื่อเรื่องตามลำดับตัวอักษร ก-ฮ (Title A-Z / Z-A)  
> 5. **การแก้ไข การแบ่งหน้า และการบันทึกอัตโนมัติ (Multi-Page Editing, Debounced Auto-Save & Manual Save):**  
   * รองรับเอกสารหลายหน้าด้วยเครื่องหมายคั่นหน้า \[---PAGE\_BREAK---\]  
   * ระบบ Debounced Auto-Save 2 วินาที พร้อม Badge แสดงสถานะ "บันทึกแล้ว" และเวลาบันทึกจริง  
   * ปุ่มลัดคีย์บอร์ด Ctrl \+ S สำหรับบันทึกเอกสารทันที  
> 6. **การตรวจจับไวยากรณ์ AI และการปรับเปลี่ยนระดับภาษา (AI Grammar Analysis & Tone Selection):**  
   * แถบวิเคราะห์ AI (Analysis Panel) ไฮไลต์คำผิดด้วยเส้นใต้หยักสีแดง  
   * สลับระดับภาษา (Tone: เป็นทางการ strict / เป็นกันเอง casual)  
   * ยอมรับการแก้ไขคำผิดและเก็บบันทึกประวัติการแก้ไข (Correction History Cap FIFO 50 รายการ)  
> 7. **การจัดการถังขยะ การกู้คืน และการลบถาวร (Trash Management, Soft-Delete, Restore & Hard Delete):**  
   * ย้ายเอกสารลงถังขยะ (is\_deleted: true)  
   * หน้ารายการถังขยะ (/docs/trash) พร้อมการสืบค้น  
   * การกู้คืนเอกสารกลับสู่หน้าปกติ (POST /api/docs/:id/restore)  
   * การลบเอกสารแบบถาวร (DELETE /api/docs/:id/permanent)

> 8. **การนำเข้าและส่งออกเอกสาร (Document Import & Export):**  
   * นำเข้าเอกสารจากไฟล์ภายในเครื่อง (.txt, .docx, .pdf) และ Google Docs Picker  
   * ส่งออกเอกสารเป็น PDF, Microsoft Word (.docx), และสร้างบน Google Docs  
> 9. **ความปลอดภัยและการแยกข้อมูลผู้ใช้ (Multi-Tenancy Isolation, IDOR & Storage Security):**  
   * แยกสิทธิ์และข้อมูลเอกสารตาม ownerId  
   * ป้องกัน IDOR และแยกร่าง LocalStorage ตาม User ID (tcheck\_local\_draft\_\${userId})

## **2\. นิยามบทบาทผู้ใช้และบัญชีทดสอบเริ่มต้น (User Roles & Test Personas)**

| Role | คำอธิบายสิทธิ์ในระบบ | บัญชีทดสอบ | Password | โควตา Token | สิทธิ์พิเศษ   |
| :---- | :---- | :---- | :---- | :---: | :---- |
| **Guest** | ผู้ใช้ที่ยังไม่ได้เข้าสู่ระบบ | ไม่มี Session | \- | 1,000 | ใช้งาน Editor ได้, บันทึกร่างใน localStorage, ไม่สามารถเข้า /docs ได้ |
| **User-Free (A)** | สมาชิกทั่วไป (Standard Free User) | user\_free\_a@test.com | password123 | 4,000 | สร้าง/แก้ไข/ค้นหา/ลบเอกสารบน Cloud, ส่งออก PDF & Word |
| **User-Free (B)** | สมาชิกทั่วไป (Secondary User สำหรับทดสอบ IDOR) | user\_free\_b@test.com | password123 | 4,000 | ใช้ตรวจสอบว่าไม่สามารถมองเห็นหรือแก้ไขเอกสารของ User A |
| **User-Pro (C)** | สมาชิกพรีเมียม (Pro Tier) | user\_pro\_c@test.com | password123 | 10,000 | สิทธิ์ส่งออกเอกสารไปยัง Google Docs, สลับโทนเสียง AI ขั้นสูง |
| **Admin** | ผู้ดูแลระบบ | admin@tcheck.com | password123 | 50,000 | สิทธิ์ระดับผู้ดูแลระบบ ตรวจสอบและบริหารจัดการคลังระบบ |

## 

## **3\. สรุปรายการ User Stories และตารางเชื่อมโยงการทดสอบ (Feature Map & Test Case Mapping)**

| Story ID | Feature Name | เส้นทาง URL | รหัส Test Case ที่เกี่ยวข้อง | Playwright Test Spec File   |
| :---- | :---- | :---- | :---- | :---- |
| **US-DOC-001** | Guest Access & Auto-Redirect | /docs ➔ /docs/editor | TC-GST-001, TC-GST-003 | tests/e2e/01\_guest\_draft\_mode.spec.ts |
| **US-DOC-002** | Guest Local Draft & Storage | /docs/editor | TC-GST-002, TC-GST-003 | tests/e2e/01\_guest\_draft\_mode.spec.ts |
| **US-DOC-003** | Document List View & Header | /docs | TC-CRE-001, TC-LST-001, TC-NAV-001 | tests/e2e/02\_doc\_..., tests/e2e/03\_doc\_... |
| **US-DOC-004** | Create Document from List | /docs ➔ /docs/editor | TC-CRE-001 | tests/e2e/02\_doc\_creation\_and\_editing.spec.ts |
| **US-DOC-005** | Real-time Search Documents | /docs | TC-SCH-001 | tests/e2e/03\_doc\_list\_search\_and\_sort.spec.ts |
| **US-DOC-006** | Sort Document Cards | /docs | TC-SRT-001 | tests/e2e/03\_doc\_list\_search\_and\_sort.spec.ts |
| **US-DOC-007** | Editor Title & Multi-Page Writing | /docs/editor/:id | TC-EDT-001, TC-NAV-001, TC-AI-001 | tests/e2e/02\_doc\_..., tests/e2e/04\_doc\_... |
| **US-DOC-008** | Live Thai Stats & Counters | /docs/editor | TC-EDT-001 | tests/e2e/02\_doc\_creation\_and\_editing.spec.ts |
| **US-DOC-009** | Debounced Auto-Save & Badge | /docs/editor | TC-EDT-001 | tests/e2e/02\_doc\_creation\_and\_editing.spec.ts |
| **US-DOC-010** | Manual Save Shortcut (Ctrl+S) | /docs/editor | TC-EDT-002 | tests/e2e/02\_doc\_creation\_and\_editing.spec.ts |
| **US-DOC-011** | AI Grammar Check & Analysis Panel | /docs/editor | TC-AI-002 | tests/e2e/04\_doc\_editor\_advanced\_features.spec.ts |
| **US-DOC-012** | AI Tone Switching Modal | /docs/editor | TC-TON-001 | tests/e2e/04\_doc\_editor\_advanced\_features.spec.ts |
| **US-DOC-013** | Accept AI Suggestions & History | /docs/editor | TC-HIS-001 | tests/e2e/04\_doc\_editor\_advanced\_features.spec.ts |
| **US-DOC-014** | Local File Import (TXT/DOCX/PDF) | /docs, /docs/editor | TC-IMP-001 | tests/e2e/05\_doc\_import\_export.spec.ts |
| **US-DOC-015** | Export Document (PDF/DOCX/Google Docs) | /docs/editor | TC-EXP-001 | tests/e2e/05\_doc\_import\_export.spec.ts |
| **US-DOC-016** | Move to Trash (Soft Delete) | /docs, /docs/editor | TC-TRH-001 | tests/e2e/06\_doc\_trash\_and\_recovery.spec.ts |
| **US-DOC-017** | Trash Management & Search | /docs/trash | TC-TRH-002 | tests/e2e/06\_doc\_trash\_and\_recovery.spec.ts |
| **US-DOC-018** | Restore Document from Trash | /docs/trash | TC-TRH-003 | tests/e2e/06\_doc\_trash\_and\_recovery.spec.ts |
| **US-DOC-019** | Hard Delete & Empty Trash | /docs/trash | TC-TRH-004 | tests/e2e/06\_doc\_trash\_and\_recovery.spec.ts |
| **US-DOC-020** | Multi-Tenancy & Data Isolation | /docs, /docs/editor | TC-SEC-001, TC-SEC-002 | tests/e2e/07\_multi\_tenancy\_and\_security.spec.ts |

## 

## **4\. รายละเอียด E2E BDD User Stories & Gherkin Scenarios**

### **Feature 1: การจัดการสถานะ Guest และการบันทึกร่าง Local Draft**

**Story ID:** US-DOC-001, US-DOC-002  
**ในฐานะ** ผู้ใช้งานทั่วไปที่ยังไม่ได้เข้าสู่ระบบ (Guest)  
**ฉันต้องการ** สามารถพิมพ์ข้อความและตรวจสอบคำผิดบนหน้า Editor ได้ทันที และให้ระบบบันทึกร่างไว้บน LocalStorage  
**เพื่อที่จะ** ทดลองใช้งานระบบได้ทันทีโดยไม่ต้องสมัครสมาชิก และข้อมูลไม่สูญหายเมื่อรีเฟรชเบราว์เซอร์  
`Feature: Guest Mode and Local Draft Management`  
  `As a guest visitor`  
  `I want to use the document editor and have my draft saved locally`  
  `So that I can try the system without signing in and avoid losing my writing`

  `@guest @navigation`  
  `Scenario: Guest navigating to /docs is redirected to /docs/editor`  
    `Given the visitor is not authenticated`  
    `When the visitor navigates to "https://t-check-two.vercel.app/docs"`  
    `Then the browser should automatically redirect to "https://t-check-two.vercel.app/docs/editor"`  
    `And the editor interface should be displayed in guest mode`

  `@guest @storage @auto-save`  
  `Scenario: Guest types text and draft is restored after page reload`  
    `Given the visitor is on "https://t-check-two.vercel.app/docs/editor"`  
    `When the visitor types "ข้อความร่างสำหรับทดสอบระบบ Guest" into the editor textarea`  
    `And the visitor waits for 2 seconds`  
    `Then the browser localStorage key "tcheck_local_draft_guest" should contain "ข้อความร่างสำหรับทดสอบระบบ Guest"`  
    `When the visitor reloads the web page`  
    `Then the editor textarea should display "ข้อความร่างสำหรับทดสอบระบบ Guest"`

  `@guest @quota`  
  `Scenario: Guest token quota is initialized to 1000 tokens`  
    `Given the visitor opens the editor for the first time`  
    `Then the guest token counter should display 1000 remaining tokens`  
    `And the token limit in localStorage "tcheck_guest_tokens" should equal "1000"`

### **Feature 2: หน้ารายการเอกสาร การค้นหา และการจัดเรียง (Document List, Search & Sort)**

**Story ID:** US-DOC-003, US-DOC-005, US-DOC-006  
**ในฐานะ** สมาชิกที่เข้าสู่ระบบ (User-Free หรือ User-Pro)  
**ฉันต้องการ** ดูคลังเอกสารของฉัน ค้นหาเอกสารด้วยคำสำคัญ และจัดเรียงลำดับเอกสาร  
**เพื่อที่จะ** ค้นหาและเข้าถึงเอกสารที่ต้องการทำงานได้อย่างสะดวกและรวดเร็ว  
`Feature: Document Listing, Search and Sorting`  
  `As an authenticated user`  
  `I want to view, search, and sort my document library`  
  `So that I can quickly organize and access my stored documents`

  `Background:`  
    `Given the user is authenticated as "user_free_a@test.com"`  
    `And the user is on the document management page "https://t-check-two.vercel.app/docs"`

  `@positive @ui`  
  `Scenario: View document cards in library`  
    `Then the page header should display "การจัดการเอกสาร"`  
    `And the document grid should display the user's active documents`  
    `And each document card should show the document title, preview snippet, and last updated time`

  `@search @realtime`  
  `Scenario: Real-time search by document title or content`  
    `When the user types "งบประมาณ" into the search input box`  
    `Then the document list should filter in real-time`  
    `And only documents containing "งบประมาณ" in title or content should be visible`  
    `When the user clears the search input box`  
    `Then all active documents should be restored in the list`

  `@sort @functional`  
  `Scenario: Sort documents by title in ascending alphabetical order (A-Z)`  
    `When the user selects "ชื่อ (ก-ฮ)" from the sort dropdown`  
    `Then the document cards should be reordered alphabetically from ก to ฮ`

### **Feature 3: การสร้างเอกสารใหม่และการแก้ไขใน Editor (Document Creation & Multi-Page Editing)**

**Story ID:** US-DOC-004, US-DOC-007, US-DOC-008, US-DOC-009, US-DOC-010  
**ในฐานะ** ผู้ใช้งานระบบ  
**ฉันต้องการ** สร้างเอกสารใหม่ เปลี่ยนชื่อเรื่อง พิมพ์ข้อความหลายหน้า และให้ระบบบันทึกอัตโนมัติ  
**เพื่อที่จะ** จัดการงานเขียนภาษาไทยได้อย่างมีประสิทธิภาพและปลอดภัยจากการสูญหายของข้อมูล  
`Feature: Document Creation and Editor Capabilities`  
  `As an authenticated user`  
  `I want to create, rename, and edit multi-page documents with automatic saving`  
  `So that my writing is continuously preserved and organized`

  `Background:`  
    `Given the user is authenticated as "user_free_a@test.com"`

  `@create @positive`  
  `Scenario: Click create new document and redirect to editor`  
    `Given the user is on "https://t-check-two.vercel.app/docs"`  
    `When the user clicks the "+ สร้างเอกสารใหม่" button`  
    `Then the system should navigate to "https://t-check-two.vercel.app/docs/editor"`  
    `And the document title input should show "เอกสารไม่มีชื่อ"`  
    `And a fresh blank page textarea should be ready for typing`

  `@edit @counters`  
  `Scenario: Rename document title and monitor live Thai statistics`  
    `Given the user is on the document editor page`  
    `When the user changes the document title to "รายงานผลการวิเคราะห์ภาษาไทย 2569"`  
    `And the user types "ระบบตรวจสอบไวยากรณ์ภาษาไทยรุ่นใหม่ล่าสุด" into page 1`  
    `Then the character counter should update to match the exact character length`  
    `And the Thai word counter should update with the segmented word count`  
    `And the estimated read time should be calculated`

  `@auto-save @shortcut`  
  `Scenario: Debounced auto-save and manual Ctrl+S shortcut`  
    `Given the user is typing new content in the editor`  
    `When 2.5 seconds have elapsed without further keystrokes`  
    `Then the save status badge in the header should change to "บันทึกแล้ว" with a green checkmark`  
    `When the user edits the text and presses "Ctrl + S"`  
    `Then the system should immediately trigger save without waiting for the debounce timer`

### 

### **Feature 4: การวิเคราะห์ไวยากรณ์ AI และการสลับระดับภาษา (AI Grammar & Tone)**

**Story ID:** US-DOC-011, US-DOC-012, US-DOC-013  
**ในฐานะ** ผู้ใช้งานระบบ  
**ฉันต้องการ** ให้ AI วิเคราะห์ตรวจจับคำผิด สลับระดับภาษา และยอมรับคำแนะนำลงในเนื้อหา  
**เพื่อที่จะ** ปรับปรุงคุณภาพงานเขียนภาษาไทยให้ถูกต้องตามหลักภาษาและเหมาะสมกับบริบท  
`Feature: AI Grammar Checking and Tone Customization`  
  `As a writer`  
  `I want AI-assisted grammar analysis, tone adaptation, and correction history`  
  `So that my Thai documents maintain high linguistic quality`

  `Background:`  
    `Given the user is authenticated and has an open document in the editor`

  `@ai @grammar`  
  `Scenario: Trigger AI Grammar Check with Ctrl+Enter shortcut`  
    `Given the editor contains text with spelling errors such as "สวัดดีตอนเช้า"`  
    `When the user presses "Ctrl + Enter" or clicks the grammar check button`  
    `Then the AI Analysis Panel should expand`  
    `And the misspelled word "สวัดดี" should be highlighted with a red wavy underline`  
    `And a correction card suggesting "สวัสดี" should appear in the suggestions list`

  `@tone @modal`  
  `Scenario: Switch writing tone between Strict and Casual`  
    `When the user clicks the Tone selection button in the toolbar`  
    `Then the Tone Selector modal should open`  
    `When the user selects "เป็นทางการ (Strict)"`  
    `Then the editor active tone setting should update to "strict"`

  `@correction @history`  
  `Scenario: Accept AI correction suggestion and verify FIFO history limit`  
    `Given a spelling suggestion for "สวัดดี" -> "สวัสดี" is displayed`  
    `When the user clicks "ยอมรับการแก้ไข" on the suggestion card`  
    `Then the text in the editor should replace "สวัดดี" with "สวัสดี"`  
    `And the correction should be logged in the Corrections History tab (maximum 50 items)`

### 

### **Feature 5: การนำเข้าและส่งออกเอกสาร (Document Import & Export)**

**Story ID:** US-DOC-014, US-DOC-015  
**ในฐานะ** ผู้ใช้งานระบบ  
**ฉันต้องการ** นำเข้าไฟล์จากภายนอก และส่งออกเอกสารเป็น PDF, Word หรือ Google Docs  
**เพื่อที่จะ** ทำงานร่วมกับโปรแกรมสำนักงานภายนอกได้อย่างไร้รอยต่อ  
`Feature: Document Import and Export`  
  `As an authenticated user`  
  `I want to import text files and export my documents to PDF, Word, and Google Docs`  
  `So that I can share and publish my documents across platforms`

  `@import @local-file`  
  `Scenario: Import local text file into document`  
    `Given the user is on the document list or editor page`  
    `When the user clicks "Import" and uploads a ".txt" file with Thai content`  
    `Then the system should parse the file and populate the editor pages with the text`  
    `And a success notification "นำเข้าไฟล์สำเร็จ" should be displayed`

  `@export @pdf @docx`  
  `Scenario: Open Export modal and select export format`  
    `Given the user is in the editor with a completed document`  
    `When the user clicks the "Export / ส่งออก" button in the toolbar`  
    `Then the Export modal should open with options:`  
      `| Export Option | File Format |`  
      `| PDF Document  | .pdf        |`  
      `| Word Document | .docx       |`  
      `| Google Docs   | Cloud Sync  |`

### 

### 

### 

### **Feature 6: วงจรชีวิตถังขยะ การกู้คืน และการลบถาวร (Trash Management, Restore & Hard Delete)**

**Story ID:** US-DOC-016, US-DOC-017, US-DOC-018, US-DOC-019  
**ในฐานะ** ผู้ใช้งานระบบ  
**ฉันต้องการ** ย้ายเอกสารลงถังขยะ ตรวจสอบรายการในถังขยะ กู้คืนเอกสาร หรือลบแบบถาวร  
**เพื่อที่จะ** จัดการพื้นที่เก็บข้อมูลและป้องกันการลบเอกสารผิดพลาดโดยไม่ได้ตั้งใจ  
`Feature: Trash Lifecycle, Recovery and Permanent Deletion`  
  `As an authenticated user`  
  `I want a safety trash system to recover deleted documents or permanently erase them`  
  `So that I have full control over document retention`

  `Background:`  
    `Given the user is authenticated as "user_free_a@test.com"`

  `@trash @soft-delete`  
  `Scenario: Move an active document to trash`  
    `Given the user is on "https://t-check-two.vercel.app/docs"`  
    `When the user clicks the delete trash icon on a document card`  
    `And confirms the delete action`  
    `Then the document should be removed from the active document list`  
    `And its database status should become "is_deleted: true"`

  `@trash @restore`  
  `Scenario: Restore document from trash back to active library`  
    `Given the user navigates to "https://t-check-two.vercel.app/docs/trash"`  
    `When the user clicks "กู้คืน" on a deleted document item`  
    `Then the document should disappear from the trash list`  
    `And the document should reappear in the active document library on "/docs"`

  `@trash @hard-delete`  
  `Scenario: Permanently hard delete a document`  
    `Given the user is on "https://t-check-two.vercel.app/docs/trash"`  
    `When the user clicks "ลบถาวร" on a deleted document item`  
    `And confirms the permanent deletion dialog`  
    `Then the document record should be completely removed from MongoDB`

### 

### 

### 

### **Feature 7: ความปลอดภัยและการแบ่งแยกข้อมูลผู้ใช้ (Multi-Tenancy Isolation & Security)**

**Story ID:** US-DOC-020  
**ในฐานะ** สถาปัตยกรรมความปลอดภัยของระบบ  
**ฉันต้องการ** ให้ระบบแบ่งแยกข้อมูลผู้ใช้แต่ละบัญชีอย่างเด็ดขาด  
**เพื่อที่จะ** ป้องกันช่องโหว่ IDOR, ป้องกันการเข้าถึงข้อมูลข้ามบัญชี และรักษาความลับของเอกสาร  
`Feature: Multi-Tenancy Isolation and Access Security`  
  `As a security compliance requirement`  
  `I want complete isolation of documents between users`  
  `So that no user can view, edit, or delete documents belonging to another user`

  `@security @idor`  
  `Scenario: User B cannot see or query User A documents`  
    `Given User A has created private documents in the database`  
    `When User B logs into the system and visits "https://t-check-two.vercel.app/docs"`  
    `Then the document list must NOT contain any documents belonging to User A`  
    `When User B attempts to access "https://t-check-two.vercel.app/docs/editor/doc_user_a_001"`  
    `Then the system must deny access with HTTP 403 or redirect to safe view`

  `@security @storage`  
  `Scenario: LocalStorage drafts are isolated by User ID`  
    `Given User A writes a draft in the editor`  
    `Then the draft is saved under key "tcheck_local_draft_user_a"`  
    `When User B logs in on the same browser`  
    `Then User B cannot read User A draft key`  
    `And User B operates on their isolated key "tcheck_local_draft_user_b"`

## 

## 

## 

## 

## 

## **5\. สรุปความสอดคล้องกับชุดทดสอบ Playwright และกรณีทดสอบ (Traceability Matrix)**

| User Story ID | Gherkin Feature Name | รหัสกรณีทดสอบ (Test Case IDs) | Playwright Spec File | ผลการทดสอบ (Status)   |
| :---- | :---- | :---- | :---- | ----- |
| US-DOC-001, US-DOC-002 | Feature 1: Guest Mode & Local Draft | TC-GST-001, TC-GST-002, TC-GST-003 | tests/e2e/01\_guest\_draft\_mode.spec.ts | **PASSED (3/3)** |
| US-DOC-004, US-DOC-007 \- 010 | Feature 2: Document Creation, Title Edit & Save | TC-CRE-001, TC-EDT-001, TC-EDT-002 | tests/e2e/02\_doc\_creation\_and\_editing.spec.ts | **PASSED (3/3)** |
| US-DOC-003, US-DOC-005, US-DOC-006 | Feature 3: Document List, Search & Sort | TC-LST-001, TC-SCH-001, TC-SRT-001, TC-NAV-001 | tests/e2e/03\_doc\_list\_search\_and\_sort.spec.ts | **PASSED (4/4)** |
| US-DOC-011, US-DOC-012, US-DOC-013 | Feature 4: AI Grammar, Tone & History | TC-AI-001, TC-AI-002, TC-TON-001, TC-HIS-001 | tests/e2e/04\_doc\_editor\_advanced\_features.spec.ts | **PASSED (4/4)** |
| US-DOC-014, US-DOC-015 | Feature 5: Document Import & Export | TC-IMP-001, TC-EXP-001 | tests/e2e/05\_doc\_import\_export.spec.ts | **PASSED (2/2)** |
| US-DOC-016 \- US-DOC-019 | Feature 6: Trash Lifecycle & Hard Delete | TC-TRH-001, TC-TRH-002, TC-TRH-003, TC-TRH-004 | tests/e2e/06\_doc\_trash\_and\_recovery.spec.ts | **PASSED (4/4)** |
| US-DOC-020 | Feature 7: Multi-Tenancy & IDOR Isolation | TC-SEC-001, TC-SEC-002 | tests/e2e/07\_multi\_tenancy\_and\_security.spec.ts | **PASSED (2/2)** |
| **รวมทั้งสิ้น** | **7 Features ครบถ้วน** | **22 กรณีทดสอบ E2E** | **7 Test Specs** | **100% Passed (22/22)** |

### **รายงานผลการทดสอบอัตโนมัติบน CI/CD (GitHub Pages)**

รายงานผลการทดสอบ HTML Interactive Report พร้อมภาพหน้าจอและวิดีโอ ถูกบันทึกและเผยแพร่อัตโนมัติผ่าน GitHub Actions:  
🔗 [Playwright Test Report Live on GitHub Pages](https://thanawat-pete.github.io/exam-midterm-user-stories-manage-document/)