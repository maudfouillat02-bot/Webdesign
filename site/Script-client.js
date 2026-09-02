// ================================
// ZAG SERVICE — SCRIPT PRINCIPAL
// ================================
// ================================
// SUPABASE — INITIALISATION
// ================================

const SUPABASE_URL = "https://bkmhffpzhdhxrgxkinkk.supabase.co";

// Clé Publishable / anon uniquement
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_UcQl5wt5aXwmcmwKpu3jnA_PcsD02TT";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

// ================================
// ÉLÉMENTS PRINCIPAUX
// ================================

const accueil = document.getElementById("accueil");
const services = document.getElementById("services");
const pourquoi = document.getElementById("pourquoi");
const apropos = document.getElementById("apropos");
const contact = document.getElementById("contact");

const serviceButton = document.getElementById("serviceButton");
const logo = document.querySelector(".logo");


// ================================
// NAVIGATION DU SITE CLIENT
// ================================

function afficherVueClient(id) {
    const sections = document.querySelectorAll("main > section");

    sections.forEach(function(section) {
        section.style.display = "none";
    });

    const cible = document.getElementById(id);

    if (cible) {
        cible.style.display = "block";
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

function afficherAccueil() {
    afficherVueClient("accueil");
}

function afficherServices() {
    afficherVueClient("services");
}

function afficherApropos() {
    afficherVueClient("apropos");
}

function afficherContact() {
    afficherVueClient("contact");
}

// ================================
// BOUTON DÉCOUVRIR LES SERVICES
// ================================

if (serviceButton) {

    serviceButton.addEventListener("click", function () {

        afficherServices();

    });

}


// ================================
// LOGO
// ================================

if (logo) {

    logo.addEventListener("click", function () {
        afficherAccueil();
    });

}


// ================================
// BOUTONS "EN SAVOIR PLUS"
// ================================

function afficherInformation(buttonId, infoId) {

    const button =
        document.getElementById(buttonId);

    const info =
        document.getElementById(infoId);

    if (!button || !info) {
        return;
    }

    button.addEventListener("click", function () {

        if (
            info.style.display === "none" ||
            info.style.display === ""
        ) {

            info.style.display = "block";
            button.textContent = "Masquer";

        } else {

            info.style.display = "none";
            button.textContent = "En savoir plus";

        }

    });

}


afficherInformation(
    "eventButton",
    "eventInfo"
);

afficherInformation(
    "transportButton",
    "transportInfo"
);

afficherInformation(
    "immobilierButton",
    "immobilierInfo"
);

afficherInformation(
    "digitalButton",
    "digitalInfo"
);


// ================================
// FORMULAIRE CONTACT
// ================================

const contactForm =
    document.getElementById("contactForm");

let dernierEnvoi = 0;


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // ================================
            // ANTI-SPAM
            // ================================

            const maintenant =
                Date.now();

            if (
                maintenant - dernierEnvoi < 30000
            ) {

                alert(
                    "Veuillez patienter quelques secondes avant de renvoyer un message."
                );

                return;

            }


            // ================================
            // RÉCUPÉRATION
            // ================================

            const nom =
                document
                    .getElementById("nom")
                    ?.value
                    .trim() || "";

            const telephone =
                document
                    .getElementById("telephone")
                    ?.value
                    .trim() || "";

            const email =
                document
                    .getElementById("email")
                    ?.value
                    .trim() || "";

            const message =
                document
                    .getElementById("message")
                    ?.value
                    .trim() || "";


            // ================================
            // VALIDATION
            // ================================

            if (!nom) {

                alert(
                    "Veuillez entrer votre nom."
                );

                return;

            }


            if (!telephone) {

                alert(
                    "Veuillez entrer votre numéro de téléphone."
                );

                return;

            }


            if (!email) {

                alert(
                    "Veuillez entrer votre adresse email."
                );

                return;

            }


            if (!message) {

                alert(
                    "Veuillez écrire votre message."
                );

                return;

            }


            if (message.length < 10) {

                alert(
                    "Votre message doit contenir au moins 10 caractères."
                );

                return;

            }


            // ================================
            // TURNSTILE
            // ================================

            const turnstileToken =
                window.turnstile?.getResponse();


            if (!turnstileToken) {

                alert(
                    "Veuillez effectuer la vérification anti-robot."
                );

                return;

            }


            dernierEnvoi =
                Date.now();


            // ================================
            // BOUTON
            // ================================

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );

            const successMessage =
                document.getElementById(
                    "successMessage"
                );


            if (submitButton) {

                submitButton.textContent =
                    "Envoi en cours...";

                submitButton.disabled =
                    true;

            }


            if (successMessage) {

                successMessage.textContent =
                    "";

            }


            // ================================
            // ENVOI SUPABASE
            // ================================

            try {

                const response =
                    await fetch(
                        "https://bkmhffpzhdhxrgxkinkk.supabase.co/functions/v1/swift-api",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    nom:
                                        nom,

                                    telephone:
                                        telephone,

                                    email:
                                        email,

                                    message:
                                        message,

                                    turnstileToken:
                                        turnstileToken

                                })

                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.error ||
                        "Erreur lors de l'envoi."
                    );

                }


                if (successMessage) {

                    successMessage.textContent =
                        "✓ Merci ! Votre message a bien été envoyé.";

                }


                contactForm.reset();


                if (window.turnstile) {

                    window.turnstile.reset();

                }


            } catch (error) {

                console.error(
                    "Erreur lors de l'envoi :",
                    error
                );


                if (successMessage) {

                    successMessage.textContent =
                        "Une erreur est survenue. Votre message n'a pas pu être envoyé.";

                }


                if (window.turnstile) {

                    window.turnstile.reset();

                }

            } finally {

                if (submitButton) {

                    submitButton.textContent =
                        "Envoyer le message";

                    submitButton.disabled =
                        false;

                }

            }

        }
    );

}
// ================================
// DEMANDE DE DEVIS — SUPABASE
// ================================

