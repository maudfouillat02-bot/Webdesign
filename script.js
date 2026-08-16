// ================================
// MENU
// ================================

const menuButton = document.getElementById("menuButton");
const menu = document.querySelector(".menu");

if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
        if (menu.style.display === "none" || menu.style.display === "") {
            menu.style.display = "flex";
        } else {
            menu.style.display = "none";
        }
    });
}


// ================================
// BOUTON SERVICES
// ================================

const serviceButton = document.getElementById("serviceButton");
const services = document.getElementById("services");

if (serviceButton && services) {

    serviceButton.addEventListener("click", function () {

        if (services.style.display === "none" || services.style.display === "") {

            services.style.display = "block";
            serviceButton.textContent = "Masquer les services";

            const cards = document.querySelectorAll(".service-card");

            cards.forEach(function (card, index) {

                card.style.opacity = "0";
                card.style.transform = "translateY(40px)";

                setTimeout(function () {

                    card.style.transition =
                        "opacity 0.8s ease, transform 0.8s ease";

                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";

                }, 300 + (index * 300));

            });

            setTimeout(function () {

                const position =
                    services.getBoundingClientRect().top +
                    window.scrollY -
                    80;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            }, 100);

        } else {

            services.style.display = "none";
            serviceButton.textContent = "Découvrir nos services";

        }

    });

}


// ================================
// BOUTONS "EN SAVOIR PLUS"
// ================================

// ÉVÉNEMENTIEL

const eventButton = document.getElementById("eventButton");
const eventInfo = document.getElementById("eventInfo");

if (eventButton && eventInfo) {

    eventButton.addEventListener("click", function () {

        if (eventInfo.style.display === "none" || eventInfo.style.display === "") {

            eventInfo.style.display = "block";
            eventButton.textContent = "Masquer";

        } else {

            eventInfo.style.display = "none";
            eventButton.textContent = "En savoir plus";

        }

    });

}


// TRANSPORT

const transportButton = document.getElementById("transportButton");
const transportInfo = document.getElementById("transportInfo");

if (transportButton && transportInfo) {

    transportButton.addEventListener("click", function () {

        if (transportInfo.style.display === "none" || transportInfo.style.display === "") {

            transportInfo.style.display = "block";
            transportButton.textContent = "Masquer";

        } else {

            transportInfo.style.display = "none";
            transportButton.textContent = "En savoir plus";

        }

    });

}


// IMMOBILIER

const immobilierButton = document.getElementById("immobilierButton");
const immobilierInfo = document.getElementById("immobilierInfo");

if (immobilierButton && immobilierInfo) {

    immobilierButton.addEventListener("click", function () {

        if (immobilierInfo.style.display === "none" || immobilierInfo.style.display === "") {

            immobilierInfo.style.display = "block";
            immobilierButton.textContent = "Masquer";

        } else {

            immobilierInfo.style.display = "none";
            immobilierButton.textContent = "En savoir plus";

        }

    });

}


// ================================
// NAVIGATION DU MENU
// ================================

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (menu) {
            menu.style.display = "none";
        }

        const accueil = document.getElementById("accueil");
        const apropos = document.getElementById("apropos");
        const contact = document.getElementById("contact");
        const pourquoi = document.getElementById("pourquoi");

        if (services) {
            services.style.display = "none";
        }

        if (apropos) {
            apropos.style.display = "none";
        }

        if (contact) {
            contact.style.display = "none";
        }

        if (pourquoi) {
            pourquoi.style.display = "none";
        }

        if (serviceButton) {
            serviceButton.style.display = "none";
        }

        const destination = link.getAttribute("href");


        // ================================
        // ACCUEIL
        // ================================

        if (destination === "#accueil") {

            afficherLogoAccueil();

            if (serviceButton) {
                serviceButton.style.display = "block";
                serviceButton.textContent = "Découvrir nos services";
            }

            if (accueil) {
                accueil.style.display = "block";

                accueil.scrollIntoView({
                    behavior: "smooth"
                });
            }

        }


        // ================================
        // SERVICES
        // ================================

        if (destination === "#services") {

            afficherLogoRetour();

            if (services) {
                services.style.display = "block";

                services.scrollIntoView({
                    behavior: "smooth"
                });
            }

        }


        // ================================
        // À PROPOS
        // ================================

        if (destination === "#apropos") {

            afficherLogoRetour();

            if (apropos) {
                apropos.style.display = "block";

                apropos.scrollIntoView({
                    behavior: "smooth"
                });
            }

        }


        // ================================
        // CONTACT
        // ================================

        if (destination === "#contact") {

            afficherLogoRetour();

            if (contact) {
                contact.style.display = "block";

                contact.scrollIntoView({
                    behavior: "smooth"
                });
            }

        }

    });

});


