// Modification du script config.js pour ajouter un message de confirmation après envoi
document.addEventListener('DOMContentLoaded', function() {
    // Charger la configuration
    let config = localStorage.getItem('formConfig');
    if (config) {
        config = JSON.parse(config);
        applyFormConfig(config);
    } else {
        // Configuration par défaut
        config = {
            fields: {
                civilite: true,
                nom: true,
                prenom: true,
                date_naissance: true,
                nationalite: false,
                niveau: true,
                licence: false,
                classement: false,
                competition: true,
                adresse: true,
                code_postal: true,
                ville: true,
                tel_mobile: true,
                tel_fixe: false,
                email: true
            },
            clubName: 'Tennis Club de Pimprez',
            season: '2025-2026',
            headerColor: '#4CAF50',
            buttonColor: '#4CAF50'
        };
        localStorage.setItem('formConfig', JSON.stringify(config));
        applyFormConfig(config);
    }
    
    // Structure des données pour un membre
    class Membre {
        constructor() {
            this.civilite = '';
            this.nom = '';
            this.prenom = '';
            this.date_naissance = '';
            this.nationalite = '';
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
        if (config.fields.civilite) document.getElementById('civilite').value = famille.membres[index].civilite || '';
        document.getElementById('nom').value = famille.membres[index].nom || '';
        document.getElementById('prenom').value = famille.membres[index].prenom || '';
        if (config.fields.date_naissance) document.getElementById('date_naissance').value = famille.membres[index].date_naissance || '';
        if (config.fields.nationalite) document.getElementById('nationalite').value = famille.membres[index].nationalite || '';
        if (config.fields.niveau) document.getElementById('niveau').value = famille.membres[index].niveau || '';
        if (config.fields.licence) document.getElementById('licence').value = famille.membres[index].licence || '';
        if (config.fields.classement) document.getElementById('classement').value = famille.membres[index].classement || '';
        
        // Gérer les boutons radio pour la compétition
        if (config.fields.competition) {
            if (famille.membres[index].competition === 'Oui') {
                document.getElementById('competition_oui').checked = true;
            } else if (famille.membres[index].competition === 'Non') {
                document.getElementById('competition_non').checked = true;
            } else {
                document.getElementById('competition_oui').checked = false;
                document.getElementById('competition_non').checked = false;
            }
        }
        
        document.getElementById('type_adhesion').value = famille.membres[index].type_adhesion || '';
        
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
        if (config.fields.civilite) famille.membres[index].civilite = document.getElementById('civilite').value;
        famille.membres[index].nom = document.getElementById('nom').value;
        famille.membres[index].prenom = document.getElementById('prenom').value;
        if (config.fields.date_naissance) famille.membres[index].date_naissance = document.getElementById('date_naissance').value;
        if (config.fields.nationalite) famille.membres[index].nationalite = document.getElementById('nationalite').value;
        if (config.fields.niveau) famille.membres[index].niveau = document.getElementById('niveau').value;
        if (config.fields.licence) famille.membres[index].licence = document.getElementById('licence').value;
        if (config.fields.classement) famille.membres[index].classement = document.getElementById('classement').value;
        
        // Récupérer la valeur des boutons radio pour la compétition
        if (config.fields.competition) {
            if (document.getElementById('competition_oui').checked) {
                famille.membres[index].competition = 'Oui';
            } else if (document.getElementById('competition_non').checked) {
                famille.membres[index].competition = 'Non';
            }
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
        if (config.fields.adresse) famille.adresse = document.getElementById('adresse').value;
        if (config.fields.code_postal) famille.code_postal = document.getElementById('code_postal').value;
        if (config.fields.ville) famille.ville = document.getElementById('ville').value;
        if (config.fields.tel_mobile) famille.tel_mobile = document.getElementById('tel_mobile').value;
        if (config.fields.tel_fixe) famille.tel_fixe = document.getElementById('tel_fixe').value;
        if (config.fields.email) famille.email = document.getElementById('email').value;
        famille.commentaires = document.getElementById('commentaires').value;
        famille.certificat_medical = document.getElementById('certificat_medical').checked;
        famille.reglement = document.getElementById('reglement').checked;
        
        // Convertir les données en format JSON pour l'envoi
        const jsonData = JSON.stringify(famille);
        
        // Afficher un message de chargement
        const formContent = this.innerHTML;
        this.innerHTML = `
            <div class="text-center p-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Chargement...</span>
                </div>
                <p class="mt-3">Envoi en cours, veuillez patienter...</p>
            </div>
        `;
        
        // Créer un élément caché pour stocker les données JSON
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'famille_data';
        hiddenInput.value = jsonData;
        
        // Créer un élément pour le nombre de membres
        const membreCountInput = document.createElement('input');
        membreCountInput.type = 'hidden';
        membreCountInput.name = 'nombre_membres';
        membreCountInput.value = famille.membres.length;
        
        // Créer un formulaire temporaire pour l'envoi
        const tempForm = document.createElement('form');
        tempForm.method = 'POST';
        tempForm.action = 'https://formspree.io/f/xgegvdwj';
        tempForm.style.display = 'none';
        tempForm.appendChild(hiddenInput);
        tempForm.appendChild(membreCountInput);
        document.body.appendChild(tempForm);
        
        // Envoyer les données via Formspree
        fetch('https://formspree.io/f/xgegvdwj', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                famille: famille,
                nombre_membres: famille.membres.length
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erreur lors de l\'envoi du formulaire');
        })
        .then(data => {
            // Afficher un message de confirmation
            const formElement = document.getElementById('inscriptionForm');
            formElement.innerHTML = `
                <div class="alert alert-success text-center">
                    <h4 class="alert-heading"><i class="bi bi-check-circle-fill"></i> Merci pour votre inscription !</h4>
                    <p>Votre demande d'inscription au ${config.clubName} a bien été enregistrée.</p>
                    <p>Un email de confirmation a été envoyé à l'adresse : <strong>${famille.email}</strong></p>
                    <p>Le responsable du club va traiter votre demande et vous contactera prochainement.</p>
                    <hr>
                    <p class="mb-0">
                        <button type="button" class="btn btn-outline-success mt-3" onclick="window.location.reload()">
                            Faire une nouvelle inscription
                        </button>
                    </p>
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
            fetch('https://formspree.io/f/xgegvdwj', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    csv: csvContent,
                    formId: 'tennis-club-pimprez-csv',
                    subject: `Données CSV - Nouvelle inscription au ${config.clubName}`
                })
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
            const formElement = document.getElementById('inscriptionForm');
            formElement.innerHTML = `
                <div class="alert alert-danger text-center">
                    <h4 class="alert-heading"><i class="bi bi-exclamation-triangle-fill"></i> Erreur</h4>
                    <p>Une erreur est survenue lors de l'envoi du formulaire.</p>
                    <p>Veuillez réessayer ultérieurement ou contacter le responsable du club.</p>
                    <hr>
                    <p class="mb-0">
                        <button type="button" class="btn btn-outline-danger mt-3" onclick="window.location.reload()">
                            Réessayer
                        </button>
                    </p>
                </div>
            `;
        });
        
        return false;
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
    
    // Ajouter un lien vers la page d'administration
    const adminLink = document.createElement('a');
    adminLink.href = 'admin.html';
    adminLink.textContent = 'Administration';
    adminLink.className = 'admin-link';
    adminLink.style.position = 'fixed';
    adminLink.style.bottom = '10px';
    adminLink.style.right = '10px';
    adminLink.style.padding = '5px 10px';
    adminLink.style.backgroundColor = '#f0f0f0';
    adminLink.style.borderRadius = '5px';
    adminLink.style.textDecoration = 'none';
    adminLink.style.color = '#666';
    adminLink.style.fontSize = '12px';
    document.body.appendChild(adminLink);
});
