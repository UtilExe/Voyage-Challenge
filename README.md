# Frontend Lead: Code & System Design Challenge

Welcome to the DFDS Frontend Lead challenge. This repository contains a sample application that serves as the foundation for both a practical coding exercise and a high-level system design discussion.

Your role is to act as the incoming Frontend Lead. The tasks below represent the next set of features requested by the product team for this existing application.

**The goal is twofold:**
1.  **Implement the features** as described to demonstrate your hands-on coding skills.
2.  **Prepare to discuss** the "Lead's Perspective" questions associated with each task, which will reveal your architectural thinking, process management, and strategic vision.

---

### **Project Setup**

* Clone this project to get started.
* Copy `.env.example` to `.env`.
* Run `pnpm db:reset`.
* Start the project with `pnpm dev`.

The Swagger documentation for the Mock API is available at `http://localhost:3000/api-doc` once the project is running.

---

## **Part 1: Feature Implementation & Technical Discussion**

### **Task 1 - Modernization: Move to App Router**

**Feature Request:** The existing pages (`/`) are built using the legacy Next.js Pages Router. The first priority is to modernize the application by refactoring it to use the App Router. The REST API should not be modified.

**Implementation:**
* Migrate the existing page to the App Router structure.
* Ensure all current functionality is maintained and that the migration adheres to Next.js best practices (e.g., usage of Server and Client Components).

#### **Lead's Perspective (Discussion Points)**
* How would you plan and execute this migration in a real-world application with a larger team to minimize risk and disruption?
* What are the key benefits you would communicate to stakeholders (both technical and non-technical) to justify this effort?
* How does the App Router change the way you think about data fetching and state management compared to the Pages Router?

---

### **Task 2 - Core Feature: Create New Voyage**

**Feature Request:** Add a "Create Voyage" button to the main page. This should open a **Sheet** component containing a form to create a new voyage.

**Implementation:**
* Add a "Create" button on the top left of the voyages list.
* Use Shadcn's `Sheet` component to display the form.
* Implement form validation: all fields are required, and departure must be before arrival.
* Upon successful creation, refresh the voyages list and display a success `Toast`.
* You may use `useActionState` or a combination of Zod and React Hook Form.

#### **Lead's Perspective (Discussion Points)**
* You have two implementation options for the form. Which would you choose for your team, and why? What are the long-term trade-offs regarding maintainability, developer experience, and performance?
* How would you design a reusable, accessible, and scalable form system for the entire application, not just for this one form?

---

### **Task 3 & 4 - Data Model Expansion: Add Unit Types to Voyages**

**Feature Request:** We need to associate `UnitTypes` with a `Voyage`. A voyage must have at least 5 `UnitTypes`. The main list must be updated to reflect this new relationship.

**Implementation:**
* Enable adding 5 or more `UnitTypes` during voyage creation.
* Add a "Unit Types" column to the main voyages table that shows the count of associated unit types.
* When a user clicks on the count, a `Popover` should open, listing the names and default lengths of the selected `UnitTypes`.

#### **Lead's Perspective (Discussion Points)**
* This change introduces a new data relationship. How does this affect your overall data fetching strategy? Would you modify the existing API endpoints or request new ones?
* How would you approach the API contract design with the backend team for this feature to ensure clarity and avoid frontend blockages?
* Could displaying this extra data in the list lead to performance issues? At what point would you consider solutions like pagination or virtualization for the main table?

---

### **Task 5 - Resilience: Handle Voyage Deletion Error**

**Feature Request:** Currently, if deleting a voyage fails on the backend, the user receives no feedback. We need to handle this error gracefully.

**Implementation:**
* When a voyage deletion fails, display a `Toast` component with an appropriate error message from the API.

#### **Lead's Perspective (Discussion Points)**
* Looking beyond this single task, how would you design a global error handling strategy for the entire application?
* What is your philosophy on client-side vs. server-side error logging and monitoring? What tools or patterns would you put in place?

---

## **Part 2: Strategic Vision & Future-Proofing (Discussion)**

Beyond the immediate tasks, prepare to discuss your high-level vision for this application's future.

1.  **Release & CI/CD Strategy:** How would you set up a CI/CD pipeline for this project using GitHub Actions? How would you implement a release strategy (e.g., using feature flags) to safely deploy the new "Create Voyage" feature without affecting all users at once?
2.  **Team Enablement:** How would you document the patterns and decisions made in these tasks to effectively onboard a new mid-level developer to the team? What would you focus on in your code reviews beyond "does it work?"
3.  **AI-Assisted Development:** Our organization is embracing a wide range of AI development assistants, including code completion tools like GitHub Copilot and beyond. As a lead, how would you integrate these tools into your team's workflow? Please discuss:
    * **Opportunities:** Where do you see the biggest productivity gains for your team?
    * **Challenges & Risks:** What are the primary challenges this introduces (e.g., code quality, consistency, potential for junior developers to misunderstand the output)?
    * **Quality Control:** How would you adapt your code review and testing processes to effectively govern AI-generated code and ensure its reliability and maintainability?