// ================================
// LOGO
// ================================

const logo = document.querySelector(".logo");

function afficherLogoAccueil() {

    if (logo) {
        logo.textContent = "ZAG SERVICE";
    }

}

function afficherLogoRetour() {

    if (logo) {
        logo.textContent = "⌂";
    }

}


if (logo) {

    logo.addEventListener("click", function () {

        if (menu) {
            menu.style.display = "none";
        }

        if (services) {
            services.style.display = "none";
        }

        const apropos = document.getElementById("apropos");
        const contact = document.getElementById("contact");
        const pourquoi = document.getElementById("pourquoi");
        const accueil = document.getElementById("accueil");

        if (apropos) {
            apropos.style.display = "none";
        }

        if (contact) {
            contact.style.display = "none";
        }

        if (pourquoi) {
            pourquoi.style.display = "none";
        }

        if (accueil) {
            accueil.style.display = "block";
        }

        if (serviceButton) {
            serviceButton.style.display = "block";
            serviceButton.textContent = "Découvrir nos services";
        }

        afficherLogoAccueil();

        if (accueil) {
            accueil.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

}


// ================================
// FORMULAIRE CONTACT
// ================================

const contactForm = document.getElementById("contactForm");

let dernierEnvoi = 0;

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        // ================================
        // ANTI-SPAM
        // ================================

        const maintenant = Date.now();

        if (maintenant - dernierEnvoi < 30000) {

            alert(
                "Veuillez patienter quelques secondes avant de renvoyer un message."
            );

            return;
        }


        // ================================
        // RÉCUPÉRATION DES CHAMPS
        // ================================

        const nom =
            document.getElementById("nom")?.value.trim() || "";

        const telephone =
            document.getElementById("telephone")?.value.trim() || "";

        const email =
            document.getElementById("email")?.value.trim() || "";

        const message =
            document.getElementById("message")?.value.trim() || "";


        // ================================
        // VALIDATION
        // ================================

        if (!nom) {
            alert("Veuillez entrer votre nom.");
            return;
        }

        if (!telephone) {
            alert("Veuillez entrer votre numéro de téléphone.");
            return;
        }

        if (!email) {
            alert("Veuillez entrer votre adresse email.");
            return;
        }

        if (!message) {
            alert("Veuillez écrire votre message.");
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


        // ================================
        // BOUTON ENVOI
        // ================================

        const submitButton =
            contactForm.querySelector(
                'button[type="submit"]'
            );

        const successMessage =
            document.getElementById("successMessage");


        if (submitButton) {
            submitButton.textContent = "Envoi en cours...";
            submitButton.disabled = true;
        }

        if (successMessage) {
            successMessage.textContent = "";
        }


        // ================================
        // ENVOI VERS SUPABASE
        // ================================

        try {

            const response = await fetch(
                "https://bkmhffpzhdhxrgxkinkk.supabase.co/functions/v1/swift-api",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        nom: nom,
                        telephone: telephone,
                        email: email,
                        message: message,
                        turnstileToken: turnstileToken
                    })
                }
            );


            const result = await response.json();


            if (!response.ok) {

                throw new Error(
                    result.error ||
                    "Erreur lors de l'envoi du message."
                );

            }


            if (successMessage) {

                successMessage.textContent =
                    "✓ Merci ! Votre message a bien été envoyé.";

            }


            contactForm.reset();

            dernierEnvoi = Date.now();


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

                submitButton.disabled = false;

            }

        }

    });

}// ================================
// BOUTONS "EN SAVOIR PLUS"
// ================================

function activerBoutonInfo(boutonId, infoId) {
    const bouton = document.getElementById(boutonId);
    const info = document.getElementById(infoId);

    if (bouton && info) {
        bouton.addEventListener("click", function () {

            if (info.style.display === "none" || info.style.display === "") {
                info.style.display = "block";
                bouton.textContent = "Masquer";
            } else {
                info.style.display = "none";
                bouton.textContent = "En savoir plus";
            }

        });
    }
}

activerBoutonInfo("eventButton", "eventInfo");
activerBoutonInfo("transportButton", "transportInfo");
activerBoutonInfo("immobilierButton", "immobilierInfo");