const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Secrets configurés via Firebase CLI
const smtpEmail = defineSecret("SMTP_EMAIL");
const smtpPassword = defineSecret("SMTP_PASSWORD");

const ADMIN_RECIPIENTS = [
  "ezekielmsc@gmail.com",
  "max.levy2@hotmail.fr",
];

const STATUS_LABELS = {
  pending: "En attente",
  in_progress: "En cours",
  review: "En review",
  completed: "Terminé",
};

const STATUS_COLORS = {
  pending: { bg: "#fffbeb", border: "#fde68a", text: "#d97706" },
  in_progress: { bg: "#eff6ff", border: "#bfdbfe", text: "#2563eb" },
  review: { bg: "#faf5ff", border: "#e9d5ff", text: "#9333ea" },
  completed: { bg: "#ecfdf5", border: "#a7f3d0", text: "#059669" },
};

function createTransporter(email, password) {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: email, pass: password },
  });
}

// ─── New Contact → Email to Admin ────────────────────────────────────────────

exports.onNewContact = onDocumentCreated(
  {
    document: "contacts/{contactId}",
    region: "europe-west1",
    secrets: [smtpEmail, smtpPassword],
  },
  async (event) => {
    const data = event.data.data();
    if (!data) return;

    const { name, email, phone, subject, message, createdAt } = data;

    const subjectLabels = {
      web: "Création de site web",
      mobile: "Application mobile",
      design: "UI/UX Design",
      other: "Autre demande",
    };

    const subjectLabel = subjectLabels[subject] || subject;
    const date = createdAt
      ? new Date(createdAt.seconds * 1000).toLocaleString("fr-FR", {
          timeZone: "Europe/Paris",
        })
      : new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });

    const transporter = createTransporter(smtpEmail.value(), smtpPassword.value());

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #09090b; padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 18px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; margin: 0;">
            ML ON DEVICE
          </h1>
        </div>
        <div style="padding: 32px; border: 1px solid #e4e4e7; border-top: none;">
          <h2 style="color: #09090b; font-size: 20px; font-weight: 800; margin: 0 0 24px 0;">
            Nouvelle demande de contact
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; color: #71717a; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; width: 120px; vertical-align: top;">Nom</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; color: #09090b; font-size: 14px; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; color: #71717a; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; color: #09090b; font-size: 14px; font-weight: 500;">
                <a href="mailto:${email}" style="color: #09090b; text-decoration: underline;">${email}</a>
              </td>
            </tr>
            ${phone ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; color: #71717a; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Téléphone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; color: #09090b; font-size: 14px; font-weight: 500;">${phone}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; color: #71717a; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Sujet</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; color: #09090b; font-size: 14px; font-weight: 500;">${subjectLabel}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #71717a; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #09090b; font-size: 14px; font-weight: 500; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background-color: #fafafa; border: 1px solid #f4f4f5;">
            <p style="margin: 0; color: #71717a; font-size: 12px;">Reçu le ${date}</p>
          </div>
        </div>
        <div style="padding: 24px; text-align: center;">
          <p style="margin: 0; color: #a1a1aa; font-size: 11px;">ML ON DEVICE — 60 Rue François 1er, 75008 Paris</p>
        </div>
      </div>
    `;

    // Email de confirmation au client
    const clientHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #09090b; padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 18px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; margin: 0;">
            ML ON DEVICE
          </h1>
        </div>
        <div style="padding: 32px; border: 1px solid #e4e4e7; border-top: none;">
          <p style="color: #71717a; font-size: 14px; margin: 0 0 8px 0;">
            Bonjour ${name},
          </p>
          <h2 style="color: #09090b; font-size: 22px; font-weight: 800; margin: 0 0 16px 0;">
            Merci pour votre message !
          </h2>
          <p style="color: #3f3f46; font-size: 14px; line-height: 1.7; margin: 0 0 24px 0;">
            Nous avons bien reçu votre demande concernant <strong>${subjectLabel.toLowerCase()}</strong>.
            Notre équipe reviendra vers vous dans les <strong>24 heures</strong>.
          </p>
          <div style="padding: 16px; background-color: #fafafa; border: 1px solid #f4f4f5; border-left: 3px solid #09090b; margin-bottom: 24px;">
            <p style="margin: 0 0 4px 0; color: #71717a; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">
              Votre message
            </p>
            <p style="margin: 0; color: #3f3f46; font-size: 13px; line-height: 1.6;">
              ${message.replace(/\n/g, "<br>")}
            </p>
          </div>
          <p style="color: #71717a; font-size: 13px; margin: 0;">
            En attendant, n'hésitez pas à nous contacter directement :
            <a href="mailto:contact@mlondevice.fr" style="color: #09090b; font-weight: 600; text-decoration: underline;">contact@mlondevice.fr</a>
          </p>
        </div>
        <div style="padding: 24px; text-align: center;">
          <p style="margin: 0; color: #a1a1aa; font-size: 11px;">
            ML ON DEVICE — 60 Rue François 1er, 75008 Paris
          </p>
        </div>
      </div>
    `;

    try {
      // Email aux admins
      await transporter.sendMail({
        from: `"ML ON DEVICE" <${smtpEmail.value()}>`,
        to: ADMIN_RECIPIENTS.join(", "),
        subject: `Nouveau contact — ${subjectLabel} — ${name}`,
        html: htmlContent,
        replyTo: email,
      });

      // Email de confirmation au client
      await transporter.sendMail({
        from: `"ML ON DEVICE" <${smtpEmail.value()}>`,
        to: email,
        subject: `ML ON DEVICE — Nous avons bien reçu votre message`,
        html: clientHtml,
      });

      console.log(`Emails envoyés pour le contact ${event.params.contactId}`);
    } catch (error) {
      console.error("Erreur envoi email contact:", error);
    }
  }
);

