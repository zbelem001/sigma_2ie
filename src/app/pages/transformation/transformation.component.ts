import { Component } from '@angular/core';
import {
  Analyse,
  Avenant,
  Attributaire,
  Consultation,
  Document,
  Fournisseur,
  Lot,
  Marche,
  Soumission,
  TransformationService
} from '../../services/transformation.service';

@Component({
  selector: 'app-transformation',
  templateUrl: './transformation.component.html',
  styleUrls: ['./transformation.component.css'],
  standalone: false
})
export class TransformationComponent {
  activeStep: 'ajouterMarche' | 'ajouterLot' | 'consultation' | 'reception' | 'soumission' | 'analyse' | 'attribution' | 'avenant' = 'ajouterMarche';
  message = '';

  newMarche: Omit<Marche, 'statut'> = {
    numbMarche: '',
    description: '',
    nombreLot: 1,
    natureOuverture: '',
    dateEnregistrement: '',
    financement: '',
    modePassation: '',
    demandeur: '',
    responsableSuivi: '',
    sctPersons: ['', '', '', ''],
    datePrevReception: ''
  };

  newLot: Partial<Lot> = { numbMarche: '', numbLot: '', description: '', numbContrat: '' };

  newConsultation: Partial<Consultation> = { numbLot: '', idFournisseurs: [], dateConsultation: '' };
  consultationFournisseurs = '';

  receptionMarket = '';
  pvLot = '';

  newSoumission: Partial<Soumission> = {
    numbLot: '',
    idFournisseur: '',
    dateDepot: '',
    heure: '',
    montantPrev: '',
    delaiExecutionPrev: '',
    nbExemplaire: 1,
    observation: ''
  };

  analyseInput: Partial<Analyse> = { numbLot: '', idAttributairePrev: '', dateEffecReception: '', datePresentationRapport: '', observation: '' };
  rapportLot = '';

  docValidation: { numbLot: string; notification: boolean; contrat: boolean; fed: boolean; bonCommande: boolean; ordreService: boolean; liasseContractuelle: boolean } = {
    numbLot: '',
    notification: false,
    contrat: false,
    fed: false,
    bonCommande: false,
    ordreService: false,
    liasseContractuelle: false
  };

  attributionInput: Partial<Attributaire> = {
    idSoumissionAttribuee: '',
    montantEffec: '',
    delaiExecutionEffec: '',
    dateDemarage: '',
    datePrevFin: ''
  };

  executionMarket = '';

  newAvenant: Partial<Avenant> = {
    idSoumissionAttribuee: '',
    numbAvenant: '',
    montantAvenant: '',
    dateProrogation: ''
  };

  closureMarket = '';

  constructor(public transformation: TransformationService) {}

  private clearMessage() {
    this.message = '';
  }

