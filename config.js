// Configuration du formulaire d'inscription au Tennis Club de Pimprez

// Configuration par défaut
let config = {
    fields: {
        civilite: true,
        nom: true,
        prenom: true,
        date_naissance: true,
        nationalite: false, // Supprimé
        niveau: false, // Supprimé
        licence_fft: false, // Supprimé
        classement: false, // Supprimé
        competitions: true,
        adresse: true,
        code_postal: true,
        ville: true,
        tel_mobile: true,
        tel_fixe: false,
        email: true,
        commentaires: true
    },
    admin: {
        certificat_medical: false, // Supprimé
        reglement: false, // Supprimé
    },
    clubName: "Tennis Club de Pimprez",
    season: "2025-2026",
    headerColor: "#4CAF50",
    buttonColor: "#4CAF50"
};

// Structure pour gérer les inscriptions multiples
let famille = {
    membres: [],
    adresse: "",
    code_postal: "",
    ville: "",
    tel_mobile: "",
    tel_fixe: "",
    email: "",
    commentaires: "",
};

// Membre actif (celui en cours d'édition)
let membreActif = 0;

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Appliquer la configuration au formulaire
    applyFormConfig(config);
    
    // Initialiser le premier membre
    ajouterMembre();
    
    // Gérer l'ajout de membres
    document.getElementById('btn-add-member').addEventListener('click', function(e) {
        e.preventDefault();
        ajouterMembre();
    });
    
    // Gérer la navigation entre membres
    document.getElementById('btn-prev-member').addEventListener('click', function() {
        if (membreActif > 0) {
            sauvegarderDonneesMembre(membreActif);
            membreActif--;
            afficherDonneesMembre(membreActif);
            updateMemberNavigation();
        }
    });
    
    document.getElementById('btn-next-member').addEventListener('click', function() {
        if (membreActif < famille.membres.length - 1) {
            sauvegarderDonneesMembre(membreActif);
            membreActif++;
            afficherDonneesMembre(membreActif);
            updateMemberNavigation();
        }
    });
    
    // Gérer la suppression d'un membre
    document.getElementById('btn-delete-member').addEventListener('click', function() {
        if (famille.membres.length <= 1) {
            alert("Impossible de supprimer ce membre. Il doit y avoir au moins un membre dans le formulaire.");
            return;
        }
        
        if (confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
            famille.membres.splice(membreActif, 1);
            if (membreActif >= famille.membres.length) {
                membreActif = famille.membres.length - 1;
            }
            afficherDonneesMembre(membreActif);
            updateMemberNavigation();
            document.getElementById('membre-count').textContent = membreActif + 1;
            document.getElementById('membre-total').textContent = famille.membres.length;
        }
    });
    
    // Gérer l'affichage des champs pour mineurs
    document.getElementById('date_naissance').addEventListener('change', function() {
        verifierAge();
    });
    
    // Gérer la soumission du formulaire
    document.getElementById('inscriptionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        sauvegarderDonneesMembre(membreActif);
        
        famille.adresse = document.getElementById('adresse').value;
        famille.code_postal = document.getElementById('code_postal').value;
        famille.ville = document.getElementById('ville').value;
        famille.tel_mobile = document.getElementById('tel_mobile').value;
        famille.tel_fixe = document.getElementById('tel_fixe').value;
        famille.email = document.getElementById('email').value;
        famille.commentaires = document.getElementById('commentaires').value;
        
        const jsonData = JSON.stringify(famille);
        
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'famille_data';
        hiddenInput.value = jsonData;
        
        this.appendChild(hiddenInput);
        
        const confirmationMessage = document.getElementById('confirmation-message');
        const inscriptionForm = document.getElementById('inscriptionForm');
        
        // Utiliser setTimeout pour permettre au DOM de se mettre à jour avant la soumission
        setTimeout(() => {
            this.submit();
            if (confirmationMessage) confirmationMessage.style.display = 'block';
            if (inscriptionForm) inscriptionForm.style.display = 'none';
            window.scrollTo(0, 0);
        }, 100);
    });
    
    // Gérer le bouton de nouvelle inscription
    document.getElementById('btn-new-inscription').addEventListener('click', function() {
        document.getElementById('inscriptionForm').reset();
        famille = {
            membres: [],
            adresse: "",
            code_postal: "",
            ville: "",
            tel_mobile: "",
            tel_fixe: "",
            email: "",
            commentaires: "",
        };
        membreActif = 0;
        ajouterMembre();
        document.getElementById('confirmation-message').style.display = 'none';
        document.getElementById('inscriptionForm').style.display = 'block';
    });
});

