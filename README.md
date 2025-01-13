# Dashboard Application

## Overview
This project implements a responsive dashboard application for managing products using a paginated table. It features product creation, editing, deletion, and a summary view of product statuses.

## Features
- **Responsive Design**: Adapts seamlessly to desktop and mobile devices.
- **CRUD Operations**:
  - Create a new product.
  - Edit an existing product.
  - Delete a product.
- **Product Summary**:
  - Displays total product count and counts by status (Pending, Delivered, Cancelled).
- **Pagination**:
  - Supports navigating products with "Next" and "Previous" buttons, showing 5 records per page.

## Tech Stack
- **Frontend**: React with TypeScript.
- **State Management**: Zustand for managing application state.
- **Styling**: TailwindCSS for a modern and clean design.

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Run the application**:
   ```bash
   yarn run dev
   ```

4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Implementation Approach
1. **State Management**:
   - The application state is managed using Zustand, allowing simple and effective state updates for CRUD operations.
   - Products are stored in a central state, and updates automatically reflect in the UI.

2. **Components**:
   - **ProductForm**: A reusable form component for adding and editing products.
   - **ProductTable**: Displays products in a table with support for editing and deleting entries.
   - **Pagination**: Handled by slicing the product list and providing navigation buttons.

3. **Status Summary**:
   - Calculated dynamically using the `reduce` function on the product list.

4. **Pagination**:
   - Implements a simple approach by slicing the `products` array based on the current page and page size.

## Tests
Tests have been written to ensure the functionality of the application. The tests cover the following aspects:
- **Unit Tests**: Verify the correctness of individual functions and components.
- **Integration Tests**: Ensure that different parts of the application work together as expected.
- **End-to-End Tests**: Simulate user interactions to verify the overall functionality of the application.

To run the tests, use the following command:
```bash
yarn test
```

Test files are located in the `__tests__` directory and follow the naming convention `*.test.tsx` for consistency.

## Assumptions
- Products are stored locally in the state and are not fetched from an external API.
- The application assumes the provided schema structure for products and packages.