  submitMarche() {
    this.clearMessage();
    try {
      const sctPersons = this.newMarche.sctPersons.map((p) => p?.trim()).filter(Boolean);
      this.transformation.addMarche({ ...this.newMarche, sctPersons });
      this.message = `Marché ${this.newMarche.numbMarche} ajouté avec succès.`;
      this.newMarche = {
        numbMarche: '',
        description: '',
        nombreLot: 1,
        natureOuverture: '',
        dateEnregistrement: '',
        financement: '',
        modePassation: '',
        demandeur: '',
        responsableSuivi: '',
        sctPersons: ['', '', '', ''],
        datePrevReception: ''
      };
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

  submitLot() {
    this.clearMessage();
    try {
      this.transformation.addLot({
        numbMarche: this.newLot.numbMarche || '',
        numbLot: this.newLot.numbLot || undefined,
        description: this.newLot.description || '',
        numbContrat: this.newLot.numbContrat || undefined
      });
      this.message = `Lot ajouté pour le marché ${this.newLot.numbMarche}.`;
      this.newLot = { numbMarche: '', numbLot: '', description: '', numbContrat: '' };
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

  submitConsultation() {
    this.clearMessage();
    try {
      const fournisseurs = this.consultationFournisseurs
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);
      if (!fournisseurs.length) {
        throw new Error('Saisissez au moins un fournisseur.');
      }
      this.transformation.addConsultation({
        numbLot: this.newConsultation.numbLot || '',
        idFournisseurs: fournisseurs,
        dateConsultation: this.newConsultation.dateConsultation || ''
      });
      this.message = `Consultation enregistrée pour le lot ${this.newConsultation.numbLot}.`;
      this.newConsultation = { numbLot: '', idFournisseurs: [], dateConsultation: '' };
      this.consultationFournisseurs = '';
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

  submitReception() {
    this.clearMessage();
    try {
      this.transformation.openReception(this.receptionMarket);
      this.message = `Réception ouverte pour le marché ${this.receptionMarket}.`;
      this.receptionMarket = '';
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

  submitPV() {
    this.clearMessage();
    try {
      this.transformation.validatePV(this.pvLot);
      this.message = `PV d'ouverture validé pour le lot ${this.pvLot}.`;
      this.pvLot = '';
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

  submitSoumission() {
    this.clearMessage();
    try {
      this.transformation.addSoumission({
        numbLot: this.newSoumission.numbLot || '',
        idFournisseur: this.newSoumission.idFournisseur || '',
        dateDepot: this.newSoumission.dateDepot || '',
        heure: this.newSoumission.heure || '',
        montantPrev: this.newSoumission.montantPrev || '',
        delaiExecutionPrev: this.newSoumission.delaiExecutionPrev || '',
        nbExemplaire: this.newSoumission.nbExemplaire || 1,
        observation: this.newSoumission.observation || ''
      });
      this.message = `Soumission ajoutée pour le lot ${this.newSoumission.numbLot}.`;
      this.newSoumission = { numbLot: '', idFournisseur: '', dateDepot: '', heure: '', montantPrev: '', delaiExecutionPrev: '', nbExemplaire: 1, observation: '' };
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

  submitAnalyse() {
    this.clearMessage();
    try {
      this.transformation.recordAnalyse({
        numbLot: this.analyseInput.numbLot || '',
        idAttributairePrev: this.analyseInput.idAttributairePrev || '',
        dateEffecReception: this.analyseInput.dateEffecReception || '',
        datePresentationRapport: this.analyseInput.datePresentationRapport || '',
        observation: this.analyseInput.observation || ''
      });
      this.message = `Analyse enregistrée pour le lot ${this.analyseInput.numbLot}.`;
      this.analyseInput = { numbLot: '', idAttributairePrev: '', dateEffecReception: '', datePresentationRapport: '', observation: '' };
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

  submitRapportAnalyse() {
    this.clearMessage();
    try {
      this.transformation.validateRapportAnalyse(this.rapportLot);
      this.message = `Rapport d'analyse validé pour le lot ${this.rapportLot}.`;
      this.rapportLot = '';
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

  submitDocumentValidation() {
    this.clearMessage();
    try {
      const values: Partial<Document> = {
        notification: this.docValidation.notification ? 'Oui' : 'Non',
        contrat: this.docValidation.contrat ? 'Oui' : 'Non',
        fed: this.docValidation.fed ? 'Oui' : 'Non',
        bonCommande: this.docValidation.bonCommande ? 'Oui' : 'Non',
        ordreService: this.docValidation.ordreService ? 'Oui' : 'Non',
        liasseContractuelle: this.docValidation.liasseContractuelle ? 'Oui' : 'Non'
      };
      this.transformation.validateDocuments(this.docValidation.numbLot, values);
      this.message = `Documents administratifs actualisés pour le lot ${this.docValidation.numbLot}.`;
      this.docValidation = { numbLot: '', notification: false, contrat: false, fed: false, bonCommande: false, ordreService: false, liasseContractuelle: false };
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

  submitAttribution() {
    this.clearMessage();
    try {
      this.transformation.recordAttribution({
        idSoumissionAttribuee: this.attributionInput.idSoumissionAttribuee || '',
        montantEffec: this.attributionInput.montantEffec || '',
        delaiExecutionEffec: this.attributionInput.delaiExecutionEffec || '',
        dateDemarage: this.attributionInput.dateDemarage || '',
        datePrevFin: this.attributionInput.datePrevFin || '',
        statut: 'En cours'
      });
      this.message = `Attribution enregistrée pour la soumission ${this.attributionInput.idSoumissionAttribuee}.`;
      this.attributionInput = { idSoumissionAttribuee: '', montantEffec: '', delaiExecutionEffec: '', dateDemarage: '', datePrevFin: '' };
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

  submitExecution() {
    this.clearMessage();
    try {
      this.transformation.startExecution(this.executionMarket);
      this.message = `Exécution démarrée pour le marché ${this.executionMarket}.`;
      this.executionMarket = '';
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

  submitAvenant() {
    this.clearMessage();
    try {
      this.transformation.addAvenant({
        idSoumissionAttribuee: this.newAvenant.idSoumissionAttribuee || '',
        numbAvenant: this.newAvenant.numbAvenant || '',
        montantAvenant: this.newAvenant.montantAvenant || '',
        dateProrogation: this.newAvenant.dateProrogation || ''
      });
      this.message = `Avenant ${this.newAvenant.numbAvenant} ajouté.`;
      this.newAvenant = { idSoumissionAttribuee: '', numbAvenant: '', montantAvenant: '', dateProrogation: '' };
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

  submitClosure() {
    this.clearMessage();
    try {
      this.transformation.closeContract(this.closureMarket);
      this.message = `Clôture finale effectuée pour le marché ${this.closureMarket}.`;
      this.closureMarket = '';
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

  launchAnalysePhase() {
    this.clearMessage();
    try {
      if (!this.receptionMarket) {
        throw new Error('Sélectionnez d’abord un marché pour lancer l’analyse.');
      }
      this.transformation.launchAnalyse(this.receptionMarket);
      this.message = `Analyse lancée pour le marché ${this.receptionMarket}.`;
      this.receptionMarket = '';
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

  get markets() {
    return this.transformation.marcheList;
  }

  get lots() {
    return this.transformation.lotList;
  }

  get consultations() {
    return this.transformation.consultationList;
  }

  get documents() {
    return this.transformation.documentList;
  }

  get soumissions() {
    return this.transformation.soumissionList;
  }

  get fournisseurs() {
    return this.transformation.fournisseurList;
  }

  get attributaires() {
    return this.transformation.attributaireList;
  }

  get avenants() {
    return this.transformation.avenantList;
  }
}
