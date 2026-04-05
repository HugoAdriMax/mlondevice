"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import {
  LogOut,
  Mail,
  Phone,
  Calendar,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  MessageSquare,
  User,
  Tag,
  FolderKanban,
  Plus,
  ChevronRight,
  Clock,
  PlayCircle,
  CheckCircle2,
  Search as SearchIcon,
  AlertCircle,
  Send,
  ArrowLeft,
  Edit3,
  FileText,
  DollarSign,
  Percent,
  StickyNote,
  X,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  createdAt: Timestamp;
  read: boolean;
}

interface TimelineEntry {
  status: string;
  date: Timestamp;
  note: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  type: string;
  status: "pending" | "in_progress" | "review" | "completed";
  budget: string;
  deadline: string;
  progress: number;
  notes: string;
  timeline: TimelineEntry[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const subjectLabels: Record<string, string> = {
  web: "Création de site web",
  mobile: "Application mobile",
  design: "UI/UX Design",
  other: "Autre demande",
};

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  pending: {
    label: "En attente",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
    icon: Clock,
  },
  in_progress: {
    label: "En cours",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    icon: PlayCircle,
  },
  review: {
    label: "En review",
    color: "text-purple-600",
    bg: "bg-purple-50 border-purple-200",
    icon: SearchIcon,
  },
  completed: {
    label: "Terminé",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
    icon: CheckCircle2,
  },
};

const typeLabels: Record<string, string> = {
  web: "Site web",
  mobile: "Application mobile",
  design: "UI/UX Design",
  custom: "Solution sur mesure",
  other: "Autre",
};

interface ProjectFormData {
  name: string;
  description: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  type: string;
  status: Project["status"];
  budget: string;
  deadline: string;
  progress: number;
  notes: string;
}

const emptyProject: ProjectFormData = {
  name: "",
  description: "",
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  type: "web",
  status: "pending",
  budget: "",
  deadline: "",
  progress: 0,
  notes: "",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(timestamp: Timestamp) {
  if (!timestamp) return "—";
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatShortDate(timestamp: Timestamp) {
  if (!timestamp) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(timestamp.toDate());
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"messages" | "projects">(
    "messages"
  );
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusNote, setStatusNote] = useState("");
  const [newStatus, setNewStatus] = useState<Project["status"]>("pending");
  const [sendEmail, setSendEmail] = useState(true);
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login");
    }
  }, [user, authLoading, router]);

  // Contacts listener
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Contact[] = [];
      snapshot.forEach((d) => data.push({ id: d.id, ...d.data() } as Contact));
      setContacts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // Projects listener
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Project[] = [];
      snapshot.forEach(
        (d) => data.push({ id: d.id, ...d.data() } as Project)
      );
      setProjects(data);
      setProjectsLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // ─── Contact handlers ───────────────────────────────────────────────────

  const handleMarkAsRead = async (contact: Contact) => {
    try {
      await updateDoc(doc(db, "contacts", contact.id), {
        read: !contact.read,
      });
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    if (!confirm("Supprimer ce message ?")) return;
    try {
      await deleteDoc(doc(db, "contacts", contactId));
      if (selectedContact?.id === contactId) setSelectedContact(null);
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  // ─── Project handlers ──────────────────────────────────────────────────

  const handleCreateProject = async (formData: ProjectFormData) => {
    try {
      await addDoc(collection(db, "projects"), {
        ...formData,
        timeline: [
          {
            status: "pending",
            date: Timestamp.now(),
            note: "Projet créé",
          },
        ],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setShowProjectForm(false);
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const handleUpdateProject = async (formData: ProjectFormData) => {
    if (!editingProject) return;
    try {
      await updateDoc(doc(db, "projects", editingProject.id), {
        ...formData,
        updatedAt: serverTimestamp(),
      });
      setEditingProject(null);
      setShowProjectForm(false);
      // Refresh selected project
      setSelectedProject((prev) =>
        prev ? { ...prev, ...formData } : null
      );
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const handleStatusChange = async () => {
    if (!selectedProject) return;
    try {
      const newTimeline = [
        ...(selectedProject.timeline || []),
        {
          status: newStatus,
          date: Timestamp.now(),
          note: statusNote || `Statut changé en "${statusConfig[newStatus].label}"`,
        },
      ];
      await updateDoc(doc(db, "projects", selectedProject.id), {
        status: newStatus,
        timeline: newTimeline,
        updatedAt: serverTimestamp(),
        ...(newStatus === "completed" ? { progress: 100 } : {}),
        // Flag for Cloud Function to send email
        ...(sendEmail
          ? {
              _statusEmailPending: true,
              _statusEmailNote:
                statusNote ||
                `Statut changé en "${statusConfig[newStatus].label}"`,
            }
          : {}),
      });
      setShowStatusModal(false);
      setStatusNote("");
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("Supprimer ce projet ?")) return;
    try {
      await deleteDoc(doc(db, "projects", projectId));
      if (selectedProject?.id === projectId) setSelectedProject(null);
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
  };

  // ─── Stats ─────────────────────────────────────────────────────────────

  const unreadCount = contacts.filter((c) => !c.read).length;
  const projectsByStatus = {
    pending: projects.filter((p) => p.status === "pending").length,
    in_progress: projects.filter((p) => p.status === "in_progress").length,
    review: projects.filter((p) => p.status === "review").length,
    completed: projects.filter((p) => p.status === "completed").length,
  };

  // ─── Loading ───────────────────────────────────────────────────────────

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-bold tracking-[0.15em] text-sm uppercase text-zinc-950">
              ML ON DEVICE
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Admin
            </span>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-[1600px] mx-auto px-6 flex gap-0">
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold uppercase tracking-widest border-b-2 transition-colors ${
              activeTab === "messages"
                ? "border-zinc-950 text-zinc-950"
                : "border-transparent text-zinc-400 hover:text-zinc-600"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Messages
            {unreadCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold uppercase tracking-widest border-b-2 transition-colors ${
              activeTab === "projects"
                ? "border-zinc-950 text-zinc-950"
                : "border-transparent text-zinc-400 hover:text-zinc-600"
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            Projets
            <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-zinc-100 text-zinc-600 rounded-full">
              {projects.length}
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* MESSAGES TAB */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "messages" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-zinc-200 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                  Total messages
                </p>
                <p className="text-3xl font-black tracking-tighter text-zinc-950">
                  {contacts.length}
                </p>
              </div>
              <div className="bg-white border border-zinc-200 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                  Non lus
                </p>
                <p className="text-3xl font-black tracking-tighter text-emerald-600">
                  {unreadCount}
                </p>
              </div>
              <div className="bg-white border border-zinc-200 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                  Lus
                </p>
                <p className="text-3xl font-black tracking-tighter text-zinc-400">
                  {contacts.length - unreadCount}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Contact List */}
              <div className="lg:col-span-5 bg-white border border-zinc-200">
                <div className="p-4 border-b border-zinc-200">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-950">
                    Messages reçus
                  </h2>
                </div>
                {loading ? (
                  <div className="p-12 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
                  </div>
                ) : contacts.length === 0 ? (
                  <div className="p-12 text-center">
                    <MessageSquare className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                    <p className="text-sm text-zinc-500 font-medium">
                      Aucun message pour le moment
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-zinc-100 max-h-[600px] overflow-y-auto">
                    {contacts.map((contact) => (
                      <button
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className={`w-full p-4 text-left hover:bg-zinc-50 transition-colors ${
                          selectedContact?.id === contact.id ? "bg-zinc-50" : ""
                        } ${!contact.read ? "bg-emerald-50/50" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {!contact.read && (
                                <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                              )}
                              <p className="text-sm font-bold text-zinc-950 truncate">
                                {contact.name}
                              </p>
                            </div>
                            <p className="text-xs text-zinc-500 truncate mb-1">
                              {contact.email}
                            </p>
                            <p className="text-xs text-zinc-400 truncate">
                              {subjectLabels[contact.subject] || contact.subject}
                            </p>
                          </div>
                          <span className="text-xs text-zinc-400 shrink-0">
                            {formatDate(contact.createdAt).split(" ")[0]}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Detail */}
              <div className="lg:col-span-7 bg-white border border-zinc-200">
                {selectedContact ? (
                  <>
                    <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
                      <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-950">
                        Détails du message
                      </h2>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMarkAsRead(selectedContact)}
                          className="p-2 text-zinc-400 hover:text-zinc-950 transition-colors"
                          title={
                            selectedContact.read
                              ? "Marquer comme non lu"
                              : "Marquer comme lu"
                          }
                        >
                          {selectedContact.read ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteContact(selectedContact.id)}
                          className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center">
                            <User className="w-4 h-4 text-zinc-600" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-400 uppercase tracking-widest">
                              Nom
                            </p>
                            <p className="text-sm font-medium text-zinc-950">
                              {selectedContact.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center">
                            <Mail className="w-4 h-4 text-zinc-600" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-400 uppercase tracking-widest">
                              Email
                            </p>
                            <a
                              href={`mailto:${selectedContact.email}`}
                              className="text-sm font-medium text-zinc-950 hover:underline"
                            >
                              {selectedContact.email}
                            </a>
                          </div>
                        </div>
                        {selectedContact.phone && (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center">
                              <Phone className="w-4 h-4 text-zinc-600" />
                            </div>
                            <div>
                              <p className="text-xs text-zinc-400 uppercase tracking-widest">
                                Téléphone
                              </p>
                              <a
                                href={`tel:${selectedContact.phone}`}
                                className="text-sm font-medium text-zinc-950 hover:underline"
                              >
                                {selectedContact.phone}
                              </a>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center">
                            <Tag className="w-4 h-4 text-zinc-600" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-400 uppercase tracking-widest">
                              Sujet
                            </p>
                            <p className="text-sm font-medium text-zinc-950">
                              {subjectLabels[selectedContact.subject] ||
                                selectedContact.subject}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-zinc-600" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-400 uppercase tracking-widest">
                              Reçu le
                            </p>
                            <p className="text-sm font-medium text-zinc-950">
                              {formatDate(selectedContact.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-950 mb-3">
                          Message
                        </p>
                        <div className="p-4 bg-zinc-50 border border-zinc-200">
                          <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">
                            {selectedContact.message}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <a
                          href={`mailto:${selectedContact.email}?subject=Re: ${
                            subjectLabels[selectedContact.subject] ||
                            selectedContact.subject
                          }`}
                          className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-950 text-white hover:bg-zinc-800 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span className="text-sm font-semibold uppercase tracking-widest">
                            Répondre par email
                          </span>
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full min-h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                      <p className="text-sm text-zinc-500 font-medium">
                        Sélectionnez un message pour voir les détails
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* PROJECTS TAB */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "projects" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {(
                Object.entries(statusConfig) as [
                  string,
                  (typeof statusConfig)[string],
                ][]
              ).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <div
                    key={key}
                    className={`border p-5 ${config.bg}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-4 h-4 ${config.color}`} />
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                        {config.label}
                      </p>
                    </div>
                    <p
                      className={`text-3xl font-black tracking-tighter ${config.color}`}
                    >
                      {projectsByStatus[key as keyof typeof projectsByStatus]}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Project Form Modal */}
            {showProjectForm && (
              <ProjectForm
                project={editingProject}
                onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
                onCancel={() => {
                  setShowProjectForm(false);
                  setEditingProject(null);
                }}
              />
            )}

            {/* Status Change Modal */}
            {showStatusModal && selectedProject && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white border border-zinc-200 w-full max-w-md">
                  <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-950">
                      Changer le statut
                    </h3>
                    <button
                      onClick={() => setShowStatusModal(false)}
                      className="p-1 text-zinc-400 hover:text-zinc-950"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-950 block mb-2">
                        Nouveau statut
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(
                          Object.entries(statusConfig) as [
                            Project["status"],
                            (typeof statusConfig)[string],
                          ][]
                        ).map(([key, config]) => {
                          const Icon = config.icon;
                          return (
                            <button
                              key={key}
                              onClick={() => setNewStatus(key)}
                              className={`flex items-center gap-2 p-3 border text-left transition-colors ${
                                newStatus === key
                                  ? `${config.bg} ${config.color}`
                                  : "border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-sm font-semibold">
                                {config.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-950 block mb-2">
                        Note (visible par le client)
                      </label>
                      <textarea
                        value={statusNote}
                        onChange={(e) => setStatusNote(e.target.value)}
                        rows={3}
                        placeholder="Ex: Le design de la maquette est validé, nous passons au développement..."
                        className="w-full px-4 py-3 bg-white border border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 text-sm resize-none"
                      />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sendEmail}
                        onChange={(e) => setSendEmail(e.target.checked)}
                        className="w-4 h-4 accent-zinc-950"
                      />
                      <span className="text-sm font-medium text-zinc-700">
                        Envoyer un email de notification au client
                      </span>
                    </label>
                    <button
                      onClick={handleStatusChange}
                      className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-zinc-950 text-white hover:bg-zinc-800 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span className="text-sm font-semibold uppercase tracking-widest">
                        Mettre à jour
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Project Detail View */}
            {selectedProject && !showProjectForm ? (
              <ProjectDetail
                project={selectedProject}
                onBack={() => setSelectedProject(null)}
                onEdit={() => {
                  setEditingProject(selectedProject);
                  setShowProjectForm(true);
                }}
                onDelete={() => handleDeleteProject(selectedProject.id)}
                onStatusChange={() => {
                  setNewStatus(selectedProject.status);
                  setStatusNote("");
                  setShowStatusModal(true);
                }}
              />
            ) : !showProjectForm ? (
              /* Project List */
              <div className="bg-white border border-zinc-200">
                <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-950">
                    Tous les projets
                  </h2>
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setShowProjectForm(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-950 text-white hover:bg-zinc-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-widest">
                      Nouveau projet
                    </span>
                  </button>
                </div>

                {projectsLoading ? (
                  <div className="p-12 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
                  </div>
                ) : projects.length === 0 ? (
                  <div className="p-12 text-center">
                    <FolderKanban className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                    <p className="text-sm text-zinc-500 font-medium mb-4">
                      Aucun projet pour le moment
                    </p>
                    <button
                      onClick={() => setShowProjectForm(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-950 text-white hover:bg-zinc-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-widest">
                        Créer un projet
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-zinc-100">
                    {projects.map((project) => {
                      const config = statusConfig[project.status];
                      const Icon = config.icon;
                      return (
                        <button
                          key={project.id}
                          onClick={() => setSelectedProject(project)}
                          className="w-full p-5 text-left hover:bg-zinc-50 transition-colors flex items-center gap-5"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1.5">
                              <p className="text-sm font-bold text-zinc-950 truncate">
                                {project.name}
                              </p>
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 border text-xs font-semibold ${config.bg} ${config.color}`}
                              >
                                <Icon className="w-3 h-3" />
                                {config.label}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-500 mb-1">
                              {project.clientName} — {typeLabels[project.type] || project.type}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-zinc-400">
                              {project.budget && (
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" />
                                  {project.budget}
                                </span>
                              )}
                              {project.deadline && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {project.deadline}
                                </span>
                              )}
                            </div>
                          </div>
                          {/* Progress bar */}
                          <div className="w-24 shrink-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-zinc-950">
                                {project.progress || 0}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-zinc-100">
                              <div
                                className="h-full bg-zinc-950 transition-all"
                                style={{ width: `${project.progress || 0}%` }}
                              />
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-300 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Project Form Component ──────────────────────────────────────────────────

function ProjectForm({
  project,
  onSubmit,
  onCancel,
}: {
  project: Project | null;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(
    project
      ? {
          name: project.name,
          description: project.description,
          clientName: project.clientName,
          clientEmail: project.clientEmail,
          clientPhone: project.clientPhone || "",
          type: project.type,
          status: project.status,
          budget: project.budget,
          deadline: project.deadline,
          progress: project.progress,
          notes: project.notes || "",
        }
      : { ...emptyProject }
  );
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSubmit(form);
    setSaving(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "progress" ? Number(value) : value,
    }));
  };

  return (
    <div className="bg-white border border-zinc-200 mb-8">
      <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-950">
          {project ? "Modifier le projet" : "Nouveau projet"}
        </h2>
        <button
          onClick={onCancel}
          className="p-1 text-zinc-400 hover:text-zinc-950"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Project Info */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            Informations du projet
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-950 block mb-2">
                Nom du projet *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Ex: Site e-commerce Mode & Style"
                className="w-full px-4 py-3 bg-white border border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-950 block mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Description du projet, objectifs, spécificités..."
                className="w-full px-4 py-3 bg-white border border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 text-sm resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-950 block mb-2">
                Type de projet
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-zinc-200 text-zinc-950 focus:outline-none focus:border-zinc-950 text-sm cursor-pointer"
              >
                {Object.entries(typeLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-950 block mb-2">
                Budget
              </label>
              <input
                type="text"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="Ex: 5 000€"
                className="w-full px-4 py-3 bg-white border border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-950 block mb-2">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-zinc-200 text-zinc-950 focus:outline-none focus:border-zinc-950 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-950 block mb-2">
                Progression ({form.progress}%)
              </label>
              <input
                type="range"
                name="progress"
                min="0"
                max="100"
                step="5"
                value={form.progress}
                onChange={handleChange}
                className="w-full accent-zinc-950"
              />
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
            <User className="w-3.5 h-3.5" />
            Informations client
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-950 block mb-2">
                Nom du client *
              </label>
              <input
                type="text"
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                required
                placeholder="Nom complet"
                className="w-full px-4 py-3 bg-white border border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-950 block mb-2">
                Email client *
              </label>
              <input
                type="email"
                name="clientEmail"
                value={form.clientEmail}
                onChange={handleChange}
                required
                placeholder="client@email.com"
                className="w-full px-4 py-3 bg-white border border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-950 block mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                name="clientPhone"
                value={form.clientPhone}
                onChange={handleChange}
                placeholder="+33 6 00 00 00 00"
                className="w-full px-4 py-3 bg-white border border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
            <StickyNote className="w-3.5 h-3.5" />
            Notes internes
          </h3>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Notes privées, remarques, TODO..."
            className="w-full px-4 py-3 bg-white border border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 text-sm resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-3 px-6 py-3 bg-zinc-950 text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            <span className="text-sm font-semibold uppercase tracking-widest">
              {project ? "Enregistrer" : "Créer le projet"}
            </span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-sm font-semibold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Project Detail Component ────────────────────────────────────────────────

function ProjectDetail({
  project,
  onBack,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  project: Project;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: () => void;
}) {
  const config = statusConfig[project.status];
  const StatusIcon = config.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-zinc-200">
        <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux projets
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-950 border border-zinc-200 hover:border-zinc-950 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Modifier
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-700 border border-zinc-200 hover:border-red-300 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Supprimer
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-zinc-950 mb-2">
                {project.name}
              </h1>
              <p className="text-sm text-zinc-500">
                {typeLabels[project.type] || project.type} — {project.clientName}
              </p>
            </div>
            <button
              onClick={onStatusChange}
              className={`flex items-center gap-2 px-4 py-2 border ${config.bg} ${config.color} hover:opacity-80 transition-opacity cursor-pointer`}
            >
              <StatusIcon className="w-4 h-4" />
              <span className="text-sm font-bold">{config.label}</span>
              <Edit3 className="w-3 h-3 ml-1 opacity-50" />
            </button>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Progression
              </span>
              <span className="text-sm font-black text-zinc-950">
                {project.progress || 0}%
              </span>
            </div>
            <div className="w-full h-2 bg-zinc-100">
              <div
                className="h-full bg-zinc-950 transition-all"
                style={{ width: `${project.progress || 0}%` }}
              />
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-zinc-50 border border-zinc-100">
              <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">
                Client
              </p>
              <p className="text-sm font-bold text-zinc-950">
                {project.clientName}
              </p>
            </div>
            <div className="p-4 bg-zinc-50 border border-zinc-100">
              <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">
                Email
              </p>
              <a
                href={`mailto:${project.clientEmail}`}
                className="text-sm font-bold text-zinc-950 hover:underline"
              >
                {project.clientEmail}
              </a>
            </div>
            <div className="p-4 bg-zinc-50 border border-zinc-100">
              <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">
                Budget
              </p>
              <p className="text-sm font-bold text-zinc-950">
                {project.budget || "—"}
              </p>
            </div>
            <div className="p-4 bg-zinc-50 border border-zinc-100">
              <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">
                Deadline
              </p>
              <p className="text-sm font-bold text-zinc-950">
                {project.deadline || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Description & Notes */}
        <div className="lg:col-span-7 space-y-6">
          {project.description && (
            <div className="bg-white border border-zinc-200 p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-950 mb-3 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                Description
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          )}
          {project.notes && (
            <div className="bg-white border border-zinc-200 p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-950 mb-3 flex items-center gap-2">
                <StickyNote className="w-3.5 h-3.5" />
                Notes internes
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-wrap">
                {project.notes}
              </p>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-zinc-200 p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-950 mb-6 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              Historique
            </h3>
            {project.timeline && project.timeline.length > 0 ? (
              <div className="space-y-0">
                {[...project.timeline].reverse().map((entry, i) => {
                  const entryConfig = statusConfig[entry.status] || statusConfig.pending;
                  const EntryIcon = entryConfig.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 border flex items-center justify-center shrink-0 ${entryConfig.bg}`}
                        >
                          <EntryIcon
                            className={`w-3.5 h-3.5 ${entryConfig.color}`}
                          />
                        </div>
                        {i < project.timeline.length - 1 && (
                          <div className="w-px h-full min-h-[24px] bg-zinc-200" />
                        )}
                      </div>
                      <div className="pb-6 flex-1 min-w-0">
                        <p className="text-sm font-bold text-zinc-950">
                          {entryConfig.label}
                        </p>
                        <p className="text-xs text-zinc-400 mb-1">
                          {entry.date instanceof Timestamp
                            ? formatShortDate(entry.date)
                            : "—"}
                        </p>
                        {entry.note && (
                          <p className="text-xs text-zinc-500 leading-relaxed">
                            {entry.note}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-zinc-400">Aucun historique</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
