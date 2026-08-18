import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://maudfouillat02-bot.github.io",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const DATA_BASE_ADMIN_KEY =
  Deno.env.get("DATA_BASE_ADMIN_KEY")!;

const TURNSTILE_SECRET_KEY =
  Deno.env.get("TURNSTILE_SECRET_KEY")!;

const RESEND_API_KEY =
  Deno.env.get("RESEND_API_KEY")!;

const EMAIL_FROM =
  Deno.env.get("EMAIL_FROM")!;

const EMAIL_TO =
  Deno.env.get("EMAIL_TO")!;

const supabase = createClient(
  supabaseUrl,
  DATA_BASE_ADMIN_KEY,
);

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

Deno.serve(async (req) => {

  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return json(
      {
        success: false,
        message: "Méthode non autorisée.",
      },
      405,
    );
  }

  try {

    const body = await req.json();

    const nom =
      String(body.nom ?? "").trim();

    const telephone =
      String(body.telephone ?? "").trim();

    const email =
      String(body.email ?? "").trim();

    const service =
      String(body.service ?? "").trim();

    const type_demande =
      String(
        body.type_demande ?? "devis",
      ).trim();

    const message =
      String(body.message ?? "").trim();

    const turnstile_token =
      String(
        body.turnstile_token ??
        body.turnstileToken ??
        "",
      ).trim();


    if (!nom || !telephone) {

      return json(
        {
          success: false,
          message:
            "Nom et téléphone obligatoires.",
        },
        400,
      );

    }


    if (!turnstile_token) {

      return json(
        {
          success: false,
          message:
            "Veuillez valider Turnstile.",
        },
        400,
      );

    }


    /* ================================
       VÉRIFICATION TURNSTILE
    ================================= */

    const formData = new FormData();

    formData.append(
      "secret",
      TURNSTILE_SECRET_KEY,
    );

    formData.append(
      "response",
      turnstile_token,
    );


    const verify =
      await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: formData,
        },
      );


    const verifyResult =
      await verify.json();


    if (!verifyResult.success) {

      console.error(
        "Turnstile refusé :",
        verifyResult,
      );

      return json(
        {
          success: false,
          message:
            "La vérification de sécurité a échoué.",
        },
        403,
      );

    }


    /* ================================
       CONSTRUCTION DE LA DEMANDE
    ================================= */

    const demande = {

      type_demande:
        type_demande,

      service:
        service || null,

      nom:
        nom,

      telephone:
        telephone,

      email:
        email || null,

      type_evenement:
        body.type_evenement || null,

      nombre_participants:
        body.nombre_participants
          ? Number(
              body.nombre_participants,
            )
          : null,

      lieu_evenement:
        body.lieu_evenement || null,

      date_evenement:
        body.date_evenement || null,

      type_accompagnement:
        body.type_accompagnement || null,

      duree_prestation:
        body.duree_prestation || null,

      lieu_prestation:
        body.lieu_prestation || null,

      date_prestation:
        body.date_prestation || null,

      type_transport:
        body.type_transport || null,

      trajet:
        body.trajet || null,

      nombres_personnes:
        body.nombres_personnes
          ? Number(
              body.nombres_personnes,
            )
          : null,

      date_transport:
        body.date_transport || null,

      operation_immobiliere:
        body.operation_immobiliere || null,

      type_bien:
        body.type_bien || null,

      localisation:
        body.localisation || null,

      budget:
        body.budget || null,

      message:
        message || null,

      statut:
        "nouvelle",

      turnstile_verified:
        true,

      traite_at:
        null,

      note_interne:
        null,
    };


    /* ================================
       ENREGISTREMENT SQL
    ================================= */

    const {
      data,
      error,
    } = await supabase
      .from("demandes")
      .insert(demande)
      .select("id")
      .single();


    if (error) {

      console.error(
        "Erreur SQL :",
        error,
      );

      return json(
        {
          success: false,
          message:
            "Impossible d'enregistrer la demande.",
        },
        500,
      );

    }


    /* ================================
       EMAIL
    ================================= */

    const html = `
      <h2>Nouvelle demande ZAG SERVICE</h2>

      <p>
        <strong>Service :</strong>
        ${escapeHtml(service)}
      </p>

      <p>
        <strong>Type :</strong>
        ${escapeHtml(type_demande)}
      </p>

      <hr>

      <p>
        <strong>Nom :</strong>
        ${escapeHtml(nom)}
      </p>

      <p>
        <strong>Téléphone :</strong>
        ${escapeHtml(telephone)}
      </p>

      <p>
        <strong>Email :</strong>
        ${escapeHtml(email)}
      </p>

      <hr>

      <p>
        <strong>Message :</strong>
      </p>

      <p>
        ${escapeHtml(message).replace(/\n/g, "<br>")}
      </p>

      <hr>

      <p>
        <strong>ID de la demande :</strong>
        ${data.id}
      </p>
    `;


    let email_sent = false;


    try {

      const resend =
        await fetch(
          "https://api.resend.com/emails",
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${RESEND_API_KEY}`,

              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              from:
                EMAIL_FROM,

              to:
                [EMAIL_TO],

              subject:
                `Nouvelle demande ZAG SERVICE - ${service}`,

              html:
                html,
            }),
          },
        );


      if (resend.ok) {

        email_sent = true;

      } else {

        console.error(
          "Erreur Resend :",
          await resend.text(),
        );

      }

    } catch (mailError) {

      console.error(
        "Erreur email :",
        mailError,
      );

    }


    /* ================================
       RÉPONSE FINALE
    ================================= */

    return json({

      success:
        true,

      message:
        "Votre demande a bien été envoyée. Merci pour votre confiance.",

      demande_id:
        data.id,

      email_sent:
        email_sent,

    });


  } catch (error) {

    console.error(
      "Erreur serveur :",
      error,
    );

    return json(
      {
        success: false,
        message:
          "Une erreur serveur est survenue.",
      },
      500,
    );

  }

});