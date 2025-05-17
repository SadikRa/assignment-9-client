# 📝 Criti Check

**Criti Check** is a modern product review portal where users can share honest reviews, explore product feedback, and interact with other users. It supports various product categories like gadgets, fashion, appliances, books, and more. The platform is designed to be responsive, user-friendly, and secure — suitable for both casual users and administrators.

---

## 📄 Project Overview

Criti Check allows users to browse, write, and manage product reviews with a clean and interactive interface. It includes role-based access where:
- **Users** can create accounts, write/edit/delete their reviews, and engage with others' reviews.
- **Admins** can manage users, reviews, and moderate platform content.

The portal aims to make review sharing reliable and transparent, helping consumers make better decisions.

---

## 🌟 Features

### 🔐 Authentication
- User Registration and Login (with secure password hashing)
- JWT-based token authentication
- Role-based access (User/Admin)
- Logout and session management

### 📦 Review System
- Browse all product reviews
- Filter/search by category, product name, or reviewer
- Detailed product review pages with:
  - Ratings
  - Pros/cons
  - Comments
- User voting/feedback (e.g., "Helpful" votes)

### 🛠 Dashboard
- **User Dashboard**
  - Manage profile and password
  - Create, edit, or delete own reviews
- **Admin Dashboard**
  - Manage users
  - Approve, edit, or remove reviews
  - Moderate comments or reported content

### 💡 Optional Features
- Featured Reviews or Editor's Picks
- One-time payment for premium content
- Blog or articles section on product trends

---

## 🖌 UI/UX Highlights
- Fully responsive design for mobile and desktop
- Clean, accessible layouts and navigation
- Toast messages for user actions (e.g., login success, review posted)
- Error handling for invalid credentials, duplicate accounts, etc.

---

## 💻 Tech Stack

| Layer        | Technology                  |
|--------------|------------------------------|
| Frontend     | Next.js, React, Tailwind CSS |
| Backend      | Node.js, Express.js          |
| Database     | MongoDB / PostgreSQL         |
| Auth         | JWT (JSON Web Tokens)        |
| Styling      | Tailwind CSS, Heroicons      |
| ORM (if used)| Prisma / Mongoose            |

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/criti-check.git
   cd criti-check
# 🚀 Project Setup & Contribution Guide

## 🧱 1. Clone the Repository

```bash
git clone https://github.com/SadikRa/assignment-9-client.git
cd assignment-9-server
```

📦 2. Install Dependencies

Using npm:

npm install

Or using yarn:

yarn install

▶️ 3. Run the Development Server

npm run dev

⚙️ Environment Setup

Create a .env file by copying the contents of .env.example.
For Windows (CMD):

copy .env.example .env

For Windows (PowerShell):

Copy-Item .env.example .env

For Mac/Linux:

cp .env.example .env

Then, open .env and update your environment variables (like DATABASE_URL).
🛠️ Git Workflow for Contribution
✅ Step 1: Create a New Branch

Always start from the latest main:

```bash
git checkout main
git pull origin main
git checkout -b yourName/feature-name
```

    🔁 Replace:

        yourName with your actual name or GitHub username.

        feature-name with a short task description like review-crud or fix-payment-bug.

✍️ Step 2: Make Changes and Commit

git add .
git commit -m "feat: short summary of what you added or fixed"

Follow conventional commits:
feat, fix, docs, chore, refactor, etc.
🔄 Step 3: Sync with Main Before Pushing

Stay up-to-date with main:

```bash
git checkout main
git pull origin main
git checkout yourName/feature-name
git rebase main
```

If conflicts appear:

# resolve conflicts manually, then

git add .
git rebase --continue

⬆️ Step 4: Push Your Work

```bash
git push -u origin yourName/feature-name
```

💡 Git Tips

    Run git status often to track file changes.

    Use git log --oneline for a readable history.

    Use git stash to temporarily save changes before switching branches.

📄 Example Branch Name

sadik/add-payment-model
sadik/fix-review-bug
