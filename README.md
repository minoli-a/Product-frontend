# Product Maintenance - FrontEnd (React)

This React application provides a user interface to manage products from the backend API

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### When visiting `http://localhost:3000`
You will see:
- Product list with:
  - Product Name
  - Quantity
  - Operations:
    - **Add** → increases quantity by 1
    - **Remove** → decreases quantity by 1
    - **Update** → opens form to edit the entire product

### Additional frontend behaviors:
- User can **add a new product**, and it will appear on the **last page**.
- User can move between pages using **Next** and **Previous** controls.

## Folder Structure

```
src/
├── components/  # Product list, product form, etc.
├── api/         # API request logic (Axios/fetch)
├── App.js
└── index.js
```