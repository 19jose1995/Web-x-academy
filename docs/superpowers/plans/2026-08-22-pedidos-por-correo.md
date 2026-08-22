# Pedidos de Paquetes por Correo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Activate `PackagesSection.jsx` on the homepage and let a visitor request one of the 4 class packages via a modal that emails the order to `info@xacademy.com.do`, with no online payment.

**Architecture:** A rewritten `PackagesSection.jsx` renders the 4-package grid and owns an internal `OrderModal` subcomponent (same self-contained-modal pattern already used by `Gallery.jsx` and `MaestrosDestacados.jsx`). The modal submits via `fetch()` to a new `pedido` branch added at the top of the existing `send_email.php`, which mirrors the already-working `registro` branch but responds with a plain HTTP status instead of redirecting, since the modal never leaves the SPA.

**Tech Stack:** React 19, Framer Motion (`motion`/`AnimatePresence`), `lucide-react` icons, Tailwind CSS, plain PHP `mail()` on the existing shared host (no new dependencies).

**Note on testing:** This project has no automated test framework (verified: no test runner in `package.json`, no test files anywhere in `src/`). Verification below uses the dev server, `npm run build`, and manual PHP code review — PHP itself isn't installed in this dev environment (`php -v` → not found) and Vite's dev server doesn't execute PHP, so the `send_email.php` change can only be verified by careful review here and a real test send after deployment (documented in the design spec's "Limitación conocida").

Design spec: `docs/superpowers/specs/2026-08-22-pedidos-por-correo-design.md`

---

## File Structure

- **Modify:** `src/components/PackagesSection.jsx` — full rewrite. Currently exists but is unmounted and uses emoji + ad-hoc colors; becomes the package grid + `OrderModal` subcomponent (same file, following the codebase's established pattern of colocating a section's modal with the section that owns it).
- **Modify:** `src/App.jsx` — add the import and mount `<PackagesSection />` between the Horarios section and the Formulario (RegistrationForm) section.
- **Modify:** `send_email.php` — add a `type`-branching block at the very top; the existing `registro` logic is untouched and unindented (falls through when `type !== 'pedido'`).

No new files. No new npm dependencies (`lucide-react` and `framer-motion` are already installed and used elsewhere).

---

### Task 1: Add the `pedido` branch to `send_email.php`

**Files:**
- Modify: `send_email.php` (project root)

- [ ] **Step 1: Read the current file to confirm nothing has changed since the spec was written**

Run: `cat send_email.php` (or open it) — confirm it still starts with:

```php
<?php
// 1) Destino del correo:
$to      = 'info@xacademy.com.do';
$subject = 'Nuevo registro en X Academy';
```

If it differs from this, stop and re-read the design spec before continuing — the insertion point below assumes this exact starting content.

- [ ] **Step 2: Insert the `pedido` branch immediately after the opening `<?php`**

Replace:

```php
<?php
// 1) Destino del correo:
```

With:

```php
<?php

$type = $_POST['type'] ?? 'registro';

if ($type === 'pedido') {
    $package = filter_input(INPUT_POST, 'package', FILTER_SANITIZE_STRING);
    $name    = filter_input(INPUT_POST, 'name',    FILTER_SANITIZE_STRING);
    $contact = filter_input(INPUT_POST, 'contact', FILTER_SANITIZE_STRING);

    $to      = 'info@xacademy.com.do';
    $subject = 'Nuevo pedido en X Academy';
    $message  = "Nuevo pedido recibido en X Academy:\r\n\r\n";
    $message .= "Paquete: $package\r\n";
    $message .= "Nombre: $name\r\n";
    $message .= "Contacto: $contact\r\n";

    $headers = "From: no-reply@xacademy.com.do\r\n";
    // "contact" puede ser teléfono o correo; solo se usa como Reply-To si es un correo válido
    // (un teléfono ahí generaría una cabecera Reply-To inválida).
    if (filter_var($contact, FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: $contact\r\n";
    }
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo 'OK';
    } else {
        http_response_code(500);
        echo 'ERROR';
    }
    exit;
}

// 1) Destino del correo:
```