document.querySelectorAll(".devis-button").forEach(function(button) {

    button.addEventListener("click", function() {

        const carte = button.closest(".service-card");
        const titre = carte
            ? carte.querySelector("h3")
            : null;

        const service = titre
            ? titre.textContent.trim()
            : "Service";

        const devisSection =
            document.getElementById("devis");

        if (!devisSection) {
            console.error("Section devis introuvable.");
            return;
        }

        const serviceInput =
            document.getElementById("devisService");

        const digitalOptions =
            document.getElementById("digitalOptions");

        const digitalType =
            document.getElementById("devisDigitalType");

        if (serviceInput) {
            serviceInput.value = service;
        }

        // Afficher les options uniquement pour Digital
        if (digitalOptions) {
            digitalOptions.style.display =
                service === "Digital" ? "block" : "none";
        }

        // Réinitialiser le choix Digital
        if (digitalType) {
            digitalType.value = "";
        }

        // Afficher uniquement la vue Devis
        const sections = document.querySelectorAll("main > section");

        sections.forEach(function(section) {
            section.style.display = "none";
        });

        devisSection.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        const nomInput =
            document.getElementById("devisNom");

        if (nomInput) {
            setTimeout(function() {
                nomInput.focus();
            }, 500);
        }

    });

});

// Envoi du formulaire de devis vers Supabase

const devisForm = document.getElementById("devisForm");

if (devisForm) {

    devisForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const message = document.getElementById("devisMessage");
        const submitButton = devisForm.querySelector(".devis-submit");

        const nom = document.getElementById("devisNom").value.trim();
        const telephone = document.getElementById("devisTelephone").value.trim();
        const email = document.getElementById("devisEmail").value.trim();
        const service = document.getElementById("devisService").value.trim();
        const commune = document.getElementById("devisCommune").value.trim();
        const date = document.getElementById("devisDate").value || null;
        const budget = document.getElementById("devisBudget").value || null;

        const digitalTypeElement =
            document.getElementById("devisDigitalType");

        const digitalType =
            digitalTypeElement
                ? digitalTypeElement.value.trim()
                : "";

        let description =
            document.getElementById("devisDescription").value.trim();

        // Pour Digital, ajouter automatiquement le type de prestation
        if (service === "Digital") {

            if (!digitalType) {
                if (message) {
                    message.textContent =
                        "Veuillez sélectionner le type de prestation Digital.";
                    message.style.color = "#b00020";
                }

                return;
            }

            description =
                "Type de prestation : " +
                digitalType +
                "\n\n" +
                description;
        }

        if (!nom || !telephone || !service || !commune || !description) {

            if (message) {
                message.textContent = "Veuillez remplir tous les champs obligatoires.";
                message.style.color = "#b00020";
            }

            return;
        }

        if (message) {
            message.textContent = "Envoi de votre demande...";
            message.style.color = "#555";
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Envoi en cours...";
        }

        try {

            const { error } = await supabaseClient
                .from("devis")
                .insert([
                    {
                        nom: nom,
                        telephone: telephone,
                        email: email || null,
                        service: service,
                        commune: commune,
                        date_souhaitee: date,
                        budget: budget,
                        description: description
                    }
                ]);

            if (error) {
                throw error;
            }

            if (message) {
                message.textContent = "Votre demande de devis a bien été envoyée à ZAG SERVICE.";
                message.style.color = "#16803c";
            }

            devisForm.reset();

            // Le service doit rester vide après l'envoi
            const serviceInput = document.getElementById("devisService");
            const digitalOptions = document.getElementById("digitalOptions");
            const digitalType = document.getElementById("devisDigitalType");

            if (serviceInput) {
                serviceInput.value = "";
            }

            if (digitalOptions) {
                digitalOptions.style.display = "none";
            }

            if (digitalType) {
                digitalType.value = "";
            }

        } catch (error) {

            console.error("Erreur Supabase devis :", error);

            if (message) {
                message.textContent = "Erreur : " + (error.message || error);
                message.style.color = "#b00020";
            }

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Envoyer ma demande";
            }

        }

    });

}

// =========================================================
// MENU DU SITE CLIENT
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.querySelector(".menu-button");
    const menu = document.querySelector(".header .menu");

    if (!menuButton || !menu) return;

    menuButton.addEventListener("click", function () {

        const ouvert = menu.classList.toggle("menu-ouvert");

        menuButton.setAttribute(
            "aria-expanded",
            ouvert ? "true" : "false"
        );

        menuButton.textContent = ouvert ? "✕" : "☰";
    });

    menu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            menu.classList.remove("menu-ouvert");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.textContent = "☰";
        });

    });

});

/* =========================================================
   RETOUR DEVIS → SERVICES
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const retourServices = document.getElementById("retourServices");

    if (retourServices) {

        retourServices.addEventListener("click", function () {

            afficherServices();

        });

    }

});

/* =========================================================
   INITIALISATION — UNE SEULE VUE À LA FOIS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    afficherAccueil();
});

/* =========================================================
   MENU CLIENT — NAVIGATION ENTRE LES VUES
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const liensMenu = document.querySelectorAll(".header .menu a");

    liensMenu.forEach(function (lien) {

        lien.addEventListener("click", function (event) {

            event.preventDefault();

            const cible = lien.getAttribute("href");

            if (cible === "#accueil") {
                afficherAccueil();
            }

            if (cible === "#services") {
                afficherServices();
            }

            if (cible === "#apropos") {
                afficherApropos();
            }

            if (cible === "#contact") {
                afficherContact();
            }

        });

    });

});
