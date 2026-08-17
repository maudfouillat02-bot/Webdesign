/* =========================================
   ZAG SERVICE — SCRIPT PRINCIPAL
   VERSION AVEC ENVOI RÉEL DES DEMANDES
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       CONFIGURATION SUPABASE
    ===================================== */

    /*
     * IMPORTANT :
     * Remplace TON_PROJECT_ID par l'identifiant
     * de ton projet Supabase.
     *
     * Exemple :
     * https://abcxyz.supabase.co
     *
     * devient :
     * https://abcxyz.supabase.co/functions/v1/submit-demande
     */

    const SUPABASE_FUNCTION_URL =
        "https://bkmhffpzhdhxrgxkinkk.supabase.co/functions/v1/submit-demande";

    const SUPABASE_PUBLISHABLE_KEY =
        "sb_publishable_UcQl5wt5aXwmcmwKpu3jnA_PcsD02TT";


    /* =====================================
       ELEMENTS PRINCIPAUX
    ===================================== */

    const menuButton =
        document.getElementById("menuButton");

    const menu =
        document.querySelector(".menu");

    const serviceButton =
        document.getElementById("serviceButton");

    const services =
        document.getElementById("services");

    const logo =
        document.getElementById("logo");

    const devis =
        document.getElementById("devis");

    const contact =
        document.getElementById("contact");


    /* =====================================
       MENU
    ===================================== */

    function openMenu() {

        if (!menu) return;

        menu.style.display = "flex";

        menu.setAttribute(
            "aria-hidden",
            "false"
        );

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );
        }
    }


    function closeMenu() {

        if (!menu) return;

        menu.style.display = "none";

        menu.setAttribute(
            "aria-hidden",
            "true"
        );

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }


    function toggleMenu(event) {

        if (event) {
            event.stopPropagation();
        }

        if (!menu) return;

        const isOpen =
            window.getComputedStyle(menu).display !== "none";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }


    if (menuButton) {

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.addEventListener(
            "click",
            toggleMenu
        );

        menuButton.addEventListener(
            "touchstart",
            function (event) {

                event.stopPropagation();

            },
            {
                passive: true
            }
        );
    }


    /* =====================================
       FERMETURE DU MENU AU DÉFILEMENT
    ===================================== */

    let scrollTimer = null;


    function closeMenuOnScroll() {

        if (!menu) return;

        const isOpen =
            window.getComputedStyle(menu).display !== "none";

        if (!isOpen) return;

        closeMenu();

        clearTimeout(scrollTimer);

        scrollTimer = setTimeout(
            function () {
                closeMenu();
            },
            100
        );
    }


    window.addEventListener(
        "scroll",
        closeMenuOnScroll,
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchmove",
        closeMenuOnScroll,
        {
            passive: true
        }
    );


    /* =====================================
       CLIC EN DEHORS DU MENU
    ===================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (!menu || !menuButton) {
                return;
            }

            const clickedInsideMenu =
                menu.contains(event.target);

            const clickedButton =
                menuButton.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedButton
            ) {
                closeMenu();
            }
        }
    );


    /* =====================================
       LIENS DU MENU
    ===================================== */

    if (menu) {

        const menuLinks =
            menu.querySelectorAll("a");

        menuLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeMenu();

                        setTimeout(
                            function () {
                                closeMenu();
                            },
                            50
                        );

                    }
                );

            }
        );
    }


    /* =====================================
       DÉCOUVRIR NOS SERVICES
    ===================================== */

    if (
        serviceButton &&
        services
    ) {

        serviceButton.addEventListener(
            "click",
            function () {

                closeMenu();

                services.style.display =
                    "block";

                services.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );
    }


    /* =====================================
       LOGO → HOME / RÉINITIALISATION
    ===================================== */

    if (logo) {

        logo.addEventListener(
            "click",
            function () {

                closeMenu();


                /* Fermer les informations */

                document
                    .querySelectorAll(".service-info")
                    .forEach(
                        function (info) {

                            info.style.display =
                                "none";

                        }
                    );


                /* Réafficher les boutons */

                document
                    .querySelectorAll(".info-button")
                    .forEach(
                        function (button) {

                            button.style.display =
                                "inline-block";

                        }
                    );


                /* Masquer les boutons Masquer */

                document
                    .querySelectorAll(".hide-button")
                    .forEach(
                        function (button) {

                            button.style.display =
                                "none";

                        }
                    );


                /* Fermer le devis */

                if (devis) {
                    devis.style.display =
                        "none";
                }


                /* Fermer le contact */

                if (contact) {
                    contact.style.display =
                        "none";
                }


                /* Masquer les services */

                if (services) {
                    services.style.display =
                        "none";
                }


                /* Réinitialiser le devis */

                const devisForm =
                    devis
                        ? devis.querySelector("form")
                        : null;


                if (devisForm) {

                    devisForm.reset();

                    resetTurnstile(
                        devisForm
                    );
                }


                /* Réinitialiser contact */

                const contactForm =
                    contact
                        ? contact.querySelector("form")
                        : null;


                if (contactForm) {

                    contactForm.reset();

                    resetTurnstile(
                        contactForm
                    );
                }


                /* Réinitialiser le titre */

                const serviceTitle =
                    document.querySelector(
                        ".devis-service-title"
                    );


                if (serviceTitle) {

                    serviceTitle.textContent =
                        "";
                }


                /* Retour accueil */

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    /* =====================================
       AFFICHAGE DES SERVICES
    ===================================== */

    function showServices() {

        if (!services) return;

        services.style.display =
            "block";
    }


    const servicesLinks =
        document.querySelectorAll(
            'a[href="#services"]'
        );


    servicesLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    showServices();

                    setTimeout(
                        function () {

                            if (services) {

                                services.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });

                            }

                        },
                        50
                    );

                }
            );

        }
    );


    /* =====================================
       BOUTONS "EN SAVOIR PLUS"
    ===================================== */

    const infoButtons =
        document.querySelectorAll(
            ".info-button"
        );


    infoButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const infoId =
                        button.getAttribute(
                            "data-info"
                        );

                    if (!infoId) return;

                    const info =
                        document.getElementById(
                            infoId
                        );

                    if (!info) return;

                    const card =
                        button.closest(
                            ".service-card"
                        );

                    if (!card) return;

                    const hideButton =
                        card.querySelector(
                            ".hide-button"
                        );


                    document
                        .querySelectorAll(
                            ".service-info"
                        )
                        .forEach(
                            function (otherInfo) {

                                if (
                                    otherInfo !== info
                                ) {

                                    otherInfo.style.display =
                                        "none";

                                }

                            }
                        );


                    document
                        .querySelectorAll(
                            ".hide-button"
                        )
                        .forEach(
                            function (otherButton) {

                                if (
                                    otherButton !== hideButton
                                ) {

                                    otherButton.style.display =
                                        "none";

                                }

                            }
                        );


                    info.style.display =
                        "block";

                    button.style.display =
                        "none";


                    if (hideButton) {

                        hideButton.style.display =
                            "block";

                        hideButton.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest"
                        });
                    }

                }
            );

        }
    );


    /* =====================================
       BOUTONS "MASQUER"
    ===================================== */

    const hideButtons =
        document.querySelectorAll(
            ".hide-button"
        );


    hideButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        button.closest(
                            ".service-card"
                        );

                    if (!card) return;

                    const info =
                        card.querySelector(
                            ".service-info"
                        );

                    const infoButton =
                        card.querySelector(
                            ".info-button"
                        );


                    if (info) {

                        info.style.display =
                            "none";
                    }


                    button.style.display =
                        "none";


                    if (infoButton) {

                        infoButton.style.display =
                            "inline-block";
                    }

                }
            );

        }
    );


    /* =====================================
       OUVRIR LE DEVIS
    ===================================== */

    const quoteButtons =
        document.querySelectorAll(
            ".quote-button"
        );


    quoteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const service =
                        button.getAttribute(
                            "data-service"
                        );

                    closeMenu();

                    showServices();


                    if (devis) {

                        devis.style.display =
                            "block";
                    }


                    const serviceTitle =
                        document.querySelector(
                            ".devis-service-title"
                        );


                    if (
                        serviceTitle &&
                        service
                    ) {

                        serviceTitle.textContent =
                            "Demande de devis — " +
                            service;
                    }


                    const serviceSelect =
                        document.querySelector(
                            'select[name="service"], #service'
                        );


                    if (
                        serviceSelect &&
                        service
                    ) {

                        const options =
                            Array.from(
                                serviceSelect.options
                            );


                        const matchingOption =
                            options.find(
                                function (option) {

                                    return (
                                        option.value ===
                                            service ||

                                        option.textContent.trim() ===
                                            service
                                    );

                                }
                            );


                        if (matchingOption) {

                            serviceSelect.value =
                                matchingOption.value;

                            serviceSelect.dispatchEvent(
                                new Event(
                                    "change",
                                    {
                                        bubbles: true
                                    }
                                )
                            );
                        }
                    }


                    if (devis) {

                        setTimeout(
                            function () {

                                devis.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });

                            },
                            50
                        );

                    }

                }
            );

        }
    );


    /* =====================================
       BOUTONS "NOUS CONTACTER"
    ===================================== */

    const contactButtons =
        document.querySelectorAll(
            ".contact-button"
        );


    contactButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    closeMenu();

                    if (!contact) return;

                    contact.style.display =
                        "block";

                    contact.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


    /* =====================================
       LIEN CONTACT DU MENU
    ===================================== */

    const contactLinks =
        document.querySelectorAll(
            'a[href="#contact"]'
        );


    contactLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (contact) {

                        contact.style.display =
                            "block";
                    }

                }
            );

        }
    );


    /* =====================================
       LIEN À PROPOS
    ===================================== */

    const aboutLinks =
        document.querySelectorAll(
            'a[href="#apropos"]'
        );


    aboutLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    const about =
                        document.getElementById(
                            "apropos"
                        );


                    if (about) {

                        about.style.display =
                            "block";


                        setTimeout(
                            function () {

                                about.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });

                            },
                            50
                        );

                    }

                }
            );

        }
    );


    /* =====================================
       RETOUR À L'ACCUEIL
    ===================================== */

    const accueilLinks =
        document.querySelectorAll(
            'a[href="#accueil"]'
        );


    accueilLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMenu();

                    const accueil =
                        document.getElementById(
                            "accueil"
                        );


                    if (accueil) {

                        accueil.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );


    /* =====================================
       ESCAPE → FERMER LE MENU
    ===================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    /* =====================================
       OUTILS TURNSTILE
    ===================================== */

    function getTurnstileToken(form) {

        if (!form) {
            return null;
        }


        /*
         * Turnstile place généralement son token
         * dans un champ caché :
         *
         * cf-turnstile-response
         */

        const tokenInput =
            form.querySelector(
                'input[name="cf-turnstile-response"]'
            );


        if (
            tokenInput &&
            tokenInput.value
        ) {

            return tokenInput.value;
        }


        /*
         * Deuxième possibilité :
         * le champ peut être ajouté au document.
         */

        const globalTokenInput =
            document.querySelector(
                'input[name="cf-turnstile-response"]'
            );


        if (
            globalTokenInput &&
            globalTokenInput.value
        ) {

            return globalTokenInput.value;
        }


        return null;
    }


    function resetTurnstile(form) {

        try {

            if (
                window.turnstile &&
                typeof window.turnstile.reset ===
                    "function"
            ) {

                const widget =
                    form
                        ? form.querySelector(
                            ".cf-turnstile"
                        )
                        : null;


                if (widget) {

                    const widgetId =
                        widget.getAttribute(
                            "data-widget-id"
                        );


                    if (widgetId) {

                        window.turnstile.reset(
                            widgetId
                        );

                    } else {

                        /*
                         * Si aucun ID n'est disponible,
                         * on réinitialise les widgets connus.
                         */

                        window.turnstile.reset();

                    }

                } else {

                    window.turnstile.reset();

                }

            }

        } catch (error) {

            console.warn(
                "Impossible de réinitialiser Turnstile.",
                error
            );
        }
    }


    /* =====================================
       MESSAGE FORMULAIRE
    ===================================== */

    function showFormMessage(
        form,
        message,
        success
    ) {

        if (!form) return;


        let messageElement =
            form.querySelector(
                ".form-response-message"
            );


        if (!messageElement) {

            messageElement =
                document.createElement(
                    "div"
                );

            messageElement.className =
                "form-response-message";

            messageElement.style.marginTop =
                "15px";

            messageElement.style.padding =
                "12px";

            messageElement.style.borderRadius =
                "8px";

            messageElement.style.textAlign =
                "center";

            form.appendChild(
                messageElement
            );
        }


        messageElement.textContent =
            message;


        messageElement.style.background =
            success
                ? "#E8F5E9"
                : "#FDECEC";


        messageElement.style.color =
            success
                ? "#1B5E20"
                : "#B71C1C";


        messageElement.style.display =
            "block";
    }


    /* =====================================
       RÉCUPÉRATION D'UNE VALEUR
    ===================================== */

    function getFieldValue(
        form,
        selectors
    ) {

        if (!form) return null;


        for (
            let i = 0;
            i < selectors.length;
            i++
        ) {

            const field =
                form.querySelector(
                    selectors[i]
                );


            if (field) {

                if (
                    field.type ===
                        "checkbox"
                ) {

                    return field.checked
                        ? field.value || "Oui"
                        : null;
                }


                return field.value
                    ? field.value.trim()
                    : null;
            }
        }


        return null;
    }


    /* =====================================
       CONVERSION DES DONNÉES DU FORMULAIRE
    ===================================== */

    function buildRequestData(
        form,
        typeDemande
    ) {

        const service =
            getFieldValue(
                form,
                [
                    'select[name="service"]',
                    '[name="service"]',
                    "#service"
                ]
            ) || "Autre";


        const data = {

            type_demande:
                typeDemande,

            service:
                service,

            nom:
                getFieldValue(
                    form,
                    [
                        '[name="nom"]',
                        '[name="name"]',
                        "#nom"
                    ]
                ),

            telephone:
                getFieldValue(
                    form,
                    [
                        '[name="telephone"]',
                        '[name="phone"]',
                        '[name="tel"]',
                        "#telephone"
                    ]
                ),

            email:
                getFieldValue(
                    form,
                    [
                        '[name="email"]',
                        '[type="email"]',
                        "#email"
                    ]
                ),


            /* Événementiel */

            type_evenement:
                getFieldValue(
                    form,
                    [
                        '[name="type_evenement"]',
                        '[name="type-evenement"]'
                    ]
                ),

            nombre_participants:
                getFieldValue(
                    form,
                    [
                        '[name="nombre_participants"]',
                        '[name="participants"]'
                    ]
                ),

            lieu_evenement:
                getFieldValue(
                    form,
                    [
                        '[name="lieu_evenement"]',
                        '[name="lieu-evenement"]'
                    ]
                ),

            date_evenement:
                getFieldValue(
                    form,
                    [
                        '[name="date_evenement"]',
                        '[name="date-evenement"]'
                    ]
                ),


            /* Photographie */

            type_accompagnement:
                getFieldValue(
                    form,
                    [
                        '[name="type_accompagnement"]',
                        '[name="accompagnement"]'
                    ]
                ),

            duree_prestation:
                getFieldValue(
                    form,
                    [
                        '[name="duree_prestation"]',
                        '[name="duree"]'
                    ]
                ),

            lieu_prestation:
                getFieldValue(
                    form,
                    [
                        '[name="lieu_prestation"]',
                        '[name="lieu-photo"]'
                    ]
                ),

            date_prestation:
                getFieldValue(
                    form,
                    [
                        '[name="date_prestation"]',
                        '[name="date-photo"]'
                    ]
                ),


            /* Transport */

            type_transport:
                getFieldValue(
                    form,
                    [
                        '[name="type_transport"]',
                        '[name="transport"]'
                    ]
                ),

            trajet:
                getFieldValue(
                    form,
                    [
                        '[name="trajet"]',
                        '[name="itineraire"]'
                    ]
                ),

            nombre_personnes:
                getFieldValue(
                    form,
                    [
                        '[name="nombre_personnes"]',
                        '[name="personnes"]'
                    ]
                ),

            date_transport:
                getFieldValue(
                    form,
                    [
                        '[name="date_transport"]',
                        '[name="date-transport"]'
                    ]
                ),


            /* Immobilier */

            operation_immobiliere:
                getFieldValue(
                    form,
                    [
                        '[name="operation_immobiliere"]',
                        '[name="operation"]'
                    ]
                ),

            type_bien:
                getFieldValue(
                    form,
                    [
                        '[name="type_bien"]',
                        '[name="bien"]'
                    ]
                ),

            localisation:
                getFieldValue(
                    form,
                    [
                        '[name="localisation"]',
                        '[name="localisation-bien"]'
                    ]
                ),

            budget:
                getFieldValue(
                    form,
                    [
                        '[name="budget"]'
                    ]
                ),


            /* Message */

            message:
                getFieldValue(
                    form,
                    [
                        '[name="message"]',
                        '[name="description"]',
                        "textarea"
                    ]
                )
        };


        return data;
    }


    /* =====================================
       ENVOI RÉEL VERS SUPABASE
    ===================================== */

    async function sendRequest(
        form,
        typeDemande
    ) {

        if (!form) {
            return;
        }


        const submitButton =
            form.querySelector(
                'button[type="submit"], input[type="submit"]'
            );


        const originalText =
            submitButton
                ? submitButton.textContent
                : null;


        /* =========================
           TURNSTILE
        ========================= */

        const turnstileToken =
            getTurnstileToken(form);


        if (!turnstileToken) {

            showFormMessage(
                form,
                "Veuillez effectuer la vérification de sécurité avant d'envoyer votre demande.",
                false
            );

            return;
        }


        /* =========================
           DONNÉES
        ========================= */

        const data =
            buildRequestData(
                form,
                typeDemande
            );


        if (!data.nom) {

            showFormMessage(
                form,
                "Veuillez renseigner votre nom.",
                false
            );

            return;
        }


        if (!data.telephone) {

            showFormMessage(
                form,
                "Veuillez renseigner votre numéro de téléphone.",
                false
            );

            return;
        }


        if (!data.service) {

            data.service =
                "Autre";
        }


        data.turnstile_token =
            turnstileToken;


        /* =========================
           BOUTON ENVOI
        ========================= */

        if (submitButton) {

            submitButton.disabled =
                true;

            submitButton.style.opacity =
                "0.6";

            submitButton.style.cursor =
                "wait";

            submitButton.textContent =
                "Envoi en cours...";
        }


        showFormMessage(
            form,
            "Votre demande est en cours d'envoi...",
            true
        );


        try {

            /* =========================
               APPEL EDGE FUNCTION
            ========================= */

            const response =
                await fetch(
                    SUPABASE_FUNCTION_URL,
                    {
                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "apikey":
                                SUPABASE_PUBLISHABLE_KEY
                        },

                        body:
                            JSON.stringify(data)
                    }
                );


            let result = null;


            try {

                result =
                    await response.json();

            } catch (jsonError) {

                result = null;
            }


            /* =========================
               ERREUR SERVEUR
            ========================= */

            if (!response.ok) {

                console.error(
                    "Erreur Edge Function :",
                    result
                );


                throw new Error(
                    result &&
                    result.message
                        ? result.message
                        : "Le serveur n'a pas pu traiter votre demande."
                );
            }


            /* =========================
               SUCCÈS
            ========================= */

            if (
                result &&
                result.success
            ) {

                showFormMessage(
                    form,
                    result.message ||
                        "Votre demande a bien été envoyée. Merci pour votre confiance.",
                    true
                );


                /*
                 * Réinitialisation des champs
                 */

                form.reset();


                /*
                 * Réinitialisation Turnstile
                 */

                resetTurnstile(
                    form
                );


                /*
                 * Réinitialisation du titre
                 * du devis
                 */

                if (
                    typeDemande ===
                    "devis"
                ) {

                    const serviceTitle =
                        document.querySelector(
                            ".devis-service-title"
                        );


                    if (serviceTitle) {

                        serviceTitle.textContent =
                            "Votre demande a bien été envoyée";
                    }
                }


                return;
            }


            throw new Error(
                "La demande n'a pas pu être confirmée."
            );


        } catch (error) {

            console.error(
                "Erreur lors de l'envoi :",
                error
            );


            showFormMessage(
                form,
                error.message ||
                    "Une erreur est survenue. Veuillez réessayer.",
                false
            );


            resetTurnstile(
                form
            );


        } finally {

            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.style.opacity =
                    "1";

                submitButton.style.cursor =
                    "pointer";


                if (originalText !== null) {

                    submitButton.textContent =
                        originalText;

                } else {

                    submitButton.textContent =
                        "Envoyer";
                }
            }
        }
    }


    /* =====================================
       FORMULAIRE DE DEVIS
    ===================================== */

    const devisForm =
        devis
            ? devis.querySelector("form")
            : null;


    if (devisForm) {

        devisForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                sendRequest(
                    devisForm,
                    "devis"
                );

            }
        );
    }


    /* =====================================
       FORMULAIRE DE CONTACT
    ===================================== */

    const contactForm =
        contact
            ? contact.querySelector("form")
            : null;


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                sendRequest(
                    contactForm,
                    "contact"
                );

            }
        );
    }


    /* =====================================
       INITIALISATION
    ===================================== */

    closeMenu();

});