// Appliquer la configuration au formulaire
function applyFormConfig(config) {
    document.documentElement.style.setProperty('--header-color', config.headerColor);
    document.documentElement.style.setProperty('--button-color', config.buttonColor);
    
    const clubNameElement = document.getElementById('club-name');
    if (clubNameElement) {
        clubNameElement.textContent = config.clubName;
    }
    
    const seasonElement = document.getElementById('season');
    if (seasonElement) {
        seasonElement.textContent = config.season;
    }
    
    for (const [field, visible] of Object.entries(config.fields)) {
        const fieldContainer = document.getElementById(`container-${field}`);
        if (fieldContainer) {
            fieldContainer.style.display = visible ? 'block' : 'none';
        }
    }
}

// Ajouter un nouveau membre
function ajouterMembre() {
    if (famille.membres.length > 0) {
        sauvegarderDonneesMembre(membreActif);
    }
    
    const nouveauMembre = {
        civilite: "",
        nom: "",
        prenom: "",
        date_naissance: "",
        est_mineur: false,
        parent_nom: "",
        parent_prenom: "",
        parent_tel: "",
        parent_email: "",
        competitions: false,
    };
    
    famille.membres.push(nouveauMembre);
    membreActif = famille.membres.length - 1;
    document.getElementById('inscriptionForm').reset();
    updateMemberNavigation();
    document.getElementById('membre-count').textContent = membreActif + 1;
    document.getElementById('membre-total').textContent = famille.membres.length;
    document.getElementById('member-navigation').style.display = 'block';
}

// Sauvegarder les données du membre actif
function sauvegarderDonneesMembre(index) {
    if (index >= 0 && index < famille.membres.length) {
        const membre = famille.membres[index];
        
        membre.civilite = document.getElementById('civilite').value;
        membre.nom = document.getElementById('nom').value;
        membre.prenom = document.getElementById('prenom').value;
        membre.date_naissance = document.getElementById('date_naissance').value;
        membre.competitions = document.getElementById('competitions').checked;
        
        membre.est_mineur = document.getElementById('section-mineur').style.display === 'block';
        if (membre.est_mineur) {
            membre.parent_nom = document.getElementById('parent_nom').value;
            membre.parent_prenom = document.getElementById('parent_prenom').value;
            membre.parent_tel = document.getElementById('parent_tel').value;
            membre.parent_email = document.getElementById('parent_email').value;
        }
    }
}

// Afficher les données d'un membre
function afficherDonneesMembre(index) {
    if (index >= 0 && index < famille.membres.length) {
        const membre = famille.membres[index];
        
        document.getElementById('civilite').value = membre.civilite;
        document.getElementById('nom').value = membre.nom;
        document.getElementById('prenom').value = membre.prenom;
        document.getElementById('date_naissance').value = membre.date_naissance;
        document.getElementById('competitions').checked = membre.competitions;
        
        verifierAge();
        
        if (membre.est_mineur) {
            document.getElementById('parent_nom').value = membre.parent_nom;
            document.getElementById('parent_prenom').value = membre.parent_prenom;
            document.getElementById('parent_tel').value = membre.parent_tel;
            document.getElementById('parent_email').value = membre.parent_email;
        }
        
        document.getElementById('membre-count').textContent = index + 1;
    }
}

// Mettre à jour la navigation entre membres
function updateMemberNavigation() {
    document.getElementById('btn-prev-member').disabled = membreActif === 0;
    document.getElementById('btn-next-member').disabled = membreActif === famille.membres.length - 1;
}

// Vérifier l'âge pour afficher ou masquer les champs pour mineurs
function verifierAge() {
    const dateNaissance = document.getElementById('date_naissance').value;
    if (dateNaissance) {
        const aujourdhui = new Date();
        const dateNaissanceObj = new Date(dateNaissance);
        let age = aujourdhui.getFullYear() - dateNaissanceObj.getFullYear();
        const m = aujourdhui.getMonth() - dateNaissanceObj.getMonth();
        if (m < 0 || (m === 0 && aujourdhui.getDate() < dateNaissanceObj.getDate())) {
            age--;
        }
        
        const sectionMineur = document.getElementById('section-mineur');
        if (age < 18) {
            sectionMineur.style.display = 'block';
            document.getElementById('parent_nom').setAttribute('required', 'required');
            document.getElementById('parent_prenom').setAttribute('required', 'required');
            document.getElementById('parent_tel').setAttribute('required', 'required');
            document.getElementById('parent_email').setAttribute('required', 'required');
        } else {
            sectionMineur.style.display = 'none';
            document.getElementById('parent_nom').removeAttribute('required');
            document.getElementById('parent_prenom').removeAttribute('required');
            document.getElementById('parent_tel').removeAttribute('required');
            document.getElementById('parent_email').removeAttribute('required');
        }
    }
}
