# دليل تعديل البورتفوليو (من غير ما ترجع لحد)

كل محتوى الموقع بقى في **4 ملفات بس** جوه فولدر `src/data/`، والصور في فولدر `public/`.
مش محتاج تلمس أي ملف تاني.

| عايز تعدّل إيه؟ | افتح الملف ده |
|---|---|
| المشاريع (إضافة / حذف / ترتيب / وصف / صور) | `src/data/projects.ts` |
| الشهادات | `src/data/certificates.ts` |
| المهارات (Skills) | `src/data/skills.ts` |
| اسمك، النصوص، الأرقام، الخبرة، الـ CV | `src/data/profile.ts` |

> **عدد المشاريع وعدد الشهادات بيتحسبوا لوحدهم.** ضيف مشروع → الرقم في الموقع يزيد تلقائي، ومفيش حاجة تعدّلها.

---

## أولاً: تشغيل الموقع على جهازك عشان تشوف تعديلاتك

افتح الـ Terminal جوه فولدر `portfolio` واكتب:

```bash
npm install
npm run dev
```

افتح اللينك اللي هيظهر (غالباً `http://localhost:5173`). أي حاجة تحفظها في الملفات هتظهر في الموقع فوراً.

قبل ما ترفع، اتأكد إن مفيش أخطاء:

```bash
npm run build
```

لو ظهر `✓ built in` يبقى تمام.

---

## ثانياً: إضافة مشروع جديد

**1) الصور:** حط صور المشروع في فولدر `public/` (يفضل `.jpg`، عرض حوالي 1280px).
> صور موبايل طويلة؟ الكارت عريض فهتتقص من فوق وتحت. الأحسن تحط صورتين جنب بعض على خلفية سودا في صورة واحدة عرضها 1280 وطولها 800 (زي صور Yousef Academy).
مثال: `public/myproject-1.jpg` و `public/myproject-2.jpg`

**2) الكود:** افتح `src/data/projects.ts`، وبعد السطر `export const PROJECTS: Project[] = [` على طول الصق البلوك ده وغيّر القيم:

```ts
  {
    title: 'اسم المشروع',
    subtitle: 'سطر قصير تحت الاسم',            // اختياري — امسحه لو مش عايزه
    category: 'End-to-End Analysis projects', // لازم يكون واحد من الأقسام (شوف تحت)
    tags: ['Python', 'SQL', 'Power BI'],
    description: 'وصف المشروع اللي بيظهر على الكارت.',
    image: '/myproject-1.jpg',                  // صورة الغلاف
    images: ['/myproject-1.jpg', '/myproject-2.jpg'], // لو أكتر من صورة → تظهر أسهم تلقائي
    difficulty: 'Intermediate',                 // Beginner / Intermediate / Advanced
    year: '2026',
    github: 'https://github.com/yousef-baiomyy/repo-name', // امسحه لو الريبو Private
    liveDemo: 'https://my-app.vercel.app',                  // امسحه لو مفيش ديمو
    private: true,                              // اختياري — حطه لو الريبو Private (بيطلع قفل 🔒)
    readme: `## اسم المشروع

### Overview
اكتب هنا تفاصيل المشروع.

### Key Features
- **ميزة 1** — شرح
- **ميزة 2** — شرح

### Screenshots
![وصف الصورة الأولى](/myproject-1.jpg)
![وصف الصورة التانية](/myproject-2.jpg)`,
  },
```

**الأزرار بتتظبط لوحدها:**
- فيه `liveDemo` → زرار **Live Demo** + GitHub + Details
- فيه `github` بس → زرار **View on GitHub** + README
- مفيش الاتنين → زرار **View Case Study**
- ولو كاتب `private: true` → يظهر جنبه **Private repository** 🔒

**الترتيب:** المشروع اللي فوق في الملف هو اللي يظهر الأول في الموقع.

**حذف مشروع:** امسح البلوك بتاعه من `{` لحد `},`.

### الأقسام (Categories)
الأقسام الحالية موجودة أول سطر في `projects.ts`:

```ts
export const CATEGORIES = ['All', 'End-to-End Analysis projects', 'Analytical/Business Systems', 'Interactive HTML Dashboard', 'Python Projects'] as const;
```

عايز قسم جديد؟ زوّد اسمه في الليستة دي (مثلاً `'Machine Learning'`)، وبعدين استخدم نفس الاسم بالظبط في `category` بتاع المشروع.

### اللي بتقدر تكتبه جوه `readme`
- `## عنوان كبير` و `### عنوان صغير`
- `- نقطة` للقوائم
- `**كلام بولد**`
- جداول: `| Metric | Value |` وتحتها `|---|---|`
- صور: `![الكابشن](/image.jpg)` — كذا صورة ورا بعض = جاليري
- أي لينك `https://...` بيبقى clickable لوحده

