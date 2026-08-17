document.addEventListener("DOMContentLoaded", function () {

    console.log("ZAG SERVICE : JavaScript chargé");

    // ==========================================
    // ÉLÉMENTS
    // ==========================================

    const menuButton = document.getElementById("menuButton");
    const menu = document.querySelector(".menu");

    const serviceButton = document.getElementById("serviceButton");
    const services = document.getElementById("services");

    const logo = document.querySelector(".logo");

    const accueil = document.getElementById("accueil");
    const apropos = document.getElementById("apropos");
    const contact = document.getElementById("contact");
    const pourquoi = document.getElementById("pourquoi");
    const devis = document.getElementById("devis");


    // ==========================================
    // MENU ☰
    // ==========================================

    if (menuButton && menu) {

        menuButton.addEventListener("click", function (event) {

            event.stopPropagation();

            const menuOuvert =
                window.getComputedStyle(menu).display === "flex";

            if (menuOuvert) {
                menu.style.display = "none";
            } else {
                menu.style.display = "flex";
            }

        });

    }


    // ==========================================
    // FERMER LE MENU AU DÉFILEMENT
    // ==========================================

    window.addEventListener("scroll", function () {

        if (menu && window.getComputedStyle(menu).display === "flex") {
            menu.style.display = "none";
        }

    });


    // ==========================================
    // FERMER LE MENU SI ON CLIQUE AILLEURS
    // ==========================================

    document.addEventListener("click", function (event) {

        if (!menu || !menuButton) {
            return;
        }

        const menuOuvert =
            window.getComputedStyle(menu).display === "flex";

        if (
            menuOuvert &&
            !menu.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            menu.style.display = "none";

        }

    });


    // ==========================================
    // DÉCOUVRIR NOS SERVICES
    // ==========================================

    if (serviceButton && services) {

        serviceButton.addEventListener("click", function () {

            const servicesCaches =
                window.getComputedStyle(services).display === "none";

            if (servicesCaches) {

                services.style.display = "block";

                serviceButton.textContent =
                    "Masquer les services";

                setTimeout(function () {

                    services.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 50);

            } else {

                services.style.display = "none";

                serviceButton.textContent =
                    "Découvrir nos services";

            }

        });

    }


    // ==========================================
    // BOUTONS "EN SAVOIR PLUS"
    // ==========================================

    const infoButtons =
        document.querySelectorAll(".info-button");


    infoButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const infoId =
                button.getAttribute("data-info");

            const info =
                document.getElementById(infoId);

            if (!info) {
                console.warn(
                    "Information introuvable :",
                    infoId
                );
                return;
            }

            const card =
                button.closest(".service-card");

            const hideButton =
                card
                    ? card.querySelector(".hide-button")
                    : null;


            const infoCachee =
                window.getComputedStyle(info).display === "none";


            if (infoCachee) {

                // Afficher les informations
                info.style.display = "block";

                button.textContent = "Masquer";

                if (hideButton) {
                    hideButton.style.display = "block";
                }

                // Faire descendre légèrement l'écran
                setTimeout(function () {

                    if (hideButton) {

                        hideButton.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }

                }, 100);

            } else {

                // Masquer les informations
                info.style.display = "none";

                button.textContent =
                    "En savoir plus";

                if (hideButton) {
                    hideButton.style.display = "none";
                }

            }

        });

    });


    // ==========================================
    // BOUTONS "MASQUER"
    // ==========================================

    const hideButtons =
        document.querySelectorAll(".hide-button");


    hideButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const card =
                button.closest(".service-card");

            if (!card) {
                return;
            }

            const info =
                card.querySelector(".service-info");

            const infoButton =
                card.querySelector(".info-button");


            if (info) {
                info.style.display = "none";
            }

            if (infoButton) {
                infoButton.textContent =
                    "En savoir plus";
            }

            button.style.display = "none";


            // Revenir vers le haut de la carte
            setTimeout(function () {

                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 50);

        });

    });


    // ==========================================
    // BOUTONS "DEMANDER UN DEVIS"
    // ==========================================

    const quoteButtons =
        document.querySelectorAll(".quote-button");


    quoteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const service =
                button.getAttribute("data-service") || "";

            // Ouvrir la section devis
            if (devis) {

                masquerToutesLesSections();

                devis.style.display = "block";

                devis.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }


            // Sélectionner automatiquement le service
            const typeService =
                document.getElementById("typeService");

            if (typeService && service) {

                const options =
                    Array.from(typeService.options);

                const option =
                    options.find(function (option) {

                        return option.value === service ||
                               option.textContent.trim() === service;

                    });

                if (option) {
                    typeService.value = option.value;
                }

            }

        });

    });


    // ==========================================
    // BOUTONS "NOUS CONTACTER"
    // ==========================================

    const contactButtons =
        document.querySelectorAll(".contact-button");


    contactButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            masquerToutesLesSections();

            if (contact) {

                contact.style.display = "block";

                contact.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ==========================================
    // FONCTION : MASQUER LES SECTIONS
    // ==========================================

    function masquerToutesLesSections() {

        if (accueil) {
            accueil.style.display = "none";
        }

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

        if (devis) {
            devis.style.display = "none";
        }

        if (serviceButton) {
            serviceButton.style.display = "none";
        }

        if (menu) {
            menu.style.display = "none";
        }

    }


    // ==========================================
    // ACCUEIL
    // ==========================================

    function afficherAccueil() {

        if (menu) {
            menu.style.display = "none";
        }

        if (accueil) {
            accueil.style.display = "block";
        }

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
            pourquoi.style.display = "block";
        }

        if (devis) {
            devis.style.display = "none";
        }

        if (serviceButton) {

            serviceButton.style.display = "inline-block";

            serviceButton.textContent =
                "Découvrir nos services";

        }

        if (logo) {
            logo.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    }


    // ==========================================
    // CLIC SUR LE LOGO
    // ==========================================

    if (logo) {

        logo.addEventListener("click", function () {

            afficherAccueil();

        });

    }


    // ==========================================
    // NAVIGATION DU MENU
    // ==========================================

    const menuLinks =
        document.querySelectorAll(".menu a");


    menuLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const destination =
                link.getAttribute("href");


            // Fermer le menu
            if (menu) {
                menu.style.display = "none";
            }


            // ======================================
            // ACCUEIL
            // ======================================

            if (destination === "#accueil") {

                afficherAccueil();

                return;

            }


            // ======================================
            // SERVICES
            // ======================================

            if (destination === "#services") {

                masquerToutesLesSections();

                if (services) {

                    services.style.display = "block";

                    services.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

                return;

            }


            // ======================================
            // À PROPOS
            // ======================================

            if (destination === "#apropos") {

                masquerToutesLesSections();

                if (apropos) {

                    apropos.style.display = "block";

                    apropos.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

                return;

            }


            // ======================================
            // CONTACT
            // ======================================

            if (destination === "#contact") {

                masquerToutesLesSections();

                if (contact) {

                    contact.style.display = "block";

                    contact.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

                return;

            }


            // ======================================
            // DEVIS
            // ======================================

            if (destination === "#devis") {

                masquerToutesLesSections();

                if (devis) {

                    devis.style.display = "block";

                    devis.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

                return;

            }

        });

    });


    // ==========================================
    // FORMULAIRE CONTACT
    // ==========================================

    const contactForm =
        document.getElementById("contactForm");

    let dernierEnvoi = 0;


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const maintenant =
                    Date.now();


                // ==================================
                // ANTI-SPAM
                // ==================================

                if (
                    maintenant - dernierEnvoi < 30000 &&
                    dernierEnvoi !== 0
                ) {

                    const successMessage =
                        document.getElementById(
                            "successMessage"
                        );

                    if (successMessage) {

                        successMessage.textContent =
                            "Veuillez patienter avant de renvoyer un message.";

                    }

                    return;

                }


                // ==================================
                // RÉCUPÉRATION DES DONNÉES
                // ==================================

                const nom =
                    document.getElementById("nom")?.value.trim() || "";

                const telephone =
                    document.getElementById("telephone")?.value.trim() || "";

                const email =
                    document.getElementById("email")?.value.trim() || "";

                const message =
                    document.getElementById("message")?.value.trim() || "";


                const successMessage =
                    document.getElementById(
                        "successMessage"
                    );


                // ==================================
                // VALIDATION
                // ==================================

                if (!nom) {

                    afficherErreur(
                        "Veuillez entrer votre nom."
                    );

                    return;

                }


                if (!telephone) {

                    afficherErreur(
                        "Veuillez entrer votre numéro de téléphone."
                    );

                    return;

                }


                if (!email) {

                    afficherErreur(
                        "Veuillez entrer votre adresse email."
                    );

                    return;

                }


                if (!message) {

                    afficherErreur(
                        "Veuillez écrire votre message."
                    );

                    return;

                }


                if (message.length < 10) {

                    afficherErreur(
                        "Votre message doit contenir au moins 10 caractères."
                    );

                    return;

                }


                // ==================================
                // TURNSTILE
                // ==================================

                let turnstileToken = "";


                if (window.turnstile) {

                    try {

                        turnstileToken =
                            window.turnstile.getResponse();

                    } catch (error) {

                        console.error(
                            "Erreur Turnstile :",
                            error
                        );

                    }

                }


                if (!turnstileToken) {

                    afficherErreur(
                        "Veuillez effectuer la vérification anti-robot."
                    );

                    return;

                }


                // ==================================
                // BOUTON ENVOI
                // ==================================

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        "Envoi en cours...";

                }


                // ==================================
                // ENVOI
                // ==================================

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

                                body: JSON.stringify({

                                    nom: nom,

                                    telephone: telephone,

                                    email: email,

                                    message: message,

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
                            "Erreur lors de l'envoi du message."
                        );

                    }


                    // ==================================
                    // SUCCÈS
                    // ==================================

                    if (successMessage) {

                        successMessage.textContent =
                            "✓ Merci ! Votre message a bien été envoyé.";

                    }


                    contactForm.reset();

                    dernierEnvoi =
                        Date.now();


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

                        submitButton.disabled = false;

                        submitButton.textContent =
                            "Envoyer le message";

                    }

                }

            }
        );

    }


    // ==========================================
    // MESSAGE D'ERREUR SANS ALERT
    // ==========================================

    function afficherErreur(message) {

        const successMessage =
            document.getElementById(
                "successMessage"
            );

        if (successMessage) {

            successMessage.textContent =
                message;

        }

    }


    // ==========================================
    // FORMULAIRE DEVIS
    // ==========================================

    const devisForm =
        document.getElementById("devisForm");


    if (devisForm) {

        devisForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                console.log(
                    "Formulaire devis soumis"
                );

            }
        );

    }


    // ==========================================
    // INITIALISATION
    // ==========================================

    console.log(
        "ZAG SERVICE : tous les boutons sont initialisés"
    );

});