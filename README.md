# AeroTask - Task Management
AeroTask is a clean, simple task management dashboard I built as part of the TechSkillUp2 Web Development course. It lets you track your daily tasks, view productivity metrics, and manage your focus for the day.

My goal with this project was to practice building a realistic, professional-looking interface from scratch without relying on external frameworks.

## Features
- **Dashboard Layout:** A custom CSS Grid and Flexbox layout featuring a sidebar, a metrics grid, and a main workspace.
- **Task Management:** Click the "+ New Task" button to open a custom modal where you can add new tasks to your list.
- **Interactive Tasks:** Checking off a task automatically crosses it out.
- **Theme Selector:** A mock UI dropdown in the sidebar to simulate theme switching.

## How it was built
I built this entirely with vanilla web technologies to focus on the fundamentals:
- **HTML:** Used semantic tags (`<header>`, `<main>`, `<aside>`) to structure the dashboard properly.
- **CSS:** I stuck to direct CSS class targeting instead of using complex CSS variables. This kept my code easy to read and debug while I learned how to properly use Flexbox and Grid to position elements.
- **JavaScript:** Used to handle the DOM manipulation. The JS listens for the "New Task" form submission, creates a new HTML `div` with the task info, and appends it to the page dynamically.

## Running the project
You don't need any special servers or tools to run this. 
1. Download the code or clone the repository.
2. Double-click the `index.html` file to open it directly in your web browser.
---
**Author:** Mahlet Chanie  
**Email:** mahichanie126@gmail.com 
**GitHub:** [github.com/mahlet-1](https://github.com/mahlet-1)