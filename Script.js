document.addEventListener("DOMContentLoaded", function () {

    console.log("ZAG SERVICE : JavaScript);
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


    // ==========================================
    // MENU ☰
    // ==========================================

    if (menuButton && menu) {

        menuButton.addEventListener("click", function () {

            const menuOuvert = menu.style.display === "flex";

            if (menuOuvert) {
                menu.style.display = "none";
            } else {
                menu.style.display = "flex";
            }

        });

    }


    // ==========================================
    // DÉCOUVRIR NOS SERVICES
    // ==========================================

    if (serviceButton && services) {

        serviceButton.addEventListener("click", function () {

            const servicesCaches =
                services.style.display === "none" ||
                services.style.display === "";

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
    // BOUTONS EN SAVOIR PLUS
    // ==========================================

    function activerBoutonInfo(buttonId, infoId) {

        const button = document.getElementById(buttonId);
        const info = document.getElementById(infoId);

        if (!button || !info) {

            console.warn(
                "Élément introuvable :",
                buttonId,
                infoId
            );

            return;
        }

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const cache =
                window.getComputedStyle(info).display === "none";

            if (cache) {

                info.style.display = "block";

                button.textContent = "Masquer";

            } else {

                info.style.display = "none";

                button.textContent = "En savoir plus";

            }

        });

    }


    activerBoutonInfo(
        "eventButton",
        "eventInfo"
    );

    activerBoutonInfo(
        "transportButton",
        "transportInfo"
    );

    activerBoutonInfo(
        "immobilierButton",
        "immobilierInfo"
    );


    // ==========================================
    // LOGO
    // ==========================================

    function afficherAccueil() {

        if (menu) {
            menu.style.display = "none";
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

        if (accueil) {
            accueil.style.display = "block";

            accueil.scrollIntoView({
                behavior: "smooth"
            });
        }

        if (serviceButton) {

            serviceButton.style.display = "block";

            serviceButton.textContent =
                "Découvrir nos services";

        }

        if (logo) {
            logo.textContent = "ZAG SERVICE";
        }

    }


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

            // Cacher les sections
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

            if (serviceButton) {
                serviceButton.style.display = "none";
            }


            // --------------------------------------
            // ACCUEIL
            // --------------------------------------

            if (destination === "#accueil") {

                afficherAccueil();

                return;
            }


            // --------------------------------------
            // SERVICES
            // --------------------------------------

            if (destination === "#services") {

                if (services) {

                    services.style.display = "block";

                    services.scrollIntoView({
                        behavior: "smooth"
                    });

                }

                if (logo) {
                    logo.textContent = "⌂";
                }

                return;
            }


            // --------------------------------------
            // À PROPOS
            // --------------------------------------

            if (destination === "#apropos") {

                if (apropos) {

                    apropos.style.display = "block";

                    apropos.scrollIntoView({
                        behavior: "smooth"
                    });

                }

                if (logo) {
                    logo.textContent = "⌂";
                }

                return;
            }


            // --------------------------------------
            // CONTACT
            // --------------------------------------

            if (destination === "#contact") {

                if (contact) {

                    contact.style.display = "block";

                    contact.scrollIntoView({
                        behavior: "smooth"
                    });

                }

                if (logo) {
                    logo.textContent = "⌂";
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

                const maintenant = Date.now();


                // Anti-spam
                if (
                    maintenant - dernierEnvoi < 30000 &&
                    dernierEnvoi !== 0
                ) {

                    alert(
                        "Veuillez patienter quelques secondes avant de renvoyer un message."
                    );

                    return;
                }


                const nom =
                    document.getElementById("nom")?.value.trim() || "";

                const telephone =
                    document.getElementById("telephone")?.value.trim() || "";

                const email =
                    document.getElementById("email")?.value.trim() || "";

                const message =
                    document.getElementById("message")?.value.trim() || "";


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

                    alert(
                        "Veuillez effectuer la vérification anti-robot."
                    );

                    return;
                }


                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );

                const successMessage =
                    document.getElementById(
                        "successMessage"
                    );


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        "Envoi en cours...";

                }


                try {

                    const response = await fetch(
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

                        submitButton.disabled = false;

                        submitButton.textContent =
                            "Envoyer le message";

                    }

                }

            }
        );

    }


    console.log(
        "ZAG SERVICE : tous les boutons sont initialisés"
    );

});