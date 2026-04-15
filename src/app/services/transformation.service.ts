import { Injectable } from '@angular/core';

export interface Marche {
  numbMarche: string;
  description: string;
  nombreLot: number;
  natureOuverture: string;
  financement: string;
  modePassation: string;
  demandeur: string;
  responsableSuivi: string;
  sctPersons: string[];
  datePrevReception: string;
  statut: 'À lancer' | 'Réception' | 'Analyse' | 'En cours' | 'Exécuté';
}

export interface Lot {
  numbLot: string;
  numbMarche: string;
  description: string;
}

export interface Document {
  numbLot: string;
  pvOuverture: 'Oui' | 'Non';
  rapportAnalyse: 'Oui' | 'Non';
  notification: 'Oui' | 'Non';
  contrat: 'Oui' | 'Non';
  fed: 'Oui' | 'Non';
  bonCommande: 'Oui' | 'Non';
  ordreService: 'Oui' | 'Non';
  pvReceptionTech: 'Oui' | 'Non';
}

export interface Consultation {
  numbLot: string;
  idFournisseurs: string[];
  dateConsultation: string;
}

export interface Fournisseur {
  idFournisseur: string;
  statut: 'Interne' | 'Externe';
}

export interface Soumission {
  idSoumission: string;
  numbLot: string;
  idFournisseur: string;
  dateDepot: string;
  heure: string;
  montantPrev: string;
  delaiExecutionPrev: string;
  nbExemplaire: number;
  observation: string;
  rangClassement: number | null;
}

export interface Analyse {
  numbLot: string;
  idAttributairePrev: string;
  dateEffecReception: string;
  observation: string;
}

export interface Attributaire {
  idSoumissionAttribuee: string;
  montantEffec: string;
  delaiExecutionEffec: string;
  dateDemarage: string;
  datePrevFin: string;
  statut: 'En cours' | 'Terminé';
}

