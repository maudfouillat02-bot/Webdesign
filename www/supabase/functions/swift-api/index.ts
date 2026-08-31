import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://maudfouillat02-bot.github.io",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        error: "Méthode non autorisée.",
      }),
      {
        status: 405,
        headers: corsHeaders,
      },
    );
  }

  try {
    const body = await req.json();

    const nom = String(body.nom ?? "").trim();
    const telephone = String(body.telephone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();
    const turnstileToken = String(body.turnstileToken ?? "").trim();

    if (!nom || !telephone || !email || !message || !turnstileToken) {
      return new Response(
        JSON.stringify({
          error: "Données du formulaire incomplètes.",
        }),
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    if (message.length < 10) {
      return new Response(
        JSON.stringify({
          error: "Votre message doit contenir au moins 10 caractères.",
        }),
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");

    if (!turnstileSecret) {
      console.error("TURNSTILE_SECRET_KEY est introuvable.");

      return new Response(
        JSON.stringify({
          error: "Configuration serveur incomplète.",
        }),
        {
          status: 500,
          headers: corsHeaders,
        },
      );
    }

    const formData = new FormData();
    formData.append("secret", turnstileSecret);
    formData.append("response", turnstileToken);

    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      },
    );

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      console.error("Turnstile refusé :", turnstileResult);

      return new Response(
        JSON.stringify({
          error: "Vérification anti-bot échouée.",
        }),
        {
          status: 403,
          headers: corsHeaders,
        },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");

    const secretKeys = JSON.parse(
      Deno.env.get("SUPABASE_SECRET_KEYS") || "{}",
    );

    const supabaseSecretKey = secretKeys.default;

    if (!supabaseUrl || !supabaseSecretKey) {
      console.error("Configuration Supabase manquante.");

      return new Response(
        JSON.stringify({
          error: "Configuration serveur incomplète.",
        }),
        {
          status: 500,
          headers: corsHeaders,
        },
      );
    }

    const insertResponse = await fetch(
      `${supabaseUrl}/rest/v1/messages`,
      {
        method: "POST",
        headers: {
          apikey: supabaseSecretKey,
          Authorization: `Bearer ${supabaseSecretKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          nom,
          telephone,
          email,
          message,
        }),
      },
    );

    if (!insertResponse.ok) {
      const errorText = await insertResponse.text();

      console.error(
        "Erreur insertion Supabase :",
        errorText,
      );

      return new Response(
        JSON.stringify({
          error: "Impossible d'enregistrer le message.",
        }),
        {
          status: 500,
          headers: corsHeaders,
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message envoyé avec succès.",
      }),
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  } catch (error) {
    console.error("Erreur serveur :", error);

    return new Response(
      JSON.stringify({
        error: "Une erreur est survenue.",
      }),
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
});
