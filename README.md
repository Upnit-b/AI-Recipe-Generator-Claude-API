# 👨‍🍳 Recipe Generator — AI Recipe Generator

Turn the ingredients you already have into a delicious recipe — powered by **Anthropic’s Claude AI** and built with **Next.js**.

👉 Live demo: https://ai-recipe-generator-claude-c50qul7f7-upnits-projects.vercel.app  
*(No signup, no tracking — just cooking inspiration)*

---

## ✨ What is Recipe Generator?

**Recipe Generator** is a modern, AI-powered web app that helps you decide *what to cook* using the ingredients you already have at home.

Instead of searching endless recipes, you simply:
1. Add your ingredients
2. Click **“Get a recipe”**
3. Instantly receive a **beautifully formatted recipe in Markdown**

The AI may suggest a few extra ingredients — but always keeps it realistic and minimal.

---

## 🧠 How it Works

- Users add ingredients via a clean, intuitive UI
- Ingredients are sent to a **server-side Next.js API route**
- Claude AI generates a recipe based on the input
- The recipe is returned in **Markdown**
- Markdown is rendered cleanly for a great reading experience

🔒 **Your API key is never exposed to the browser**

---

## 🚀 Features

- 🧾 Ingredient input with smart duplicate handling
- ✂️ Remove ingredients easily (chip-based UI)
- 🤖 AI-generated recipes using Claude 3
- 📄 Markdown-rendered recipes (headings, lists, steps)
- 🎨 Modern, accessible UI (Tailwind CSS)
- 🔐 Secure server-side API integration
- 🌍 Deployed on Vercel (no custom domain required)

---

## 🛠 Tech Stack

| Layer        | Technology |
|-------------|------------|
| Frontend     | Next.js (App Router) |
| Styling      | Tailwind CSS |
| AI Model     | Anthropic Claude 3 Haiku |
| Markdown     | react-markdown |
| Validation   | Zod |
| Deployment   | Vercel |
| Runtime      | Node.js |

---

```text
Add ingredients → Generate recipe → Enjoy cooking
