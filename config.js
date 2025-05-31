// Configuration du formulaire d'inscription au Tennis Club de Pimprez
// Version simplifiée et robuste pour Formspree

// Configuration par défaut
let config = {
    fields: {
        civilite: true,
        nom: true,
        prenom: true,
        date_naissance: true,
        nationalite: true,
        niveau: true,
        licence_fft: false,
        classement: false,
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
        certificat_medical: true,
        reglement: true,
        text_certificat_medical: "Je m'engage à fournir un certificat médical de non contre-indication à la pratique du tennis",
        text_reglement: "J'accepte le règlement intérieur du club"
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
    certificat_medical: false,
    reglement: false
};

// Membre actif (celui en cours d'édition)
let membreActif = 0;

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Charger la configuration depuis le localStorage
    const savedConfig = localStorage.getItem('formConfig');
    if (savedConfig) {
        config = JSON.parse(savedConfig);
    }
    
    // Appliquer la configuration au formulaire
    applyFormConfig(config);
    
    // Initialiser le premier membre
    ajouterMembre();
    
    // Gérer l'ajout de membres
    document.getElementById('btn-add-member').addEventListener('click', function(e) {
        e.preventDefault(); // Empêcher le comportement par défaut du bouton
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
    
    // Gérer l'affichage des champs pour mineurs
    document.getElementById('date_naissance').addEventListener('change', function() {
        verifierAge();
    });
    
    // Gérer la soumission du formulaire - VERSION SIMPLIFIÉE POUR FORMSPREE
    document.getElementById('inscriptionForm').addEventListener('submit', function(e) {
        // Empêcher temporairement la soumission pour préparer les données
        e.preventDefault();
        
        // Sauvegarder les données du membre actif
        sauvegarderDonneesMembre(membreActif);
        
        // Récupérer les données communes
        if (config.fields.adresse) famille.adresse = document.getElementById('adresse').value;
        if (config.fields.code_postal) famille.code_postal = document.getElementById('code_postal').value;
        if (config.fields.ville) famille.ville = document.getElementById('ville').value;
        if (config.fields.tel_mobile) famille.tel_mobile = document.getElementById('tel_mobile').value;
        if (config.fields.tel_fixe) famille.tel_fixe = document.getElementById('tel_fixe').value;
        if (config.fields.email) famille.email = document.getElementById('email').value;
        famille.commentaires = document.getElementById('commentaires').value;
        
        // Vérifier les champs administratifs
        if (document.getElementById('certificat_medical')) {
            famille.certificat_medical = document.getElementById('certificat_medical').checked;
        }
        if (document.getElementById('reglement')) {
            famille.reglement = document.getElementById('reglement').checked;
        }
        
        // Convertir les données en format JSON pour l'envoi
        const jsonData = JSON.stringify(famille);
        
        // Créer un élément caché pour stocker les données JSON
        let hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'famille_data';
        hiddenInput.value = jsonData;
        
        // Ajouter l'élément au formulaire
        this.appendChild(hiddenInput);
        
        // Créer un élément caché pour le nombre de membres
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'nombre_membres';
        hiddenInput.value = famille.membres.length;
        this.appendChild(hiddenInput);
        
        // Soumettre le formulaire à Formspree
        this.submit();
        
        // Afficher le message de confirmation
        document.getElementById('confirmation-message').style.display = 'block';
        document.getElementById('inscriptionForm').style.display = 'none';
        
        // Faire défiler vers le haut pour voir le message
        window.scrollTo(0, 0);
    });
    
    // Gérer le bouton de nouvelle inscription
    document.getElementById('btn-new-inscription').addEventListener('click', function() {
        // Réinitialiser le formulaire
        document.getElementById('inscriptionForm').reset();
        
        // Réinitialiser la famille
        famille = {
            membres: [],
            adresse: "",
            code_postal: "",
            ville: "",
            tel_mobile: "",
            tel_fixe: "",
            email: "",
            commentaires: "",
            certificat_medical: false,
            reglement: false
        };
        
        // Réinitialiser le membre actif
        membreActif = 0;
        
        // Ajouter un nouveau membre
        ajouterMembre();
        
        // Cacher le message de confirmation et afficher le formulaire
        document.getElementById('confirmation-message').style.display = 'none';
        document.getElementById('inscriptionForm').style.display = 'block';
    });
});

// Appliquer la configuration au formulaire
function applyFormConfig(config) {
    // Appliquer les couleurs
    document.documentElement.style.setProperty('--header-color', config.headerColor);
    document.documentElement.style.setProperty('--button-color', config.buttonColor);
    
    // Mettre à jour le nom du club et la saison
    document.getElementById('club-name').textContent = config.clubName;
    document.getElementById('season').textContent = config.season;
    
    // Afficher/masquer les champs selon la configuration
    for (const [field, visible] of Object.entries(config.fields)) {
        const fieldContainer = document.getElementById(`container-${field}`);
        if (fieldContainer) {
            fieldContainer.style.display = visible ? 'block' : 'none';
        }
    }
    
    // Gérer les champs administratifs
    if (config.admin) {
        // Certificat médical
        const certificatContainer = document.getElementById('container-certificat_medical');
        if (certificatContainer) {
            certificatContainer.style.display = config.admin.certificat_medical ? 'block' : 'none';
            
            // Mettre à jour le texte si disponible
            if (config.admin.text_certificat_medical) {
                const certificatLabel = certificatContainer.querySelector('label');
                if (certificatLabel) {
                    certificatLabel.textContent = config.admin.text_certificat_medical;
                }
            }
        }
        
        // Règlement intérieur
        const reglementContainer = document.getElementById('container-reglement');
        if (reglementContainer) {
            reglementContainer.style.display = config.admin.reglement ? 'block' : 'none';
            
            // Mettre à jour le texte si disponible
            if (config.admin.text_reglement) {
                const reglementLabel = reglementContainer.querySelector('label');
                if (reglementLabel) {
                    reglementLabel.textContent = config.admin.text_reglement;
                }
            }
        }
    }
}

// Ajouter un nouveau membre
function ajouterMembre() {
    // Sauvegarder les données du membre actif si ce n'est pas le premier ajout
    if (famille.membres.length > 0) {
        sauvegarderDonneesMembre(membreActif);
    }
    
    // Créer un nouveau membre
    const nouveauMembre = {
        civilite: "",
        nom: "",
        prenom: "",
        date_naissance: "",
        nationalite: "",
        niveau: "",
        licence_fft: "",
        classement: "",
        competitions: false,
        parent_nom: "",
        parent_prenom: "",
        parent_tel: "",
        parent_email: "",
        est_mineur: false
    };
    
    // Ajouter le membre à la famille
    famille.membres.push(nouveauMembre);
    
    // Mettre à jour le membre actif
    membreActif = famille.membres.length - 1;
    
    // Réinitialiser le formulaire
    document.getElementById('inscriptionForm').reset();
    
    // Mettre à jour la navigation
    updateMemberNavigation();
    
    // Mettre à jour le compteur de membres
    document.getElementById('membre-count').textContent = membreActif + 1;
    document.getElementById('membre-total').textContent = famille.membres.length;
    
    // Afficher la section de navigation entre membres
    document.getElementById('member-navigation').style.display = 'block';
}

// Sauvegarder les données du membre actif
function sauvegarderDonneesMembre(index) {
    if (index >= 0 && index < famille.membres.length) {
        const membre = famille.membres[index];
        
        // Récupérer les valeurs des champs
        if (config.fields.civilite) membre.civilite = document.getElementById('civilite').value;
        if (config.fields.nom) membre.nom = document.getElementById('nom').value;
        if (config.fields.prenom) membre.prenom = document.getElementById('prenom').value;
        if (config.fields.date_naissance) membre.date_naissance = document.getElementById('date_naissance').value;
        if (config.fields.nationalite) membre.nationalite = document.getElementById('nationalite').value;
        if (config.fields.niveau) membre.niveau = document.getElementById('niveau').value;
        if (config.fields.licence_fft) membre.licence_fft = document.getElementById('licence_fft').value;
        if (config.fields.classement) membre.classement = document.getElementById('classement').value;
        if (config.fields.competitions) membre.competitions = document.getElementById('competitions').checked;
        
        // Champs pour mineurs
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
        
        // Remplir les champs avec les données du membre
        if (config.fields.civilite) document.getElementById('civilite').value = membre.civilite;
        if (config.fields.nom) document.getElementById('nom').value = membre.nom;
        if (config.fields.prenom) document.getElementById('prenom').value = membre.prenom;
        if (config.fields.date_naissance) document.getElementById('date_naissance').value = membre.date_naissance;
        if (config.fields.nationalite) document.getElementById('nationalite').value = membre.nationalite;
        if (config.fields.niveau) document.getElementById('niveau').value = membre.niveau;
        if (config.fields.licence_fft) document.getElementById('licence_fft').value = membre.licence_fft;
        if (config.fields.classement) document.getElementById('classement').value = membre.classement;
        if (config.fields.competitions) document.getElementById('competitions').checked = membre.competitions;
        
        // Mettre à jour l'affichage pour les mineurs
        verifierAge();
        
        // Remplir les champs pour mineurs si nécessaire
        if (membre.est_mineur) {
            document.getElementById('parent_nom').value = membre.parent_nom;
            document.getElementById('parent_prenom').value = membre.parent_prenom;
            document.getElementById('parent_tel').value = membre.parent_tel;
            document.getElementById('parent_email').value = membre.parent_email;
        }
        
        // Mettre à jour le compteur de membres
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
        const age = aujourdhui.getFullYear() - dateNaissanceObj.getFullYear();
        
        // Vérifier si l'anniversaire est déjà passé cette année
        const moisAujourdhui = aujourdhui.getMonth();
        const jourAujourdhui = aujourdhui.getDate();
        const moisNaissance = dateNaissanceObj.getMonth();
        const jourNaissance = dateNaissanceObj.getDate();
        
        const ageAjuste = (moisAujourdhui < moisNaissance || (moisAujourdhui === moisNaissance && jourAujourdhui < jourNaissance)) ? age - 1 : age;
        
        // Afficher ou masquer la section pour mineurs
        document.getElementById('section-mineur').style.display = ageAjuste < 18 ? 'block' : 'none';
        
        // Mettre à jour le statut de mineur du membre actif
        if (membreActif >= 0 && membreActif < famille.membres.length) {
            famille.membres[membreActif].est_mineur = ageAjuste < 18;
        }
    }
}

// Ajouter un lien vers la page d'administration
const adminLink = document.createElement('a');
adminLink.href = 'admin.html';
adminLink.textContent = 'Administration';
adminLink.style.position = 'fixed';
adminLink.style.bottom = '10px';
adminLink.style.right = '10px';
adminLink.style.fontSize = '12px';
adminLink.style.color = '#666';
document.body.appendChild(adminLink);
