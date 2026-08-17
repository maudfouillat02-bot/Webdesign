document.addEventListener("DOMContentLoaded", function () {

    console.log("ZAG SERVICE : JavaScript chargé");

    // ==========================================
    // ÉLÉMENTS PRINCIPAUX
    // ==========================================

    const menuButton = document.getElementById("menuButton");
    const menu = document.querySelector(".menu");

    const serviceButton = document.getElementById("serviceButton");
    const services = document.getElementById("services");

    const accueil = document.getElementById("accueil");
    const pourquoi = document.getElementById("pourquoi");
    const apropos = document.getElementById("apropos");
    const contact = document.getElementById("contact");
    const devis = document.getElementById("devis");

    const logo = document.getElementById("logo");


    // ==========================================
    // MENU
    // ==========================================

    function ouvrirMenu() {

        if (!menu) return;

        menu.classList.add("menu-open");

    }


    function fermerMenu() {

        if (!menu) return;

        menu.classList.remove("menu-open");

    }


    function menuOuvert() {

        return menu &&
               menu.classList.contains("menu-open");

    }


    if (menuButton && menu) {

        menuButton.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            if (menuOuvert()) {

                fermerMenu();

            } else {

                ouvrirMenu();

            }

        });

    }


    // ==========================================
    // FERMER EN CLIQUANT EN DEHORS
    // ==========================================

    document.addEventListener("click", function (event) {

        if (!menu || !menuButton) return;

        const clicMenu = menu.contains(event.target);
        const clicBouton = menuButton.contains(event.target);

        if (!clicMenu && !clicBouton) {

            fermerMenu();

        }

    });


    // ==========================================
    // FERMER AU DÉFILEMENT
    // ==========================================

    let dernierScroll = window.scrollY;

    window.addEventListener(
        "scroll",
        function () {

            const nouveauScroll = window.scrollY;

            if (nouveauScroll !== dernierScroll) {

                fermerMenu();

            }

            dernierScroll = nouveauScroll;

        },
        {
            passive: true
        }
    );


    // ==========================================
    // FERMER AVEC ESC
    // ==========================================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            fermerMenu();

        }

    });


    // ==========================================
    // FERMER APRÈS UN LIEN DU MENU
    // ==========================================

    const menuLinks =
        document.querySelectorAll(".menu a");

    menuLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            fermerMenu();

        });

    });


    // ==========================================
    // AFFICHER UNE SEULE SECTION
    // ==========================================

    function cacherSections() {

        if (accueil)
            accueil.style.display = "none";

        if (services)
            services.style.display = "none";

        if (pourquoi)
            pourquoi.style.display = "none";

        if (apropos)
            apropos.style.display = "none";

        if (contact)
            contact.style.display = "none";

        if (devis)
            devis.style.display = "none";

    }


    function afficherAccueil() {

        cacherSections();

        if (accueil)
            accueil.style.display = "block";

        if (pourquoi)
            pourquoi.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        fermerMenu();

    }


    // ==========================================
    // BOUTON DÉCOUVRIR NOS SERVICES
    // ==========================================

    if (serviceButton && services) {

        serviceButton.addEventListener(
            "click",
            function () {

                cacherSections();

                services.style.display = "block";

                services.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                fermerMenu();

            }
        );

    }


    // ==========================================
    // NAVIGATION DU MENU
    // ==========================================

    menuLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const destination =
                    link.getAttribute("href");

                fermerMenu();


                if (destination === "#accueil") {

                    afficherAccueil();

                    return;

                }


                if (destination === "#services") {

                    cacherSections();

                    if (services) {

                        services.style.display = "block";

                        services.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                    return;

                }


                if (destination === "#apropos") {

                    cacherSections();

                    if (apropos) {

                        apropos.style.display = "block";

                        apropos.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                    return;

                }


                if (destination === "#contact") {

                    cacherSections();

                    if (contact) {

                        contact.style.display = "block";

                        contact.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                    return;

                }

            }
        );

    });


    // ==========================================
    // LOGO = RETOUR ACCUEIL
    // ==========================================

    if (logo) {

        logo.addEventListener(
            "click",
            function () {

                afficherAccueil();

            }
        );

    }


    // ==========================================
    // BOUTONS "EN SAVOIR PLUS"
    // ==========================================

    const infoButtons =
        document.querySelectorAll(".info-button");


    infoButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const infoId =
                    button.getAttribute("data-info");

                const info =
                    document.getElementById(infoId);

                if (!info) return;

                const card =
                    button.closest(".service-card");

                const hideButton =
                    card
                    ? card.querySelector(".hide-button")
                    : null;


                info.style.display = "block";

                button.style.display = "none";

                if (hideButton) {

                    hideButton.style.display = "block";

                    // Le bouton Masquer descend avec
                    // le contenu affiché.
                    setTimeout(function () {

                        hideButton.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest"
                        });

                    }, 100);

                }

            }
        );

    });


    // ==========================================
    // BOUTONS "MASQUER"
    // ==========================================

    const hideButtons =
        document.querySelectorAll(".hide-button");


    hideButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const card =
                    button.closest(".service-card");

                if (!card) return;

                const info =
                    card.querySelector(".service-info");

                const infoButton =
                    card.querySelector(".info-button");


                if (info) {

                    info.style.display = "none";

                }

                button.style.display = "none";


                if (infoButton) {

                    infoButton.style.display =
                        "inline-block";

                }

            }
        );

    });


    // ==========================================
    // BOUTONS DEMANDER UN DEVIS
    // ==========================================

    const quoteButtons =
        document.querySelectorAll(".quote-button");


    quoteButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const service =
                    button.getAttribute("data-service");

                ouvrirDevis(service);

            }
        );

    });


    // ==========================================
    // OUVRIR LE DEVIS
    // ==========================================

    function ouvrirDevis(service) {

        cacherSections();

        if (!devis) return;

        devis.style.display = "block";

        const titre =
            document.getElementById("devisServiceTitle");

        if (titre) {

            titre.textContent =
                "Demande de devis — " + service;

        }


        const champService =
            document.getElementById("devisService");

        if (champService) {

            champService.value = service;

        }


        devis.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    // ==========================================
    // BOUTONS NOUS CONTACTER
    // ==========================================

    const contactButtons =
        document.querySelectorAll(".contact-button");


    contactButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                cacherSections();

                if (contact) {

                    contact.style.display = "block";

                    contact.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


    // ==========================================
    // RETOUR DEPUIS LE DEVIS
    // ==========================================

    const backButton =
        document.querySelector(".back-button");


    if (backButton) {

        backButton.addEventListener(
            "click",
            function () {

                cacherSections();

                if (services) {

                    services.style.display = "block";

                    services.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    // ==========================================
    // INITIALISATION
    // ==========================================

    fermerMenu();

    console.log(
        "ZAG SERVICE : système initialisé correctement"
    );

});