export interface Avenant {
  idSoumissionAttribuee: string;
  numbAvenant: string;
  montantAvenant: string;
  dateProrogation: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransformationService {
  marcheList: Marche[] = [];
  lotList: Lot[] = [];
  consultationList: Consultation[] = [];
  fournisseurList: Fournisseur[] = [];
  documentList: Document[] = [];
  soumissionList: Soumission[] = [];
  analyseList: Analyse[] = [];
  attributaireList: Attributaire[] = [];
  avenantList: Avenant[] = [];

  addMarche(marche: Omit<Marche, 'statut'>): void {
    const exists = this.marcheList.some((item) => item.numbMarche === marche.numbMarche.trim());
    if (exists) {
      throw new Error(`Le marché ${marche.numbMarche} existe déjà.`);
    }
    this.marcheList.push({
      ...marche,
      numbMarche: marche.numbMarche.trim(),
      statut: 'À lancer'
    });
  }

  addLot(lot: Omit<Lot, 'numbLot'> & { numbLot?: string }): void {
    const march = this.marcheList.find((item) => item.numbMarche === lot.numbMarche);
    if (!march) {
      throw new Error(`Le marché ${lot.numbMarche} n'existe pas.`);
    }
    const existingLots = this.lotList.filter((item) => item.numbMarche === lot.numbMarche).length;
    const effectiveNumbLot = lot.numbLot?.trim() || `${lot.numbMarche}_LOT${existingLots + 1}`;
    if (this.lotList.some((item) => item.numbLot === effectiveNumbLot)) {
      throw new Error(`Le lot ${effectiveNumbLot} existe déjà.`);
    }
    this.lotList.push({
      numbLot: effectiveNumbLot,
      numbMarche: lot.numbMarche,
      description: lot.description.trim()
    });
    this.documentList.push({
      numbLot: effectiveNumbLot,
      pvOuverture: 'Non',
      rapportAnalyse: 'Non',
      notification: 'Non',
      contrat: 'Non',
      fed: 'Non',
      bonCommande: 'Non',
      ordreService: 'Non',
      pvReceptionTech: 'Non'
    });
  }

  addConsultation(cons: Consultation): void {
    const lot = this.lotList.find((item) => item.numbLot === cons.numbLot);
    if (!lot) {
      throw new Error(`Le lot ${cons.numbLot} n'existe pas.`);
    }
    const ids = cons.idFournisseurs
      .map((id) => id.trim())
      .filter((id) => id.length > 0);
    if (!ids.length) {
      throw new Error('Au moins un fournisseur doit être saisi.');
    }
    ids.forEach((id) => {
      if (!this.fournisseurList.some((f) => f.idFournisseur === id)) {
        this.fournisseurList.push({ idFournisseur: id, statut: 'Externe' });
      }
    });
    const existing = this.consultationList.find((item) => item.numbLot === cons.numbLot);
    if (existing) {
      existing.idFournisseurs = Array.from(new Set([...existing.idFournisseurs, ...ids]));
      existing.dateConsultation = cons.dateConsultation;
    } else {
      this.consultationList.push({ numbLot: cons.numbLot, idFournisseurs: ids, dateConsultation: cons.dateConsultation });
    }
  }

  openReception(numbMarche: string): void {
    const march = this.marcheList.find((item) => item.numbMarche === numbMarche);
    if (!march) {
      throw new Error(`Le marché ${numbMarche} n'existe pas.`);
    }
    march.statut = 'Réception';
  }

  validatePV(numbLot: string): void {
    const doc = this.documentList.find((item) => item.numbLot === numbLot);
    if (!doc) {
      throw new Error(`Aucun document trouvé pour le lot ${numbLot}.`);
    }
    doc.pvOuverture = 'Oui';
  }

  addSoumission(data: Omit<Soumission, 'idSoumission' | 'rangClassement'>): void {
    const lot = this.lotList.find((item) => item.numbLot === data.numbLot);
    if (!lot) {
      throw new Error(`Le lot ${data.numbLot} n'existe pas.`);
    }
    const consultation = this.consultationList.find((item) => item.numbLot === data.numbLot);
    if (!consultation || !consultation.idFournisseurs.includes(data.idFournisseur)) {
      throw new Error(`Le fournisseur ${data.idFournisseur} n'a pas été consulté pour ce lot.`);
    }
    const idSoumission = `${data.numbLot}_Fourn_${data.idFournisseur}`;
    if (this.soumissionList.some((item) => item.idSoumission === idSoumission)) {
      throw new Error(`La soumission ${idSoumission} existe déjà.`);
    }
    this.soumissionList.push({
      idSoumission,
      ...data,
      idFournisseur: data.idFournisseur.trim(),
      rangClassement: null
    });
  }

  launchAnalyse(numbMarche: string): void {
    const march = this.marcheList.find((item) => item.numbMarche === numbMarche);
    if (!march) {
      throw new Error(`Le marché ${numbMarche} n'existe pas.`);
    }
    if (march.statut !== 'Réception') {
      throw new Error('La réception doit être ouverte avant de lancer l’analyse.');
    }
    march.statut = 'Analyse';
  }

  recordAnalyse(analyse: Analyse): void {
    const lot = this.lotList.find((item) => item.numbLot === analyse.numbLot);
    if (!lot) {
      throw new Error(`Le lot ${analyse.numbLot} n'existe pas.`);
    }
    const soumission = this.soumissionList.find((item) => item.idSoumission === analyse.idAttributairePrev);
    if (!soumission) {
      throw new Error(`Soumission ${analyse.idAttributairePrev} introuvable.`);
    }
    this.analyseList.push(analyse);
    const lotSoumissions = this.soumissionList.filter((item) => item.numbLot === analyse.numbLot);
    lotSoumissions.forEach((item, index) => {
      item.rangClassement = item.idSoumission === analyse.idAttributairePrev ? 1 : index + 2;
    });
  }

  validateRapportAnalyse(numbLot: string): void {
    const doc = this.documentList.find((item) => item.numbLot === numbLot);
    if (!doc) {
      throw new Error(`Aucun document trouvé pour le lot ${numbLot}.`);
    }
    doc.rapportAnalyse = 'Oui';
  }

  validateDocuments(numbLot: string, values: Partial<Document>): void {
    const doc = this.documentList.find((item) => item.numbLot === numbLot);
    if (!doc) {
      throw new Error(`Aucun document trouvé pour le lot ${numbLot}.`);
    }
    Object.entries(values).forEach(([key, value]) => {
      if (value === 'Oui' && key in doc) {
        (doc as any)[key] = 'Oui';
      }
    });
  }

  recordAttribution(data: Attributaire): void {
    const soumission = this.soumissionList.find((item) => item.idSoumission === data.idSoumissionAttribuee);
    if (!soumission) {
      throw new Error(`Soumission ${data.idSoumissionAttribuee} introuvable.`);
    }
    if (this.attributaireList.some((item) => item.idSoumissionAttribuee === data.idSoumissionAttribuee)) {
      throw new Error(`Attribution pour ${data.idSoumissionAttribuee} existe déjà.`);
    }
    this.attributaireList.push({ ...data, statut: 'En cours' });
  }

  startExecution(numbMarche: string): void {
    const march = this.marcheList.find((item) => item.numbMarche === numbMarche);
    if (!march) {
      throw new Error(`Le marché ${numbMarche} n'existe pas.`);
    }
    march.statut = 'En cours';
  }

  addAvenant(data: Avenant): void {
    const soumission = this.soumissionList.find((item) => item.idSoumission === data.idSoumissionAttribuee);
    if (!soumission) {
      throw new Error(`Soumission ${data.idSoumissionAttribuee} introuvable.`);
    }
    this.avenantList.push(data);
  }

  closeContract(numbMarche: string): void {
    const march = this.marcheList.find((item) => item.numbMarche === numbMarche);
    if (!march) {
      throw new Error(`Le marché ${numbMarche} n'existe pas.`);
    }
    march.statut = 'Exécuté';
    this.attributaireList.forEach((item) => {
      item.statut = 'Terminé';
    });
    const relatedLots = this.lotList.filter((lot) => lot.numbMarche === numbMarche).map((lot) => lot.numbLot);
    this.documentList.filter((doc) => relatedLots.includes(doc.numbLot)).forEach((doc) => {
      doc.pvReceptionTech = 'Oui';
    });
  }
}