The rest of the file (the existing `registro` logic) stays exactly as it is — it now only runs when `$type !== 'pedido'`, which is the case for the existing `RegistrationForm.jsx` since it never sends a `type` field at all (`$_POST['type'] ?? 'registro'` defaults it).

- [ ] **Step 3: Verify by reading the full file back**

Run: `cat send_email.php`

Expected: the `pedido` block appears first, followed immediately by the original `// 1) Destino del correo:` comment and all the original registro code, unchanged, still ending in `mail($to, $subject, $message, $headers)` → `header('Location: gracias.html'); exit;`.

Manually confirm (no PHP available locally to execute this):
- Every variable used (`$package`, `$name`, `$contact`, `$to`, `$subject`, `$message`, `$headers`) is defined before use.
- The `pedido` branch always ends in `exit;` so it can never fall through into the registro code.
- Brace count matches: the `if ($type === 'pedido') { ... }` block opens and closes cleanly around the new code only.

- [ ] **Step 4: Commit**

```bash
git add send_email.php
git commit -m "Add pedido branch to send_email.php for package order emails"
```

---

### Task 2: Rewrite `PackagesSection.jsx`

**Files:**
- Modify: `src/components/PackagesSection.jsx`

- [ ] **Step 1: Replace the entire file content**

```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic2, Music2, Sparkles, Flame, X } from 'lucide-react';

const packages = [
  {
    icon: Mic2,
    title: 'Stage Star',
    price: 'RD$5,990',
    subtitle: 'Ideal para quienes aman brillar en escena',
    items: ['Canto', 'Teatro', 'Jazz'],
    color: '#ec1763',
  },
  {
    icon: Music2,
    title: 'Arte en Movimiento',
    price: 'RD$6,990',
    subtitle: 'Una formación sólida para futuros artistas escénicos',
    items: ['Ballet Clásico', 'Danza Contemporánea', 'Jazz'],
    color: '#5568A9',
  },
  {
    icon: Sparkles,
    title: 'Pequeños en Escena',
    price: 'RD$4,990',
    subtitle: 'Para niños y niñas desde los 4 años: diversión y expresión corporal',
    items: ['Preballet / Movimiento Creativo', 'Jazz / Hip Hop Kids'],
    color: '#cdd629',
  },
  {
    icon: Flame,
    title: 'Street Vibes',
    price: 'RD$6,990',
    subtitle: 'Para los que llevan el ritmo en las venas y pisan fuerte con estilo',
    items: ['Hip Hop', 'Jazz', 'Heels'],
    color: '#f37826',
  },
];

export default function PackagesSection() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section id="paquetes" className="mx-auto max-w-6xl px-6 py-20">
        <div data-aos="fade-up" className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800">
            Nuestros <span style={{ color: '#ec1763' }}>Paquetes</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">
            Combinaciones pensadas para cada etapa y estilo artístico.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="rounded-3xl p-6 flex flex-col text-white shadow-xl"
              style={{ background: pkg.color }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 border border-white/25 mb-4">
                <pkg.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-extrabold">{pkg.title}</h3>
              <div className="text-2xl font-black mt-1 mb-2">{pkg.price}</div>
              <p className="text-white/80 text-sm mb-4">{pkg.subtitle}</p>
              <ul className="text-sm text-white/90 space-y-1 flex-1 mb-4">
                {pkg.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <button
                onClick={() => setSelected(pkg)}
                className="mt-auto rounded-full bg-white/15 border border-white/30 py-2.5 font-bold text-sm transition hover:bg-white/25 hover:scale-105"
              >
                Inscríbete
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && <OrderModal pkg={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}

function OrderModal({ pkg, onClose }) {
  const [form, setForm] = useState({ name: '', contact: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const body = new URLSearchParams({
        type: 'pedido',
        package: pkg.title,
        name: form.name,
        contact: form.contact,
      });
      const res = await fetch('/send_email.php', { method: 'POST', body });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'sent' ? (
          <div className="text-center py-6">
            <h3 className="text-xl font-extrabold text-slate-800 mb-2">¡Pedido recibido!</h3>
            <p className="text-slate-500 text-sm">
              Te contactaremos pronto para coordinar los detalles y el pago.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-full bg-[#5568A9] text-white px-6 py-2.5 text-sm font-bold hover:bg-[#44558a] transition"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div
                className="text-xs font-bold uppercase tracking-wide"
                style={{ color: pkg.color }}
              >
                {pkg.title}
              </div>
              <div className="text-lg font-extrabold text-slate-800">{pkg.price}</div>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Nombre completo
              </span>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5568A9]/30 focus:border-[#5568A9]/60"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Teléfono o correo electrónico
              </span>
              <input
                name="contact"
                type="text"
                required
                value={form.contact}
                onChange={handleChange}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5568A9]/30 focus:border-[#5568A9]/60"
              />
            </label>

            {status === 'error' && (
              <p className="text-sm text-red-600">
                Hubo un problema enviando tu pedido.{' '}
                <a
                  href={`https://wa.me/18093815369?text=${encodeURIComponent(
                    `Hola, quiero el paquete ${pkg.title}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-semibold"
                >
                  Escríbenos por WhatsApp
                </a>{' '}
                o intenta de nuevo.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-full bg-[#f37826] text-white py-3 font-bold text-sm hover:bg-orange-500 transition disabled:opacity-60"
            >
              {status === 'sending' ? 'Enviando…' : 'Enviar pedido'}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify the file has no leftover references to the old `onOptionClick` prop or emoji fields**

Run: `grep -n "onOptionClick\|emoji" src/components/PackagesSection.jsx`
Expected: no matches (empty output). The new version owns its own modal state instead of taking a callback prop.

- [ ] **Step 3: Commit**

```bash
git add src/components/PackagesSection.jsx
git commit -m "Rewrite PackagesSection with self-contained order modal"
```

---

### Task 3: Mount `PackagesSection` in `App.jsx`

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Add the import**

Find this line near the top of `src/App.jsx`:

```jsx
import InstalacionesVideo from "./components/InstalacionesVideo";
```

Add immediately after it:

```jsx
import PackagesSection from "./components/PackagesSection";
```

- [ ] **Step 2: Mount the section after Horarios, before the Formulario section**

Find this in `src/App.jsx` (the closing of the Horarios `<section>` and the start of the Formulario comment):

```jsx
      </section>

      {/* ══ FORMULARIO ══════════════════════════════════════════ */}
      <RegistrationForm />