// ─── Project Status Update → Email to Client ────────────────────────────────

exports.onProjectStatusUpdate = onDocumentUpdated(
  {
    document: "projects/{projectId}",
    region: "europe-west1",
    secrets: [smtpEmail, smtpPassword],
  },
  async (event) => {
    const before = event.data.before.data();
    const after = event.data.after.data();
    if (!before || !after) return;

    // Only send email if the flag is set
    if (!after._statusEmailPending) return;

    const newStatus = after.status;
    const statusLabel = STATUS_LABELS[newStatus] || newStatus;
    const colors = STATUS_COLORS[newStatus] || STATUS_COLORS.pending;
    const note = after._statusEmailNote || "";
    const projectName = after.name;
    const clientName = after.clientName;
    const clientEmail = after.clientEmail;
    const progress = after.progress || 0;

    if (!clientEmail) {
      console.log("Pas d'email client, skip");
      return;
    }

    // Clear the flag immediately
    await event.data.after.ref.update({
      _statusEmailPending: admin.firestore.FieldValue.delete(),
      _statusEmailNote: admin.firestore.FieldValue.delete(),
    });

    const transporter = createTransporter(smtpEmail.value(), smtpPassword.value());

    const progressBarWidth = Math.max(progress, 2);

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <!-- Header -->
        <div style="background-color: #09090b; padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 18px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; margin: 0;">
            ML ON DEVICE
          </h1>
        </div>

        <!-- Body -->
        <div style="padding: 32px; border: 1px solid #e4e4e7; border-top: none;">
          <p style="color: #71717a; font-size: 14px; margin: 0 0 8px 0;">
            Bonjour ${clientName},
          </p>
          <h2 style="color: #09090b; font-size: 22px; font-weight: 800; margin: 0 0 24px 0;">
            Mise à jour de votre projet
          </h2>

          <!-- Project Name -->
          <div style="padding: 16px; background-color: #fafafa; border: 1px solid #f4f4f5; margin-bottom: 24px;">
            <p style="margin: 0 0 4px 0; color: #71717a; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">
              Projet
            </p>
            <p style="margin: 0; color: #09090b; font-size: 16px; font-weight: 700;">
              ${projectName}
            </p>
          </div>

          <!-- Status Badge -->
          <div style="margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0; color: #71717a; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">
              Nouveau statut
            </p>
            <div style="display: inline-block; padding: 8px 16px; background-color: ${colors.bg}; border: 1px solid ${colors.border};">
              <span style="color: ${colors.text}; font-size: 14px; font-weight: 700;">
                ${statusLabel}
              </span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div style="margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0; color: #71717a; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">
              Progression — ${progress}%
            </p>
            <div style="width: 100%; height: 8px; background-color: #f4f4f5; border-radius: 0;">
              <div style="width: ${progressBarWidth}%; height: 8px; background-color: #09090b; border-radius: 0;"></div>
            </div>
          </div>

          ${note ? `
          <!-- Note -->
          <div style="margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0; color: #71717a; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">
              Message de l'équipe
            </p>
            <div style="padding: 16px; background-color: #fafafa; border: 1px solid #f4f4f5; border-left: 3px solid #09090b;">
              <p style="margin: 0; color: #3f3f46; font-size: 14px; line-height: 1.6;">
                ${note.replace(/\n/g, "<br>")}
              </p>
            </div>
          </div>
          ` : ""}

          <!-- CTA -->
          <div style="text-align: center; margin-top: 32px;">
            <p style="color: #71717a; font-size: 13px; margin: 0 0 4px 0;">
              Une question ? Contactez-nous directement
            </p>
            <a href="mailto:contact@mlondevice.fr" style="color: #09090b; font-size: 13px; font-weight: 600; text-decoration: underline;">
              contact@mlondevice.fr
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 24px; text-align: center;">
          <p style="margin: 0; color: #a1a1aa; font-size: 11px;">
            ML ON DEVICE — 60 Rue François 1er, 75008 Paris
          </p>
        </div>
      </div>
    `;

    try {
      // Email to client
      await transporter.sendMail({
        from: `"ML ON DEVICE" <${smtpEmail.value()}>`,
        to: clientEmail,
        subject: `${projectName} — ${statusLabel}`,
        html: htmlContent,
      });

      // Email to admin
      await transporter.sendMail({
        from: `"ML ON DEVICE" <${smtpEmail.value()}>`,
        to: ADMIN_RECIPIENTS.join(", "),
        subject: `Projet mis à jour — ${projectName} → ${statusLabel}`,
        html: htmlContent,
      });

      console.log(`Emails envoyés pour le projet ${event.params.projectId} → ${statusLabel}`);
    } catch (error) {
      console.error("Erreur envoi email projet:", error);
    }
  }
);
