/* =====================================================================
   CONTENT FILE — edit this file to update the website.
   Rules:
   - Only change text inside "quotes". Keep the commas and brackets.
   - Photos go in the images/ folder. Write the file name here,
     e.g. "images/hero.jpg". Leave "" to show the blue placeholder.
   - After saving, upload this file again (or commit it on GitHub).
   ===================================================================== */
window.SITE = {

  /* ---------- Centre details ---------- */
  shortName: "Lumen",                    // shown next to the logo
  fullName: "Lumen Learning Centre",    // shown in the footer copyright
  logo: "",                    // e.g. "images/logo.png" (transparent PNG or SVG, white works best)
  logoReplacesName: false,     // true = show only the logo, hide the name text

  whatsapp: "60123456789",     // country code + number, no spaces, no + (e.g. 60123456789)
  phoneDisplay: "+60 12-345 6789",
  whatsappGreeting: "Hi, I'd like to ask about tuition classes",
  email: "hello@example.com",
  address: "[Street address], [Town], Selangor",
  hours: "Mon–Fri 2pm–9pm · Sat 9am–5pm",
  social: {                    // paste full links, or "" to hide that link
    facebook: "",
    instagram: "",
    tiktok: ""
  },

  /* ---------- Hero (first screen) ---------- */
  heroTitle: "Learn With Confidence",
  heroTagline: ["Small Classes,", "Big Progress"],     // two lines
  heroCard: { number: "500+", caption: "Students enrolled" },

  // The three small cards that rotate in the hero (desktop only)
  highlights: [
    { slot: "card-1", label: "SPM Intensive",     title: "Form 5 revision camp", cta: "Reserve a seat", level: "Form 4–5 (SPM)" },
    { slot: "card-2", label: "Holiday Programme", title: "School break classes", cta: "See schedule",   level: "Std 4–6" },
    { slot: "card-3", label: "New Students",      title: "Free trial class",     cta: "Book a slot",    level: "Std 1–3" }
  ],

  /* ---------- Photos ---------- */
  photos: {
    "hero": "",        // wide classroom photo, landscape, about 2000px wide
    "card-1": "", "card-2": "", "card-3": "",   // small square photos for the hero cards
    "students": "",    // portrait photo for the hero card
    "tutor-1": "", "tutor-2": "", "tutor-3": "",  // tutor portraits (3:4 portrait)
    "space-icon": "",  // small square detail photo
    "room-1": "", "room-2": "",                    // classroom photos (3:4 portrait)
    "event-1": "", "event-2": "", "event-3": ""    // event photos (landscape)
  },

  /* ---------- Trust section ---------- */
  trustBadge: { number: "1:8", caption: "Max students per tutor" },
  trustCard: {
    title: "Trusted by parents",
    text: "From students catching up on the basics to those aiming for straight A's, parents choose us because the results show up in school reports."
  },
  // words: the 4 big background words shown with each tutor (keep them short)
  tutors: [
    { slot: "tutor-1", name: "Cikgu Aina",       role: "Head of Science",         words: ["Caring", "Exam-", "Focused", "Tutors"] },
    { slot: "tutor-2", name: "Cikgu Hafiz",      role: "Mathematics & Add Maths", words: ["Clearer", "Calmer", "Brighter", "Minds"] },
    { slot: "tutor-3", name: "Teacher Mei Ling", role: "English & Bahasa Melayu", words: ["Future", "Achievers", "Start", "Here"] }
  ],

  /* ---------- Programmes ---------- */
  // level must match one of: "Std 1–3", "Std 4–6", "Form 1–3", "Form 4–5 (SPM)"
  programmes: [
    { name: "Primary (Std 1–6)",          desc: "Strong foundations in BM, English, Maths and Science, with UASA preparation.", level: "Std 4–6" },
    { name: "Lower Secondary (Form 1–3)", desc: "Core subjects and study habits for the move to secondary school.",            level: "Form 1–3" },
    { name: "SPM (Form 4–5)",             desc: "Exam-focused classes, past-year papers and intensive revision camps.",         level: "Form 4–5 (SPM)" },
    { name: "One-to-One Tuition",         desc: "Personal sessions planned around your child's pace and timetable.",          level: "Form 1–3" }
  ],

  /* ---------- Learning spaces ---------- */
  spacesText: "Air-conditioned classrooms kept small on purpose, so every student gets noticed, asks questions and gets the help they need.",
  rooms: [
    { name: "Focus Classroom", text: "Small-group lessons with a whiteboard and one tutor per class." },
    { name: "Study Corner",    text: "A quiet space for homework help and exam revision." }
  ],

  /* ---------- Numbers ---------- */
  stats: [
    { value: "15",   label: "Qualified tutors" },
    { value: "6",    label: "Classrooms" },
    { value: "500+", label: "Students taught" },
    { value: "10",   label: "Years teaching" }
  ],

  /* ---------- CLASS SCHEDULE (EXAMPLE — replace with the real timetable) ----------
     One block per day. To add a class, copy one { ... } line and change it.
     A day with no classes: classes: []                                            */
  scheduleNote: "Timetable for this term. WhatsApp us to check available seats.",
  schedule: [
    { day: "Monday", classes: [
      { time: "3:00–4:30pm", level: "Std 4–6",  subject: "Mathematics", tutor: "Cikgu Hafiz" },
      { time: "8:00–9:30pm", level: "Form 4–5", subject: "Physics",     tutor: "Cikgu Aina" }
    ]},
    { day: "Tuesday", classes: [
      { time: "3:00–4:30pm", level: "Std 1–3",  subject: "English",     tutor: "Teacher Mei Ling" },
      { time: "8:00–9:30pm", level: "Form 1–3", subject: "Science",     tutor: "Cikgu Aina" }
    ]},
    { day: "Wednesday", classes: [
      { time: "8:00–9:30pm", level: "Form 4–5", subject: "Add Maths",   tutor: "Cikgu Hafiz" }
    ]},
    { day: "Thursday", classes: [
      { time: "3:00–4:30pm", level: "Std 4–6",  subject: "Bahasa Melayu", tutor: "Teacher Mei Ling" },
      { time: "8:00–9:30pm", level: "Form 4–5", subject: "Chemistry",   tutor: "Cikgu Aina" }
    ]},
    { day: "Friday", classes: [
      { time: "3:00–4:30pm", level: "Std 1–3",  subject: "Mathematics", tutor: "Cikgu Hafiz" }
    ]},
    { day: "Saturday", classes: [
      { time: "9:00–10:30am", level: "Form 4–5", subject: "SPM Revision", tutor: "All tutors" },
      { time: "11:00am–12:30pm", level: "Form 1–3", subject: "Mathematics", tutor: "Cikgu Hafiz" }
    ]}
  ],

  /* ---------- NEWS & EVENTS (newest first) ----------
     To add an event: copy one { ... } line to the top and change it.
     slot: use "event-1", "event-2" or "event-3" to pick which photo shows. */
  events: [
    { slot: "event-1", date: "12 Nov", title: "SPM Revision Camp",          summary: "Three days of past-year papers, exam technique and timed practice for Form 5." },
    { slot: "event-2", date: "Dec",    title: "Year-End Holiday Programme", summary: "Morning classes for Std 1–6 and Form 1–3 to get a head start on next year." },
    { slot: "event-3", date: "Jan",    title: "2027 Registration Open",     summary: "Places for new students are limited. Book a free trial class to get started." }
  ],

  /* ---------- Testimonials ----------
     Use REAL quotes from parents, with their permission. */
  testimonials: [
    { quote: "[Parent testimonial goes here]", name: "[Parent name]", role: "Parent, [Programme]" },
    { quote: "[Parent testimonial goes here]", name: "[Parent name]", role: "Parent, [Programme]" },
    { quote: "[Parent testimonial goes here]", name: "[Parent name]", role: "Parent, [Programme]" }
  ]
};