```

Replace with:

```jsx
      </section>

      {/* ══ PAQUETES ════════════════════════════════════════════ */}
      <PackagesSection />

      {/* ══ FORMULARIO ══════════════════════════════════════════ */}
      <RegistrationForm />
```

- [ ] **Step 3: Start the dev server and visually verify**

Run: `npm run dev` (or reuse the already-running instance)

In the browser, confirm:
- A "Paquetes" section appears between Horarios and the registration form, with 4 solid-color cards (magenta, blue, lime, orange) and real icons (no emoji).
- Clicking "Inscríbete" on any card opens the modal with that package's name and price shown.
- Filling both fields and submitting shows "Enviando…" then flips to an error state (expected in local dev — there's no PHP server, so the `fetch` to `/send_email.php` will fail or 404).
- The error state's WhatsApp link opens `wa.me` with the package name pre-filled in the message text.
- Clicking outside the modal or the `X` button closes it.

- [ ] **Step 4: Run a production build to confirm no compile errors**

Run: `npm run build`
Expected: `✓ built in <time>` with no errors, same as prior builds in this session.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx
git commit -m "Mount PackagesSection between Horarios and Formulario"
```

---

## Post-Deploy Verification (not part of this plan's automated steps — do this after deploying to the real host)

Send one real test order per package (4 total) and confirm each arrives at `info@xacademy.com.do` with the correct paquete/nombre/contacto values, per the design spec's Testing section.
