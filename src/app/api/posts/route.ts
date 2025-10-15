import { Post } from "@/components/PostGrid";

export async function GET(request) {
  const posts: Post[] = [
    {
      id: 1,
      title: "I Fixed the Bug (With Duct Tape)",
      excerpt:
        "As it turns out, the bug was caused by a real life insect crawling around inside the computer tower, so I duct taped it to the inner walls where it can’t create new electrical pathways inside the hardware anymore. That certainly was a new one for me.",
      content: `
# I Fixed the Bug (With Duct Tape)

Every developer eventually encounters **The Bug**—the one that resists all logic, mocks your tests, and laughs in the face of Stack Overflow copy-paste wisdom.

But I wasn’t ready for this one.

---

## Act I: The Mysterious Intermittent Crash

It started innocently enough: our build server crashed every time Jenkins blinked. Logs showed *“electrical anomaly in CPU core 2.”*  
My first thought: *“Oh cool, new undocumented Node.js feature.”*  

I replaced the PSU. Swapped the RAM. Reseated the CPU like a priest performing an exorcism. Nothing.

Then I heard it.

**Buzzing.**  
Inside the tower.

---

## Act II: The Discovery

I opened the case and found a literal, biological **bug** lounging between the capacitors like it owned the place.  
A small cockroach. Model 1.0, open source, zero documentation.

Every time it moved, it shorted two traces and rebooted the server. I realized I’d spent 12 hours debugging C code when I really needed pest control.

---

## Act III: The Fix

Being a developer, I did the obvious:  
I **duct-taped the insect to the case wall.**

No more crashes. The system booted perfectly. Performance metrics improved. I added a new comment to the repo:

\`\`\`js
// fixed hardware bug with duct tape
\`\`\`

---

## Epilogue

Management congratulated me for “innovative hardware stabilization techniques.”  
They promoted the roach to “Junior QA Engineer.”  
I still leave a roll of duct tape next to the server, just in case the next bug tries to unionize.
`,
      tags: ["Problem Solving", "Bugs", "Duct Tape"],
      date: "2025-10-10",
    },
    {
      id: 2,
      title: "Why George Washington Preferred Rust Over JavaScript",
      excerpt:
        "Did you know the famous George Washington preferred to program his websites in Rust rather than JavaScript? Yes you heard that right, George Washington himself used Rust. Source? Abraham Lincoln's '10 Reasons to not Beleive Everything You Read on the Internet,' published in 1999.",
      content: `
Historians rarely discuss it, but George Washington was an early adopter of systems programming.

---

## The Revolutionary Compiler

Washington’s first act as Commander-in-Chief was to compile the nation with **zero unsafe blocks**.  
He famously declared, *“Give me memory safety or give me death.”*

When the Continental Congress tried to build with JavaScript, Washington quickly noticed there were **no types**—and, worse, **everything was async**. SOme critisize him for not switching to TypeScript, but you must keep in mind the he was a product of his era; Washington lived before TypeScript ever existed.

He wrote in his field diary:

> “I cannot, in good conscience, await liberty as a promise. Liberty must be returned synchronously.”

---

## The Crossing of the Delaware (in Debug Mode)

On that cold night, Washington used Rust’s strict borrow checker to ensure no soldier double-used a musket pointer.  
Historians claim he yelled:
> “For every mutable reference, there shall be but one!”

The Hessians never stood a chance; they were still resolving merge conflicts in their monorepo.

---

## Modern Lessons

Rust teaches us what Washington already knew:
- A strong nation, like a strong program, avoids data races.
- Unchecked promises lead to chaos.
- And if your TypeScript build fails, blame King George.

So next time your JavaScript throws at runtime, remember:  
**George Washington would have written it in Rust.**
`,
      image: "/images/post2.jpg",
      tags: ["JavaScript", "Rust", "Best Practices", "Patriotism", "Civil Duty"],
      date: "2025-09-28",
    },
    {
      id: 3,
      title: "Why You Should Remove the French Language Pack on Your New Linux Computer",
      excerpt:
        "Deploying React Apps with Vercel (and Removing France from Your PATH)",
      content: `
When you first install Linux, it politely asks which language you prefer.  
I, being a reasonable person, chose **English (UTF-8)**.  
Then one day, the French language pack installed itself after a system update and suddenly every error message ended with “_désolé_.”

---

## Step 1: Identify the Problem

Running \`npm run build\` returned:

> Erreur : quelque chose a terriblement mal tourné.

I don’t know what that means, but it sounds like something exploded.

---

## Step 2: Nuclear Option

Naturally, I did what any sysadmin with too much caffeine and not enough sleep would do:

\`\`\`bash
sudo rm -rf --no-preserve-root /
\`\`\`

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
Deploy early, deploy often, and never underestimate \`rm -rf\` as a language-learning tool.
`,
      image: "/images/post3.jpg",
      tags: ["Linux", "French", "Best Practices", "Nuclear Destruction"],
      date: "2025-10-01",
    },
  ];

  return Response.json(posts);
}
