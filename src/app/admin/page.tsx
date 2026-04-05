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
} from "lucide-react";

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

const subjectLabels: Record<string, string> = {
  web: "Création de site web",
  mobile: "Application mobile",
  design: "UI/UX Design",
  other: "Autre demande",
};

export default function AdminDashboardPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contactsData: Contact[] = [];
      snapshot.forEach((doc) => {
        contactsData.push({ id: doc.id, ...doc.data() } as Contact);
      });
      setContacts(contactsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleMarkAsRead = async (contact: Contact) => {
    try {
      await updateDoc(doc(db, "contacts", contact.id), {
        read: !contact.read,
      });
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const handleDelete = async (contactId: string) => {
    if (!confirm("Supprimer ce message ?")) return;

    try {
      await deleteDoc(doc(db, "contacts", contactId));
      if (selectedContact?.id === contactId) {
        setSelectedContact(null);
      }
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
  };

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return "—";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const unreadCount = contacts.filter((c) => !c.read).length;

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

      <div className="max-w-[1600px] mx-auto px-6 py-8">
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
                      onClick={() => handleDelete(selectedContact.id)}
                      className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Contact Info */}
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

                  {/* Message */}
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

                  {/* Reply Button */}
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
      </div>
    </div>
  );
}
