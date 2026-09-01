// ================================
// ZAG SERVICE — SCRIPT PRINCIPAL
// ================================


// ================================
// ÉLÉMENTS PRINCIPAUX
// ================================

const menuButton = document.getElementById("menuButton");
const menu = document.querySelector(".menu");

const accueil = document.getElementById("accueil");
const services = document.getElementById("services");
const pourquoi = document.getElementById("pourquoi");
const apropos = document.getElementById("apropos");
const contact = document.getElementById("contact");

const serviceButton = document.getElementById("serviceButton");
const logo = document.querySelector(".logo");


// ================================
// FONCTION POUR CACHER LES SECTIONS
// ================================

function cacherToutesLesSections() {

    if (services) {
        services.style.display = "none";
    }

    if (pourquoi) {
        pourquoi.style.display = "none";
    }

    if (apropos) {
        apropos.style.display = "none";
    }

    if (contact) {
        contact.style.display = "none";
    }

}


// ================================
// AFFICHER ACCUEIL
// ================================

function afficherAccueil() {

    cacherToutesLesSections();

    if (accueil) {
        accueil.style.display = "block";
        accueil.scrollIntoView({
            behavior: "smooth"
        });
    }

    if (serviceButton) {
        serviceButton.style.display = "block";
        serviceButton.textContent = "Découvrir nos services";
    }

}


// ================================
// AFFICHER SERVICES
// ================================

function afficherServices() {

    cacherToutesLesSections();

    if (services) {
        services.style.display = "block";
        services.scrollIntoView({
            behavior: "smooth"
        });
    }

    if (serviceButton) {
        serviceButton.style.display = "none";
    }

}


// ================================
// AFFICHER À PROPOS
// ================================

function afficherApropos() {

    cacherToutesLesSections();

    if (apropos) {
        apropos.style.display = "block";
        apropos.scrollIntoView({
            behavior: "smooth"
        });
    }

    if (serviceButton) {
        serviceButton.style.display = "none";
    }

}


// ================================
// AFFICHER CONTACT
// ================================

function afficherContact() {

    cacherToutesLesSections();

    if (contact) {
        contact.style.display = "block";
        contact.scrollIntoView({
            behavior: "smooth"
        });
    }

    if (serviceButton) {
        serviceButton.style.display = "none";
    }

}


// ================================
// MENU
// ================================

if (menuButton && menu) {

    menuButton.addEventListener("click", function () {

        if (
            menu.style.display === "none" ||
            menu.style.display === ""
        ) {

            menu.style.display = "flex";

        } else {

            menu.style.display = "none";

        }

    });

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
// LIENS DU MENU
// ================================

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        if (menu) {
            menu.style.display = "none";
        }

        const destination =
            link.getAttribute("href");


        // ACCUEIL

        if (destination === "#accueil") {

            afficherAccueil();

        }


        // SERVICES

        if (destination === "#services") {

            afficherServices();

        }


        // À PROPOS

        if (destination === "#apropos") {

            afficherApropos();

        }


        // CONTACT

        if (destination === "#contact") {

            afficherContact();

        }

    });

});


// ================================
// LOGO
// ================================

if (logo) {

    logo.addEventListener("click", function () {

        if (menu) {
            menu.style.display = "none";
        }

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
// DEMANDE DE DEVIS
// ================================

document.querySelectorAll(".devis-button").forEach(function(button) {

    button.addEventListener("click", function() {

        const carte = button.closest(".service-card");
        const titre = carte.querySelector("h3");

        const service = titre
            ? titre.textContent.trim()
            : "Service";

        alert(
            "DEMANDE DE DEVIS\n\n" +
            "Service : " + service + "\n\n" +
            "Nous allons prochainement vous permettre " +
            "d'envoyer votre demande de devis directement à ZAG SERVICE."
        );

    });

});
