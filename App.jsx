import React, { useState, useMemo } from "react";
import {
  GraduationCap, Lightbulb, Users, Rocket, Laptop, Code2, Palette, TrendingUp,
  Menu, ArrowRight, User, Mail, Phone, MapPin, BookOpen, MessageSquare,
  CheckCircle2, Copy, LayoutDashboard, UserPlus, BarChart3, FileSpreadsheet,
  Settings, LogOut, Search, Download, ChevronRight, Facebook, Twitter,
  Instagram, Youtube, Linkedin, Award
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

// ---------- Design tokens ----------
const BRAND = {
  blue: "#1B2A6B",
  blueDeep: "#0B1440",
  orange: "#F5730A",
  orangeLight: "#FF9142",
  bg: "#F5F7FB",
};

const FORMATIONS = [
  { key: "Bureautique", icon: Laptop, tag: "Word, Excel, PowerPoint", level: "Débutant → Avancé", color: "#1B2A6B" },
  { key: "Développement Web", icon: Code2, tag: "HTML, CSS, JavaScript, PHP, MySQL", level: "Débutant → Avancé", color: "#F5730A" },
  { key: "Design Graphique", icon: Palette, tag: "Photoshop, Illustrator, Canva", level: "Débutant → Avancé", color: "#1BA672" },
  { key: "Marketing Digital", icon: TrendingUp, tag: "Réseaux sociaux, SEO, Publicité en ligne", level: "Débutant → Avancé", color: "#D62E5C" },
];

const FEATURES = [
  { icon: GraduationCap, title: "Formations de qualité", desc: "Des modules adaptés aux besoins du marché." },
  { icon: Lightbulb, title: "Apprentissage pratique", desc: "Projets concrets et ateliers pour mieux apprendre." },
  { icon: Users, title: "Encadrement", desc: "Des formateurs expérimentés à votre écoute." },
  { icon: Rocket, title: "Opportunités", desc: "Boostez votre carrière avec le digital." },
];

const PIE_COLORS = ["#1B2A6B", "#F5730A", "#F2B705", "#D62E5C"];

function genId(n) {
  return `YD-2025-${String(n).padStart(4, "0")}`;
}

const SEED_CANDIDATES = [
  { id: "YD-2025-0001", nom: "SANOU A.", formation: "Dév. Web", date: "12/06/2025", statut: "Retenu" },
  { id: "YD-2025-0002", nom: "DIALLO A.", formation: "Design", date: "11/06/2025", statut: "En attente" },
  { id: "YD-2025-0003", nom: "ISSA M.", formation: "Bureautique", date: "10/06/2025", statut: "Refusé" },
];

const EVOLUTION = [
  { mois: "Jan", val: 15 }, { mois: "Fév", val: 38 }, { mois: "Mar", val: 62 },
  { mois: "Avr", val: 98 }, { mois: "Mai", val: 160 }, { mois: "Juin", val: 245 },
];

const REPARTITION = [
  { name: "Dév. Web", value: 34 },
  { name: "Bureautique", value: 25 },
  { name: "Design", value: 20 },
  { name: "Marketing", value: 21 },
];

// ---------- Shared bits ----------
function Logo({ light }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="relative w-9 h-9 shrink-0">
        <svg viewBox="0 0 40 40" className="w-9 h-9">
          <path d="M4 4 L16 20 L16 36 L11 36 L11 22 L1 6 Z" fill={BRAND.blue} />
          <path d="M16 20 L28 4 L34 4 L20 22 L20 36 L16 36 Z" fill={BRAND.blue} />
          <circle cx="27" cy="22" r="11" fill={BRAND.orange} />
        </svg>
      </div>
      <div className="leading-none">
        <div className={`font-black tracking-tight text-lg ${light ? "text-white" : ""}`} style={{ color: light ? "#fff" : BRAND.blue }}>
          YOUTH
        </div>
        <div className="font-black tracking-tight text-lg -mt-1" style={{ color: BRAND.orange }}>
          DIGITAL
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">
        {label} {required && <span style={{ color: BRAND.orange }}>*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:ring-2 focus:border-transparent placeholder:text-slate-400";

function TextInput(props) {
  return (
    <input
      {...props}
      className={inputCls}
      onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${BRAND.blue}55`)}
      onBlur={(e) => (e.target.style.boxShadow = "none")}
    />
  );
}

function Select(props) {
  return (
    <select
      {...props}
      className={inputCls + " bg-white"}
      onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${BRAND.blue}55`)}
      onBlur={(e) => (e.target.style.boxShadow = "none")}
    >
      {props.children}
    </select>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2 mb-4 mt-2">
      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${BRAND.blue}15` }}>
        <Icon size={15} style={{ color: BRAND.blue }} />
      </div>
      <h3 className="font-bold text-slate-800">{children}</h3>
    </div>
  );
}

// ---------- Landing Page ----------
function Landing({ goTo }) {
  return (
    <div className="bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a className="hover:text-slate-900" href="#accueil">Accueil</a>
            <a className="hover:text-slate-900" href="#formations">Formations</a>
            <a className="hover:text-slate-900" href="#apropos">À propos</a>
            <a className="hover:text-slate-900" href="#contact">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goTo("form")}
              className="hidden sm:flex items-center gap-1.5 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:brightness-110 transition"
              style={{ background: BRAND.orange }}
            >
              <Rocket size={15} /> Postuler maintenant
            </button>
            <button className="md:hidden p-2 text-slate-600"><Menu size={20} /></button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="accueil" className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${BRAND.blueDeep}, ${BRAND.blue} 60%, #223a9c)` }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #6ea8ff 0%, transparent 40%)" }} />
        <div className="max-w-6xl mx-auto px-5 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center relative">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-[1.05]">
              YOUTH<br /><span style={{ color: BRAND.orange }}>DIGITAL</span>
            </h1>
            <p className="mt-4 text-lg text-blue-100 font-medium">
              Construire aujourd'hui les compétences de demain !
            </p>
            <p className="mt-3 text-blue-200/80 text-sm max-w-md leading-relaxed">
              Youth Digital est une plateforme dédiée à la formation des jeunes aux métiers du numérique pour un avenir meilleur.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => goTo("form")}
                className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-3 rounded-lg shadow-lg hover:brightness-110 transition"
                style={{ background: BRAND.orange }}
              >
                <Rocket size={16} /> Postuler maintenant
              </button>
              <a href="#formations" className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition">
                <ChevronRight size={16} className="rounded-full border border-white/60" /> Voir nos formations
              </a>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="rounded-2xl h-72 flex items-center justify-center text-blue-200/50 text-sm border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
              <Users size={64} strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-5 -mt-8 md:-mt-10 relative pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(15,23,60,0.08)] border border-slate-100">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ background: BRAND.blue }}>
                <f.icon size={18} className="text-white" />
              </div>
              <div className="font-bold text-sm text-slate-800">{f.title}</div>
              <div className="text-xs text-slate-500 mt-1 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Formations */}
      <section id="formations" className="max-w-6xl mx-auto px-5 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black" style={{ color: BRAND.blue }}>Nos formations</h2>
          <p className="text-slate-500 text-sm mt-2">Choisissez la formation qui vous correspond et lancez votre avenir.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {FORMATIONS.map((f) => (
            <div key={f.key} className="rounded-xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition group cursor-pointer" onClick={() => goTo("form")}>
              <div className="h-28 flex items-center justify-center" style={{ background: `${f.color}12` }}>
                <f.icon size={34} style={{ color: f.color }} />
              </div>
              <div className="p-4">
                <div className="font-bold text-sm text-slate-800">{f.key}</div>
                <div className="text-xs text-slate-500 mt-1">{f.tag}</div>
                <div className="text-[11px] text-slate-400 mt-1">{f.level}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: `linear-gradient(120deg, ${BRAND.blueDeep}, ${BRAND.blue})` }}>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-white">Rejoignez la communauté Youth Digital !</h3>
            <p className="text-blue-200 text-sm mt-2 max-w-md">Ensemble, développons nos compétences et créons un impact positif dans nos communautés.</p>
          </div>
          <button
            onClick={() => goTo("form")}
            className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-3 rounded-lg shadow-lg hover:brightness-110 transition whitespace-nowrap"
            style={{ background: BRAND.orange }}
          >
            <Rocket size={16} /> Postuler maintenant
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="text-white pt-12 pb-6" style={{ background: BRAND.blueDeep }}>
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <Logo light />
            <p className="text-blue-200/70 text-xs mt-3">Former · Innover · Transformer</p>
          </div>
          <div>
            <div className="font-bold mb-3">Liens rapides</div>
            <ul className="space-y-2 text-blue-200/80 text-xs">
              <li>Accueil</li><li>Formations</li><li>À propos</li><li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-3">Suivez-nous</div>
            <div className="flex gap-2">
              {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: BRAND.orange }}>
                  <Icon size={14} className="text-white" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold mb-3">Contact</div>
            <ul className="space-y-2 text-blue-200/80 text-xs">
              <li>youthdigitalniger@gmail.com</li>
              <li>+227 80 22 24 95</li>
              <li>Niamey, Niger</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-5 mt-8 pt-5 border-t border-white/10 text-[11px] text-blue-200/50">
          © 2025 Youth Digital. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}

