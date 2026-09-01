// =====================================================
// ZAG SERVICE — SERVEUR ADMIN
// =====================================================

const SUPABASE_URL =
    "https://bkmhffpzhdhxrgxkinkk.supabase.co";


// IMPORTANT :
// Mets ici LA MÊME CLÉ PUBLISHABLE
// que celle déjà présente dans www/Script.js.
//
// Ne mets PAS une service_role key.

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_UcQl5wt5aXwmcmwKpu3jnA_PcsD02TT";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


// =====================================================
// ELEMENTS
// =====================================================

const loginScreen =
    document.getElementById("loginScreen");

const dashboardScreen =
    document.getElementById("dashboardScreen");

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");

const logoutButton =
    document.getElementById("logoutButton");

const requestsContainer =
    document.getElementById("requestsContainer");

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");

const refreshButton =
    document.getElementById("refreshButton");

const detailModal =
    document.getElementById("detailModal");

const closeModal =
    document.getElementById("closeModal");

const detailStatus =
    document.getElementById("detailStatus");

const saveStatusButton =
    document.getElementById("saveStatusButton");

let demandes = [];

let demandeActuelle = null;


// =====================================================
// DEMARRAGE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    async function() {

        const {
            data: {
                session
            }
        } = await supabaseClient.auth.getSession();

        if (session) {

            const admin =
                await verifierAdmin(
                    session.user.id
                );

            if (admin) {

                ouvrirDashboard();

            } else {

                await supabaseClient.auth.signOut();

                afficherConnexion();
            }

        } else {

            afficherConnexion();

        }

    }
);


// =====================================================
// CONNEXION
// =====================================================

loginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        const email =
            document.getElementById(
                "adminEmail"
            ).value.trim();

        const password =
            document.getElementById(
                "adminPassword"
            ).value;

        loginMessage.textContent =
            "Connexion...";

        loginMessage.style.color =
            "#666";


        const {
            data,
            error
        } =
            await supabaseClient.auth
                .signInWithPassword({
                    email,
                    password
                });


        if (error) {

            console.error(error);

            loginMessage.textContent =
                "Email ou mot de passe incorrect.";

            loginMessage.style.color =
                "#b00020";

            return;
        }


        const admin =
            await verifierAdmin(
                data.user.id
            );


        if (!admin) {

            await supabaseClient.auth.signOut();

            loginMessage.textContent =
                "Accès administrateur refusé.";

            loginMessage.style.color =
                "#b00020";

            return;
        }


        loginMessage.textContent = "";

        ouvrirDashboard();

    }
);


// =====================================================
// VERIFICATION ADMIN
// =====================================================

async function verifierAdmin(userId) {

    const {
        data,
        error
    } =
        await supabaseClient
            .from("admin_profiles")
            .select("user_id")
            .eq("user_id", userId)
            .maybeSingle();


    if (error) {

        console.error(
            "Erreur admin :",
            error
        );

        return false;
    }


    return !!data;
}


// =====================================================
// CONNEXION
// =====================================================

function afficherConnexion() {

    loginScreen.style.display =
        "flex";

    dashboardScreen.style.display =
        "none";
}


// =====================================================
// DASHBOARD
// =====================================================

async function ouvrirDashboard() {

    loginScreen.style.display =
        "none";

    dashboardScreen.style.display =
        "block";

    await chargerDemandes();
}


// =====================================================
// CHARGER LES DEMANDES
// =====================================================

async function chargerDemandes() {

    requestsContainer.innerHTML =
        '<div class="loading">Chargement des demandes...</div>';


    const {
        data,
        error
    } =
        await supabaseClient
            .from("devis")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Erreur devis :",
            error
        );

        requestsContainer.innerHTML =
            '<div class="empty">Impossible de charger les demandes.</div>';

        return;
    }


    demandes =
        data || [];


    mettreAJourStatistiques();

    afficherDemandes();

}


// =====================================================
// STATISTIQUES
// =====================================================

function mettreAJourStatistiques() {

    const total =
        demandes.length;


    const nouveaux =
        demandes.filter(
            demande =>
                (demande.statut || "Nouveau")
                === "Nouveau"
        ).length;


    const enCours =
        demandes.filter(
            demande =>
                demande.statut === "En cours"
        ).length;


    const traites =
        demandes.filter(
            demande =>
                demande.statut === "Traité"
        ).length;


    document.getElementById(
        "totalCount"
    ).textContent = total;


    document.getElementById(
        "newCount"
    ).textContent = nouveaux;


    document.getElementById(
        "progressCount"
    ).textContent = enCours;


    document.getElementById(
        "doneCount"
    ).textContent = traites;
}


// =====================================================
// AFFICHER DEMANDES
// =====================================================

function afficherDemandes() {

    const recherche =
        searchInput.value
            .trim()
            .toLowerCase();


    const filtre =
        statusFilter.value;


    const resultat =
        demandes.filter(
            function(demande) {

                const statut =
                    demande.statut ||
                    "Nouveau";


                const texte = [
                    demande.nom,
                    demande.telephone,
                    demande.email,
                    demande.service,
                    demande.commune,
                    demande.budget,
                    demande.description
                ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


                const rechercheOK =
                    !recherche ||
                    texte.includes(recherche);


                const statutOK =
                    filtre === "Tous" ||
                    statut === filtre;


                return (
                    rechercheOK &&
                    statutOK
                );

            }
        );


    document.getElementById(
        "requestCount"
    ).textContent =
        resultat.length +
        (
            resultat.length > 1
                ? " demandes"
                : " demande"
        );


    if (!resultat.length) {

        requestsContainer.innerHTML =
            '<div class="empty">Aucune demande trouvée.</div>';

        return;
    }


    requestsContainer.innerHTML =
        resultat
            .map(creerCarte)
            .join("");


    requestsContainer
        .querySelectorAll(
            "[data-demande-id]"
        )
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        ouvrirDetails(
                            button.getAttribute(
                                "data-demande-id"
                            )
                        );

                    }
                );

            }
        );

}


