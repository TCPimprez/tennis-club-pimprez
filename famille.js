// Structure pour gérer les inscriptions familiales
// Ce fichier définit la structure et les fonctions pour gérer plusieurs membres d'une même famille

// Structure des données pour un membre
class Membre {
    constructor() {
        this.civilite = '';
        this.nom = '';
        this.prenom = '';
        this.date_naissance = '';
        this.niveau = '';
        this.licence = '';
        this.classement = '';
        this.competition = '';
        this.type_adhesion = '';
    }
}

// Structure des données pour une famille
class Famille {
    constructor() {
        this.membres = [new Membre()];
        this.adresse = '';
        this.code_postal = '';
        this.ville = '';
        this.tel_mobile = '';
        this.tel_fixe = '';
        this.email = '';
        this.commentaires = '';
        this.certificat_medical = false;
        this.reglement = false;
    }
    
    ajouterMembre() {
        this.membres.push(new Membre());
        return this.membres.length - 1;
    }
    
    supprimerMembre(index) {
        if (this.membres.length > 1 && index < this.membres.length) {
            this.membres.splice(index, 1);
            return true;
        }
        return false;
    }
}

// Gestion du formulaire familial
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de la famille
    const famille = new Famille();
    let membreActif = 0;
    
    // Référence aux éléments du formulaire
    const formContainer = document.getElementById('membres-container');
    const btnAjouterMembre = document.getElementById('btn-ajouter-membre');
    const ongletsMembres = document.getElementById('onglets-membres');
    
    // Fonction pour afficher un membre
    function afficherMembre(index) {
        // Sauvegarder les données du membre actif
        if (membreActif !== index) {
            sauvegarderDonneesMembre(membreActif);
        }
        
        // Mettre à jour l'onglet actif
        document.querySelectorAll('.onglet-membre').forEach(onglet => {
            onglet.classList.remove('active');
        });
        document.getElementById(`onglet-membre-${index}`).classList.add('active');
        
        // Afficher les données du membre sélectionné
        document.getElementById('civilite').value = famille.membres[index].civilite;
        document.getElementById('nom').value = famille.membres[index].nom;
        document.getElementById('prenom').value = famille.membres[index].prenom;
        document.getElementById('date_naissance').value = famille.membres[index].date_naissance;
        document.getElementById('niveau').value = famille.membres[index].niveau;
        document.getElementById('licence').value = famille.membres[index].licence;
        document.getElementById('classement').value = famille.membres[index].classement;
        
        // Gérer les boutons radio pour la compétition
        if (famille.membres[index].competition === 'Oui') {
            document.getElementById('competition_oui').checked = true;
        } else if (famille.membres[index].competition === 'Non') {
            document.getElementById('competition_non').checked = true;
        } else {
            document.getElementById('competition_oui').checked = false;
            document.getElementById('competition_non').checked = false;
        }
        
        document.getElementById('type_adhesion').value = famille.membres[index].type_adhesion;
        
        // Mettre à jour le membre actif
        membreActif = index;
        
        // Afficher ou masquer le bouton de suppression
        const btnSupprimer = document.getElementById('btn-supprimer-membre');
        if (famille.membres.length > 1) {
            btnSupprimer.style.display = 'inline-block';
        } else {
            btnSupprimer.style.display = 'none';
        }
    }
    
    // Fonction pour sauvegarder les données d'un membre
    function sauvegarderDonneesMembre(index) {
        famille.membres[index].civilite = document.getElementById('civilite').value;
        famille.membres[index].nom = document.getElementById('nom').value;
        famille.membres[index].prenom = document.getElementById('prenom').value;
        famille.membres[index].date_naissance = document.getElementById('date_naissance').value;
        famille.membres[index].niveau = document.getElementById('niveau').value;
        famille.membres[index].licence = document.getElementById('licence').value;
        famille.membres[index].classement = document.getElementById('classement').value;
        
        // Récupérer la valeur des boutons radio pour la compétition
        if (document.getElementById('competition_oui').checked) {
            famille.membres[index].competition = 'Oui';
        } else if (document.getElementById('competition_non').checked) {
            famille.membres[index].competition = 'Non';
        }
        
        famille.membres[index].type_adhesion = document.getElementById('type_adhesion').value;
    }
    
    // Fonction pour ajouter un onglet de membre
    function ajouterOngletMembre(index) {
        const onglet = document.createElement('div');
        onglet.id = `onglet-membre-${index}`;
        onglet.className = 'onglet-membre';
        onglet.textContent = `Membre ${index + 1}`;
        onglet.addEventListener('click', function() {
            afficherMembre(index);
        });
        
        ongletsMembres.insertBefore(onglet, btnAjouterMembre);
        return onglet;
    }
    
    // Initialiser le premier onglet
    ajouterOngletMembre(0);
    document.getElementById('onglet-membre-0').classList.add('active');
    
    // Gérer l'ajout d'un nouveau membre
    btnAjouterMembre.addEventListener('click', function() {
        const nouveauIndex = famille.ajouterMembre();
        const nouvelOnglet = ajouterOngletMembre(nouveauIndex);
        nouvelOnglet.click();
    });
    
    // Gérer la suppression d'un membre
    document.getElementById('btn-supprimer-membre').addEventListener('click', function() {
        if (famille.membres.length > 1) {
            const indexASupprimer = membreActif;
            const ongletASupprimer = document.getElementById(`onglet-membre-${indexASupprimer}`);
            
            // Supprimer le membre et l'onglet
            famille.supprimerMembre(indexASupprimer);
            ongletASupprimer.remove();
            
            // Réindexer les onglets restants
            document.querySelectorAll('.onglet-membre').forEach((onglet, i) => {
                onglet.id = `onglet-membre-${i}`;
                onglet.textContent = `Membre ${i + 1}`;
                onglet.onclick = function() {
                    afficherMembre(i);
                };
            });
            
            // Afficher le premier membre ou un autre membre disponible
            afficherMembre(0);
        }
    });
    
    // Gérer la soumission du formulaire
    document.getElementById('inscriptionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Sauvegarder les données du membre actif
        sauvegarderDonneesMembre(membreActif);
        
        // Récupérer les données communes
        famille.adresse = document.getElementById('adresse').value;
        famille.code_postal = document.getElementById('code_postal').value;
        famille.ville = document.getElementById('ville').value;
        famille.tel_mobile = document.getElementById('tel_mobile').value;
        famille.tel_fixe = document.getElementById('tel_fixe').value;
        famille.email = document.getElementById('email').value;
        famille.commentaires = document.getElementById('commentaires').value;
        famille.certificat_medical = document.getElementById('certificat_medical').checked;
        famille.reglement = document.getElementById('reglement').checked;
        
        // Préparer les données pour l'envoi
        const formData = new FormData();
        formData.append('famille', JSON.stringify(famille));
        
        // Envoi des données à Formspree
        fetch('https://formspree.io/f/xgegvdwj', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erreur lors de l\'envoi du formulaire');
        })
        .then(data => {
            // Affichage d'un message de confirmation
            document.getElementById('inscriptionForm').innerHTML = `
                <div class="alert alert-success">
                    <h4>Merci pour votre inscription !</h4>
                    <p>Votre demande d'inscription a bien été enregistrée.</p>
                    <p>Le responsable du club va traiter votre demande et vous contactera prochainement.</p>
                </div>
            `;
            
            // Préparation des données pour Excel
            let csvData = [];
            let headers = ['membre', 'civilite', 'nom', 'prenom', 'date_naissance', 'niveau', 'licence', 'classement', 'competition', 'type_adhesion', 'adresse', 'code_postal', 'ville', 'tel_mobile', 'tel_fixe', 'email', 'commentaires', 'certificat_medical', 'reglement'];
            csvData.push(headers);
            
            // Ajouter une ligne pour chaque membre
            famille.membres.forEach((membre, index) => {
                let row = [
                    `Membre ${index + 1}`,
                    membre.civilite,
                    membre.nom,
                    membre.prenom,
                    membre.date_naissance,
                    membre.niveau,
                    membre.licence,
                    membre.classement,
                    membre.competition,
                    membre.type_adhesion,
                    famille.adresse,
                    famille.code_postal,
                    famille.ville,
                    famille.tel_mobile,
                    famille.tel_fixe,
                    famille.email,
                    famille.commentaires,
                    famille.certificat_medical ? 'Oui' : 'Non',
                    famille.reglement ? 'Oui' : 'Non'
                ];
                csvData.push(row);
            });
            
            // Génération du CSV
            const csvContent = csvData.map(row => row.join(',')).join('\n');
            
            // Envoi du CSV par email
            const csvEmailData = new FormData();
            csvEmailData.append('csv', csvContent);
            csvEmailData.append('formId', 'tennis-club-pimprez-csv');
            csvEmailData.append('subject', 'Données CSV - Nouvelle inscription au Tennis Club de Pimprez');
            
            fetch('https://formspree.io/f/xgegvdwj', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: csvEmailData
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
            document.getElementById('inscriptionForm').innerHTML += `
                <div class="alert alert-danger">
                    <p>Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer ultérieurement.</p>
                </div>
            `;
        });
    });
});