---

## ثالثاً: إضافة شهادة

**1)** حط صورة الشهادة في `public/certificates/` (لو PDF، حوّله صورة الأول — أو اعمله سكرينشوت).

**2)** افتح `src/data/certificates.ts` والصق البلوك ده جوه `CERTIFICATES = [ ... ]`:

```ts
  {
    title: 'اسم الكورس',
    issuer: 'Coursera',                         // اسم الجهة — بيعمل زرار فلتر لوحده
    date: 'Nov 2026',
    image: '/certificates/my-cert.jpg',
    credentialId: 'ABC123',                     // اختياري
    verifyUrl: 'https://coursera.org/verify/ABC123', // اختياري — بيطلع زرار Verify
    type: 'Certificate',                        // Certificate / Course / Diploma
    note: 'سطر صغير اختياري',                  // اختياري
  },
```

**كورس لسه بتدرسه؟** ضيفه في `IN_PROGRESS` تحت في نفس الملف:

```ts
  { title: 'اسم البرنامج', issuer: 'الجهة' },
```

ولما تخلصه: امسحه من `IN_PROGRESS` وضيفه في `CERTIFICATES`.

---

## رابعاً: إضافة / تعديل مهارة

افتح `src/data/skills.ts`:
- مهارة جديدة: `{ name: 'Tableau' },`
- مهارة لسه بتتعلمها (يظهر جنبها "soon"): `{ name: 'Spark', inProgress: true },`
- لما تتعلمها: امسح `, inProgress: true`
- كارت جديد كامل: انسخ بلوك `{ title: '...', skills: [ ... ] },` كله وغيّره

> الكروت معروضة 3 جنب بعض على الكمبيوتر، فخلي عددهم مضاعفات 3 (3، 6، 9) عشان الشكل يبقى مظبوط.

---

## خامساً: النصوص والاسم والأرقام والـ CV

كله في `src/data/profile.ts`:
- `firstName` / `lastName` → الاسم الكبير في أول الصفحة
- `roles` و `typingWords` → الكلام اللي تحت الاسم والكلام اللي بيتكتب لوحده
- `heroSubtitle` → الجملة تحت الاسم
- `aboutParagraphs` → فقرات قسم About
- `timeline` → الخبرة والتعليم
- `STATS` → الأرقام (اللي فيها `PROJECTS.length` و `CERTIFICATES.length` بتتحسب لوحدها — متغيرهاش)

**تحديث الـ CV:** حط الملف الجديد في `public/` بنفس الاسم `Yousef_Mohamed_Baiomy_CV.pdf` وخلاص. (لو غيرت الاسم، غيّره كمان في `cvFile`.)

**صورتك الشخصية:** بدّل `public/portrait.jpg` بصورة جديدة بنفس الاسم.

---

## سادساً: أنيميشنز الداتا (الـ Pipeline والـ SQL Console)

كله في `src/data/showcase.ts`:

- **`PIPELINE`** → المراحل الخمسة في قسم "From raw data to decisions". غيّر `step` (الاسم) أو `tools` (الأدوات تحتها).
- **`LIVE_QUERIES`** → الكونسول اللي بيكتب SQL لوحده. ضيف query جديدة كده:

```ts
  {
    project: 'اسم المشروع',
    sql: 'SELECT x, SUM(y) AS total\nFROM my_table\nGROUP BY x\nORDER BY total DESC;',
    rows: [['A', 120], ['B', 90], ['C', 40]],   // أرقام حقيقية من مشروعك
    prefix: '$',     // اختياري
    suffix: 'K',     // اختياري
  },
```

`\n` معناها سطر جديد. خلي الأرقام **حقيقية** من مشاريعك.

---

## أخطاء شائعة وحلها

| المشكلة | السبب | الحل |
|---|---|---|
| الصفحة بيضا / الـ build وقع | نسيت فاصلة `,` بعد `}` | كل بلوك لازم يخلص بـ `},` |
| خطأ في نص فيه `'` (زي `I'm`) | الـ `'` بتقفل النص | اكتب النص بين `"` بدل `'`، أو اكتب `\'` |
| الصورة مش ظاهرة | المسار غلط | الصورة في `public/x.jpg` ← تكتبها `'/x.jpg'` (من غير كلمة public) |
| المشروع مش ظاهر في القسم | اسم الـ category مختلف حرف | انسخ الاسم من `CATEGORIES` بالظبط |
| خطأ جوه `readme` | استخدمت علامة `` ` `` جوه النص | امسحها أو اكتب `` \` `` |

---

## الرفع على النت

لو الموقع متوصل بـ Vercel من GitHub:

```bash
git add .
git commit -m "update portfolio"
git push
```

Vercel هيعمل Deploy لوحده في دقيقة أو اتنين.