// ---------- Formulaire de candidature ----------
function emptyForm() {
  return {
    nom: "", prenom: "", naissance: "", sexe: "",
    email: "", telephone: "",
    quartier: "", pays: "Niger",
    niveau: "", formationSouhaitee: "",
    motivation: "", accepte: false,
  };
}

function CandidatureForm({ goTo, onSubmit }) {
  const [form, setForm] = useState(emptyForm());
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const canSubmit = form.nom && form.prenom && form.email && form.telephone &&
    form.quartier && form.niveau && form.formationSouhaitee && form.motivation && form.accepte;

  return (
    <div className="min-h-screen" style={{ background: BRAND.bg }}>
      <header className="sticky top-0 z-30 text-white" style={{ background: BRAND.blueDeep }}>
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
          <Logo light />
          <button onClick={() => goTo("landing")} className="text-xs font-semibold text-blue-100 hover:text-white flex items-center gap-1">
            ← Retour
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 py-8">
        <h1 className="text-2xl font-black" style={{ color: BRAND.blue }}>Formulaire de candidature</h1>
        <p className="text-slate-500 text-sm mt-1">Rejoignez Youth Digital et construisez votre avenir dans le numérique.</p>

        <form
          className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) return;
            onSubmit(form);
          }}
        >
          <SectionTitle icon={User}>Informations personnelles</SectionTitle>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Nom" required><TextInput required value={form.nom} onChange={set("nom")} placeholder="SANOU" /></Field>
            <Field label="Prénom" required><TextInput required value={form.prenom} onChange={set("prenom")} placeholder="Amadou" /></Field>
            <Field label="Date de naissance" required><TextInput required type="date" value={form.naissance} onChange={set("naissance")} /></Field>
            <Field label="Sexe" required>
              <Select required value={form.sexe} onChange={set("sexe")}>
                <option value="">Sélectionner</option>
                <option>Masculin</option>
                <option>Féminin</option>
              </Select>
            </Field>
          </div>

          <SectionTitle icon={Phone}>Contact</SectionTitle>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="E-mail" required><TextInput required type="email" value={form.email} onChange={set("email")} placeholder="sanou@example.com" /></Field>
            <Field label="Téléphone" required><TextInput required value={form.telephone} onChange={set("telephone")} placeholder="+227 80 22 24 95" /></Field>
          </div>

          <SectionTitle icon={MapPin}>Adresse</SectionTitle>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Quartier / Ville" required><TextInput required value={form.quartier} onChange={set("quartier")} placeholder="Plateau" /></Field>
            <Field label="Pays" required><TextInput required value={form.pays} onChange={set("pays")} /></Field>
          </div>

          <SectionTitle icon={BookOpen}>Formation</SectionTitle>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Niveau d'études" required>
              <Select required value={form.niveau} onChange={set("niveau")}>
                <option value="">Sélectionner</option>
                <option>Collège</option>
                <option>Baccalauréat</option>
                <option>Licence</option>
                <option>Master</option>
              </Select>
            </Field>
            <Field label="Formation souhaitée" required>
              <Select required value={form.formationSouhaitee} onChange={set("formationSouhaitee")}>
                <option value="">Sélectionner</option>
                {FORMATIONS.map((f) => <option key={f.key}>{f.key}</option>)}
              </Select>
            </Field>
          </div>

          <SectionTitle icon={MessageSquare}>Motivation</SectionTitle>
          <Field label="Pourquoi voulez-vous rejoindre Youth Digital ?" required>
            <textarea
              required
              rows={4}
              value={form.motivation}
              onChange={set("motivation")}
              placeholder="Je veux acquérir des compétences en..."
              className={inputCls + " resize-none"}
            />
          </Field>

          <label className="flex items-start gap-2.5 mt-5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.accepte}
              onChange={(e) => setForm((f) => ({ ...f, accepte: e.target.checked }))}
              className="mt-0.5 w-4 h-4 rounded"
              style={{ accentColor: BRAND.blue }}
            />
            <span className="text-xs text-slate-500">
              J'accepte que mes informations soient utilisées dans le cadre du programme Youth Digital.
            </span>
          </label>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-6 w-full flex items-center justify-center gap-2 text-white text-sm font-bold py-3.5 rounded-lg shadow-md transition disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110"
            style={{ background: BRAND.orange }}
          >
            <Rocket size={16} /> Envoyer ma candidature
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------- Confirmation ----------
function Confirmation({ goTo, candidate }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: BRAND.bg }}>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-sm w-full text-center">
        <Logo />
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mt-6">
          <CheckCircle2 size={34} className="text-emerald-500" />
        </div>
        <h2 className="text-lg font-black text-slate-800 mt-4">Candidature envoyée !</h2>
        <p className="text-sm text-slate-500 mt-1">
          Merci {candidate?.prenom} {candidate?.nom} ! Votre candidature a été enregistrée avec succès.
        </p>

        <div className="mt-5 rounded-xl p-4" style={{ background: `${BRAND.blue}0d` }}>
          <div className="text-xs text-slate-500">Numéro de candidature</div>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="font-black text-lg" style={{ color: BRAND.blue }}>{candidate?.id}</span>
            <button
              onClick={() => { navigator.clipboard?.writeText(candidate?.id || ""); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
              className="text-slate-400 hover:text-slate-600"
            >
              <Copy size={14} />
            </button>
          </div>
          {copied && <div className="text-[10px] text-emerald-600 mt-1">Copié !</div>}
        </div>
        <p className="text-[11px] text-slate-400 mt-3">Conservez ce numéro pour suivre votre candidature.</p>

        <div className="mt-6 flex flex-col gap-2">
          <button onClick={() => goTo("dashboard")} className="w-full text-white text-sm font-semibold py-3 rounded-lg" style={{ background: BRAND.blue }}>
            Voir mes informations
          </button>
          <button onClick={() => goTo("landing")} className="w-full text-slate-600 text-sm font-semibold py-3 rounded-lg border border-slate-200 hover:bg-slate-50">
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Admin Dashboard ----------
function StatCard({ label, value, color, bg }) {
  return (
    <div className="rounded-xl p-4" style={{ background: bg }}>
      <div className="text-2xl font-black" style={{ color }}>{value}</div>
      <div className="text-xs font-medium mt-0.5" style={{ color }}>{label}</div>
    </div>
  );
}

const STATUT_STYLE = {
  "Retenu": "bg-emerald-100 text-emerald-700",
  "En attente": "bg-amber-100 text-amber-700",
  "Refusé": "bg-rose-100 text-rose-700",
};

function Dashboard({ goTo, candidates }) {
  const [query, setQuery] = useState("");
  const stats = useMemo(() => {
    const total = candidates.length;
    const retenu = candidates.filter((c) => c.statut === "Retenu").length;
    const attente = candidates.filter((c) => c.statut === "En attente").length;
    const refuse = candidates.filter((c) => c.statut === "Refusé").length;
    return { total, retenu, attente, refuse };
  }, [candidates]);

  const filtered = candidates.filter((c) =>
    c.nom.toLowerCase().includes(query.toLowerCase()) || c.id.toLowerCase().includes(query.toLowerCase())
  );

  const navItems = [
    { icon: LayoutDashboard, label: "Tableau de bord", active: true },
    { icon: Users, label: "Candidats" },
    { icon: UserPlus, label: "Ajouter candidat" },
    { icon: BarChart3, label: "Statistiques" },
    { icon: FileSpreadsheet, label: "Export (Excel)" },
    { icon: Settings, label: "Paramètres" },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: BRAND.bg }}>
      {/* Sidebar */}
      <aside className="w-60 shrink-0 text-white flex-col hidden md:flex" style={{ background: BRAND.blueDeep }}>
        <div className="px-5 py-4 border-b border-white/10">
          <Logo light />
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition text-left"
              style={item.active ? { background: BRAND.orange, color: "#fff" } : { color: "#c7d0f0" }}
            >
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </nav>
        <button onClick={() => goTo("landing")} className="flex items-center gap-3 px-3 py-2.5 mx-3 mb-4 rounded-lg text-sm font-medium text-blue-200 hover:text-white">
          <LogOut size={16} /> Déconnexion
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between">
          <h1 className="font-black text-slate-800">Tableau de bord</h1>
          <button onClick={() => goTo("landing")} className="flex items-center gap-2 text-sm text-slate-500">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: BRAND.blue }}>A</div>
            Admin
          </button>
        </header>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Candidatures" value={stats.total} color={BRAND.blue} bg="#E7EBFB" />
            <StatCard label="En attente" value={stats.attente} color="#B87400" bg="#FDF1DC" />
            <StatCard label="Retenus" value={stats.retenu} color="#0E8A5B" bg="#E1F6EC" />
            <StatCard label="Refusés" value={stats.refuse} color="#C23A55" bg="#FBE4E9" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-white rounded-xl border border-slate-100 p-5">
              <h3 className="font-bold text-sm text-slate-700 mb-3">Évolution des candidatures</h3>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <LineChart data={EVOLUTION}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eef1f8" />
                    <XAxis dataKey="mois" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="val" stroke={BRAND.blue} strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 p-5">
              <h3 className="font-bold text-sm text-slate-700 mb-3">Répartition par formations</h3>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={REPARTITION} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} paddingAngle={2}>
                      {REPARTITION.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} layout="vertical" verticalAlign="middle" align="right" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <h3 className="font-bold text-sm text-slate-700">Liste des candidatures</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 outline-none w-40"
                  />
                </div>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-lg" style={{ background: BRAND.blue }}>
                  <Download size={13} /> Exporter
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-100">
                    <th className="py-2 font-medium">#</th>
                    <th className="font-medium">Nom</th>
                    <th className="font-medium">Formation</th>
                    <th className="font-medium">Date</th>
                    <th className="font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} className="border-b border-slate-50 last:border-0">
                      <td className="py-2.5 text-slate-400">{c.id}</td>
                      <td className="font-medium text-slate-700">{c.nom}</td>
                      <td className="text-slate-500">{c.formation}</td>
                      <td className="text-slate-500">{c.date}</td>
                      <td>
                        <span className={`px-2 py-1 rounded-full font-semibold ${STATUT_STYLE[c.statut]}`}>{c.statut}</span>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={5} className="py-6 text-center text-slate-400">Aucun résultat</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ---------- App shell ----------
export default function App() {
  const [view, setView] = useState("landing");
  const [candidates, setCandidates] = useState(SEED_CANDIDATES);
  const [lastCandidate, setLastCandidate] = useState(null);

  const goTo = (v) => { setView(v); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleSubmit = (form) => {
    const id = genId(candidates.length + 1);
    const entry = {
      id, nom: `${form.nom.toUpperCase()} ${form.prenom.charAt(0)}.`,
      formation: form.formationSouhaitee, date: new Date().toLocaleDateString("fr-FR"),
      statut: "En attente",
    };
    setCandidates((c) => [entry, ...c]);
    setLastCandidate({ ...form, id });
    goTo("confirmation");
  };

  return (
    <div className="font-sans" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {view === "landing" && <Landing goTo={goTo} />}
      {view === "form" && <CandidatureForm goTo={goTo} onSubmit={handleSubmit} />}
      {view === "confirmation" && <Confirmation goTo={goTo} candidate={lastCandidate} />}
      {view === "dashboard" && <Dashboard goTo={goTo} candidates={candidates} />}
    </div>
  );
}
