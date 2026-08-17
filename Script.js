/* =========================================
   ZAG SERVICE — SCRIPT PRINCIPAL
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       ELEMENTS PRINCIPAUX
    ===================================== */

    const menuButton = document.getElementById("menuButton");
    const menu = document.querySelector(".menu");
    const serviceButton = document.getElementById("serviceButton");
    const services = document.getElementById("services");
    const logo = document.getElementById("logo");
    const devis = document.getElementById("devis");
    const contact = document.getElementById("contact");


    /* =====================================
       MENU
    ===================================== */

    function openMenu() {
        if (!menu) return;

        menu.style.display = "flex";
        menu.setAttribute("aria-hidden", "false");

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "true");
        }
    }


    function closeMenu() {
        if (!menu) return;

        menu.style.display = "none";
        menu.setAttribute("aria-hidden", "true");

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
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

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.addEventListener("click", toggleMenu);

        menuButton.addEventListener("touchstart", function (event) {
            event.stopPropagation();
        }, { passive: true });
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

        /*
         * Petit verrou pour éviter que certains
         * navigateurs mobiles ne rouvrent le menu
         * pendant le mouvement.
         */
        clearTimeout(scrollTimer);

        scrollTimer = setTimeout(function () {
            closeMenu();
        }, 100);
    }


    window.addEventListener("scroll", closeMenuOnScroll, {
        passive: true
    });


    window.addEventListener("touchmove", closeMenuOnScroll, {
        passive: true
    });


    /* =====================================
       CLIC EN DEHORS DU MENU
       ===================================== */

    document.addEventListener("click", function (event) {

        if (!menu || !menuButton) return;

        const clickedInsideMenu =
            menu.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);

        if (!clickedInsideMenu && !clickedButton) {
            closeMenu();
        }
    });


    /* =====================================
       LIENS DU MENU
       ===================================== */

    if (menu) {

        const menuLinks =
            menu.querySelectorAll("a");

        menuLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                closeMenu();

                /*
                 * Petit délai pour laisser l'ancre
                 * effectuer son déplacement.
                 */
                setTimeout(function () {
                    closeMenu();
                }, 50);

            });

        });
    }


    /* =====================================
       DÉCOUVRIR NOS SERVICES
       ===================================== */

    if (serviceButton && services) {

        serviceButton.addEventListener("click", function () {

            closeMenu();

            services.style.display = "block";

            services.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });
    }


    /* =====================================
       LOGO → ACCUEIL
       ===================================== */

    if (logo) {

        logo.addEventListener("click", function () {

            closeMenu();

            const accueil =
                document.getElementById("accueil");

            if (accueil) {

                accueil.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        });
    }


    /* =====================================
       AFFICHAGE DES SERVICES
       ===================================== */

    function showServices() {

        if (!services) return;

        services.style.display = "block";
    }


    /*
     * Les liens #services du menu doivent afficher
     * la section même si elle était cachée au départ.
     */
    const servicesLinks =
        document.querySelectorAll('a[href="#services"]');

    servicesLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            showServices();

            setTimeout(function () {

                if (services) {

                    services.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }, 50);

        });

    });


    /* =====================================
       BOUTONS "EN SAVOIR PLUS"
       ===================================== */

    const infoButtons =
        document.querySelectorAll(".info-button");


    infoButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const infoId =
                button.getAttribute("data-info");

            if (!infoId) return;

            const info =
                document.getElementById(infoId);

            if (!info) return;

            const card =
                button.closest(".service-card");

            if (!card) return;

            const hideButton =
                card.querySelector(".hide-button");

            /*
             * Fermer les autres informations
             * avant d'ouvrir celle sélectionnée.
             */
            document.querySelectorAll(".service-info")
                .forEach(function (otherInfo) {

                    if (otherInfo !== info) {
                        otherInfo.style.display = "none";
                    }

                });


            document.querySelectorAll(".hide-button")
                .forEach(function (otherButton) {

                    if (otherButton !== hideButton) {
                        otherButton.style.display = "none";
                    }

                });


            info.style.display = "block";

            button.style.display = "none";

            if (hideButton) {
                hideButton.style.display = "block";

                /*
                 * Le bouton Masquer reste avec le contenu
                 * lorsque la carte s'allonge.
                 */
                hideButton.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }

        });

    });


    /* =====================================
       BOUTONS "MASQUER"
       ===================================== */

    const hideButtons =
        document.querySelectorAll(".hide-button");


    hideButtons.forEach(function (button) {

        button.addEventListener("click", function () {

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
                infoButton.style.display = "inline-block";
            }

        });

    });


    /* =====================================
       OUVRIR LE DEVIS
       ===================================== */

    const quoteButtons =
        document.querySelectorAll(".quote-button");


    quoteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const service =
                button.getAttribute("data-service");

            closeMenu();

            showServices();


            /*
             * Masquer les sections générales
             * si elles existent.
             */
            const accueil =
                document.getElementById("accueil");

            const pourquoi =
                document.getElementById("pourquoi");

            if (devis) {

                devis.style.display = "block";

            }


            /*
             * Afficher le service sélectionné
             * dans le titre du devis.
             */
            const serviceTitle =
                document.querySelector(".devis-service-title");

            if (serviceTitle && service) {

                serviceTitle.textContent =
                    "Demande de devis — " + service;

            }


            /*
             * Si un champ select "service" existe,
             * le sélectionner automatiquement.
             */
            const serviceSelect =
                document.querySelector(
                    'select[name="service"], #service'
                );

            if (serviceSelect && service) {

                const options =
                    Array.from(serviceSelect.options);

                const matchingOption =
                    options.find(function (option) {

                        return option.value === service ||
                               option.textContent.trim() === service;

                    });

                if (matchingOption) {

                    serviceSelect.value =
                        matchingOption.value;

                    serviceSelect.dispatchEvent(
                        new Event("change", {
                            bubbles: true
                        })
                    );
                }
            }


            /*
             * Défilement vers le devis.
             */
            if (devis) {

                setTimeout(function () {

                    devis.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 50);

            }

        });

    });


    /* =====================================
       BOUTONS "NOUS CONTACTER"
       ===================================== */

    const contactButtons =
        document.querySelectorAll(".contact-button");


    contactButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            closeMenu();

            if (!contact) return;

            contact.style.display = "block";

            contact.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================
       LIEN CONTACT DU MENU
       ===================================== */

    const contactLinks =
        document.querySelectorAll('a[href="#contact"]');

    contactLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (contact) {
                contact.style.display = "block";
            }

        });

    });


    /* =====================================
       LIEN À PROPOS
       ===================================== */

    const aboutLinks =
        document.querySelectorAll('a[href="#apropos"]');

    aboutLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const about =
                document.getElementById("apropos");

            if (about) {

                about.style.display = "block";

                setTimeout(function () {

                    about.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 50);

            }

        });

    });


    /* =====================================
       RETOUR À L'ACCUEIL
       ===================================== */

    const accueilLinks =
        document.querySelectorAll('a[href="#accueil"]');

    accueilLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            closeMenu();

            const accueil =
                document.getElementById("accueil");

            if (accueil) {

                accueil.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================
       ESCAPE → FERMER LE MENU
       ===================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================
       INITIALISATION
       ===================================== */

    closeMenu();

});