// =====================================================
// CARTE
// =====================================================

function creerCarte(demande) {

    const statut =
        demande.statut ||
        "Nouveau";


    let classe =
        "status-nouveau";


    if (statut === "En cours") {
        classe = "status-en-cours";
    }


    if (statut === "Traité") {
        classe = "status-traite";
    }


    return `
        <article class="request-card">

            <div class="request-main">

                <strong>
                    ${echapper(
                        demande.nom ||
                        "Client"
                    )}
                </strong>

                <span>
                    ${echapper(
                        demande.telephone ||
                        "Téléphone non renseigné"
                    )}
                </span>

                <span>
                    ${formaterDate(
                        demande.created_at
                    )}
                </span>

            </div>


            <div class="request-info">

                <span>
                    Service
                </span>

                <strong>
                    ${echapper(
                        demande.service ||
                        "—"
                    )}
                </strong>

            </div>


            <div class="request-info">

                <span>
                    Commune
                </span>

                <strong>
                    ${echapper(
                        demande.commune ||
                        "—"
                    )}
                </strong>

                <span class="status ${classe}">
                    ${echapper(statut)}
                </span>

            </div>


            <button
                type="button"
                class="view-button"
                data-demande-id="${demande.id}"
            >
                Voir
            </button>

        </article>
    `;
}


// =====================================================
// DETAILS
// =====================================================

function ouvrirDetails(id) {

    demandeActuelle =
        demandes.find(
            demande =>
                String(demande.id) ===
                String(id)
        );


    if (!demandeActuelle) {
        return;
    }


    const demande =
        demandeActuelle;


    document.getElementById(
        "detailName"
    ).textContent =
        demande.nom || "Client";


    document.getElementById(
        "detailPhone"
    ).textContent =
        demande.telephone || "—";


    document.getElementById(
        "detailEmail"
    ).textContent =
        demande.email || "—";


    document.getElementById(
        "detailService"
    ).textContent =
        demande.service || "—";


    document.getElementById(
        "detailCommune"
    ).textContent =
        demande.commune || "—";


    document.getElementById(
        "detailDate"
    ).textContent =
        demande.date_souhaitee || "—";


    document.getElementById(
        "detailBudget"
    ).textContent =
        demande.budget || "—";


    document.getElementById(
        "detailDescription"
    ).textContent =
        demande.description || "—";


    detailStatus.value =
        demande.statut ||
        "Nouveau";


    document.getElementById(
        "callClient"
    ).href =
        demande.telephone
            ? "tel:" + demande.telephone
            : "#";


    document.getElementById(
        "emailClient"
    ).href =
        demande.email
            ? "mailto:" + demande.email
            : "#";


    document.getElementById(
        "detailMessage"
    ).textContent = "";


    detailModal.classList.add(
        "active"
    );
}


// =====================================================
// FERMER
// =====================================================

closeModal.addEventListener(
    "click",
    fermerDetails
);


document.querySelector(
    ".modal-background"
).addEventListener(
    "click",
    fermerDetails
);


function fermerDetails() {

    detailModal.classList.remove(
        "active"
    );

    demandeActuelle =
        null;
}


// =====================================================
// MODIFIER STATUT
// =====================================================

saveStatusButton.addEventListener(
    "click",
    async function() {

        if (!demandeActuelle) {
            return;
        }


        const nouveauStatut =
            detailStatus.value;


        saveStatusButton.disabled =
            true;

        saveStatusButton.textContent =
            "Enregistrement...";


        const {
            error
        } =
            await supabaseClient
                .from("devis")
                .update({
                    statut: nouveauStatut
                })
                .eq(
                    "id",
                    demandeActuelle.id
                );


        if (error) {

            console.error(error);

            document.getElementById(
                "detailMessage"
            ).textContent =
                "Erreur lors de l'enregistrement.";

            document.getElementById(
                "detailMessage"
            ).style.color =
                "#b00020";


            saveStatusButton.disabled =
                false;

            saveStatusButton.textContent =
                "Enregistrer";

            return;
        }


        document.getElementById(
            "detailMessage"
        ).textContent =
            "Statut enregistré.";

        document.getElementById(
            "detailMessage"
        ).style.color =
            "#16803c";


        demandeActuelle.statut =
            nouveauStatut;


        const index =
            demandes.findIndex(
                demande =>
                    demande.id ===
                    demandeActuelle.id
            );


        if (index !== -1) {

            demandes[index].statut =
                nouveauStatut;
        }


        mettreAJourStatistiques();

        afficherDemandes();


        saveStatusButton.disabled =
            false;

        saveStatusButton.textContent =
            "Enregistrer";

    }
);


// =====================================================
// RECHERCHE
// =====================================================

searchInput.addEventListener(
    "input",
    afficherDemandes
);


statusFilter.addEventListener(
    "change",
    afficherDemandes
);


// =====================================================
// ACTUALISER
// =====================================================

refreshButton.addEventListener(
    "click",
    chargerDemandes
);


// =====================================================
// DECONNEXION
// =====================================================

logoutButton.addEventListener(
    "click",
    async function() {

        await supabaseClient.auth.signOut();

        afficherConnexion();

        loginForm.reset();

    }
);


// =====================================================
// UTILITAIRES
// =====================================================

function formaterDate(value) {

    if (!value) {
        return "Date inconnue";
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return value;
    }


    return date.toLocaleString(
        "fr-FR",
        {
            dateStyle: "short",
            timeStyle: "short"
        }
    );
}


function echapper(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}
