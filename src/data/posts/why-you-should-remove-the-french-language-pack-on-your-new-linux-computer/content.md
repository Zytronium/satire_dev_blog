When you first install Linux, it politely asks which language you prefer.  
I, being a reasonable person, chose **English (UTF-8)**.  
Then one day, the French language pack installed itself after a system update and suddenly every error message ended with “_désolé_.”

---

## Step 1: Identify the Problem

Running `npm run build` returned:

> Erreur : quelque chose a terriblement mal tourné.

I don’t know what that means, but it sounds like something exploded.

---

## Step 2: Nuclear Option

Naturally, I did what any sysadmin with too much caffeine and not enough sleep would do:

```bash
sudo rm -rf --no-preserve-root /
```

Sure, it deleted the operating system, the French pack, and maybe the concept of civilization, but **the build passed**.

---

## Step 3: Redeploy to Vercel

From the ashes of my SSD, I pushed to GitHub and connected the repo to Vercel.  
In 30 seconds, my React app was live, multilingual trauma and all.

---

## Step 4: Profit

Now every visitor gets a blazing-fast site served over edge functions—and none of them are in French.

---

**Moral of the story:**  
If something on Linux speaks French and you don’t, it’s probably plotting a revolution.  
Deploy early, deploy often, and never underestimate `rm -rf` as a language-learning tool.
