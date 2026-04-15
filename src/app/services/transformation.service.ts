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
  category?: 'Travaux BTP' | 'Fournitures IT' | 'Services Labo' | 'Consultance' | 'Autre';
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
  raisonSociale: string;
  domaineActivite: string;
  disposeIFU_RCCM: boolean;
  numIFU_RCCM?: string;
  emailTel: string;
  nomPrenomRepr: string;
  statutFourn: 'Classique' | 'Externe';
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
  activityLog: Array<{reference: string; description: string; date: string; statut: string}> = [];

  constructor() {
    this.seedData();
  }

  private seedData(): void {
    if (this.marcheList.length) {
      return;
    }

    this.addMarche({
      numbMarche: 'M-2023-0045',
      description: 'Fourniture et installation d\'équipements solaires pour le campus principal',
      nombreLot: 3,
      natureOuverture: 'Ouverte',
      financement: 'Budget interne',
      modePassation: 'Appel d\'offres',
      demandeur: 'Direction Générale',
      responsableSuivi: 'Chef des services généraux',
      sctPersons: ['SCT A', 'SCT B'],
      datePrevReception: '2024-01-10',
      category: 'Travaux BTP'
    });
    this.addLot({numbMarche: 'M-2023-0045', numbLot: 'M-2023-0045_LOT1', description: 'Installation panneaux solaires bâtiments administratifs'});
    this.addLot({numbMarche: 'M-2023-0045', numbLot: 'M-2023-0045_LOT2', description: 'Installation panneaux solaires résidence étudiante'});
    this.addLot({numbMarche: 'M-2023-0045', numbLot: 'M-2023-0045_LOT3', description: 'Raccordement et mise en service'});
    this.addFournisseur({
      idFournisseur: 'F-001',
      raisonSociale: 'Sotuba Architecture',
      domaineActivite: 'Génie Civil',
      disposeIFU_RCCM: true,
      numIFU_RCCM: 'IFU22300456',
      emailTel: 'm.traore@sotuba-arch.com • +223 70 00 00 01',
      nomPrenomRepr: 'Moussa Traoré',
      statutFourn: 'Classique'
    });
    this.addFournisseur({
      idFournisseur: 'F-002',
      raisonSociale: 'LaboPro Services',
      domaineActivite: 'Fournitures IT',
      disposeIFU_RCCM: false,
      numIFU_RCCM: 'IFU22600789',
      emailTel: 'a.diallo@labopro.com • +226 70 00 00 02',
      nomPrenomRepr: 'Adama Diallo',
      statutFourn: 'Externe'
    });
    this.addConsultation({numbLot: 'M-2023-0045_LOT1', idFournisseurs: ['F-001', 'F-002'], dateConsultation: '2024-01-12'});
    this.addConsultation({numbLot: 'M-2023-0045_LOT2', idFournisseurs: ['F-001', 'F-003'], dateConsultation: '2024-01-14'});
    this.openReception('M-2023-0045');
    this.validatePV('M-2023-0045_LOT1');
    this.validatePV('M-2023-0045_LOT2');
    this.addSoumission({
      numbLot: 'M-2023-0045_LOT1',
      idFournisseur: 'F-001',
      dateDepot: '2024-01-20',
      heure: '10:30',
      montantPrev: '120000000',
      delaiExecutionPrev: '120',
      nbExemplaire: 1,
      observation: 'Offre conforme'
    });
    this.addSoumission({
      numbLot: 'M-2023-0045_LOT1',
      idFournisseur: 'F-002',
      dateDepot: '2024-01-20',
      heure: '11:10',
      montantPrev: '128000000',
      delaiExecutionPrev: '130',
      nbExemplaire: 1,
      observation: 'Offre alternative'
    });
    this.launchAnalyse('M-2023-0045');
    this.recordAnalyse({
      numbLot: 'M-2023-0045_LOT1',
      idAttributairePrev: 'M-2023-0045_LOT1_Fourn_F-001',
      dateEffecReception: '2024-01-28',
      observation: 'Offre la plus économique et adaptée'
    });
    this.validateRapportAnalyse('M-2023-0045_LOT1');
    this.recordAttribution({
      idSoumissionAttribuee: 'M-2023-0045_LOT1_Fourn_F-001',
      montantEffec: '120000000',
      delaiExecutionEffec: '120',
      dateDemarage: '2024-02-01',
      datePrevFin: '2024-06-01',
      statut: 'En cours'
    });
    this.startExecution('M-2023-0045');
    this.addAvenant({
      idSoumissionAttribuee: 'M-2023-0045_LOT1_Fourn_F-001',
      numbAvenant: 'AV-001',
      montantAvenant: '15000000',
      dateProrogation: '2024-07-01'
    });
    this.closeContract('M-2023-0045');

    this.addMarche({
      numbMarche: 'M-2024-0012',
      description: 'Audit financier et comptable des exercices 2021-2023',
      nombreLot: 1,
      natureOuverture: 'Restreinte',
      financement: 'Budget 2iE',
      modePassation: 'Appel d\'offres restreint',
      demandeur: 'DAF',
      responsableSuivi: 'Responsable budget',
      sctPersons: ['SCT C'],
      datePrevReception: '2024-05-12',
      category: 'Consultance'
    });
    this.addLot({numbMarche: 'M-2024-0012', numbLot: 'M-2024-0012_LOT1', description: 'Audit des comptes 2021-2023'});

    this.addMarche({
      numbMarche: 'M-2023-0102',
      description: 'Réfection de la toiture du bâtiment administratif bloc B',
      nombreLot: 2,
      natureOuverture: 'Publique',
      financement: 'Projet campus',
      modePassation: 'Appel d\'offres ouvert',
      demandeur: 'Service Technique',
      responsableSuivi: 'Gestionnaire travaux',
      sctPersons: ['SCT D'],
      datePrevReception: '2024-02-20',
      category: 'Travaux BTP'
    });
    this.addLot({numbMarche: 'M-2023-0102', numbLot: 'M-2023-0102_LOT1', description: 'Réfection toiture hall principal'});
    this.addLot({numbMarche: 'M-2023-0102', numbLot: 'M-2023-0102_LOT2', description: 'Rénovation des chéneaux et gouttières'});
    this.addConsultation({numbLot: 'M-2023-0102_LOT1', idFournisseurs: ['F-004', 'F-005'], dateConsultation: '2024-02-25'});
    this.openReception('M-2023-0102');
  }

  private today(): string {
    return new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  private logAction(reference: string, description: string, statut: string): void {
    this.activityLog.unshift({ reference, description, date: this.today(), statut });
    if (this.activityLog.length > 8) {
      this.activityLog.length = 8;
    }
  }

  addMarche(marche: Omit<Marche, 'statut'>): void {
    const exists = this.marcheList.some((item) => item.numbMarche === marche.numbMarche.trim());
    if (exists) {
      throw new Error(`Le marché ${marche.numbMarche} existe déjà.`);
    }
    this.marcheList.push({
      ...marche,
      numbMarche: marche.numbMarche.trim(),
      statut: 'À lancer',
      category: marche.category ?? 'Autre'
    });
    this.logAction(marche.numbMarche, `Création de marché : ${marche.description}`, 'Créé');
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
    this.logAction(lot.numbMarche, `Ajout de lot ${effectiveNumbLot}`, 'Lot');
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
        this.fournisseurList.push({
          idFournisseur: id,
          raisonSociale: 'Fournisseur externe',
          domaineActivite: 'Autre',
          disposeIFU_RCCM: false,
          numIFU_RCCM: 'N/A',
          emailTel: 'N/A',
          nomPrenomRepr: 'N/A',
          statutFourn: 'Externe'
        });
      }
    });
    const existing = this.consultationList.find((item) => item.numbLot === cons.numbLot);
    if (existing) {
      existing.idFournisseurs = Array.from(new Set([...existing.idFournisseurs, ...ids]));
      existing.dateConsultation = cons.dateConsultation;
    } else {
      this.consultationList.push({ numbLot: cons.numbLot, idFournisseurs: ids, dateConsultation: cons.dateConsultation });
    }
    this.logAction(cons.numbLot, `Consultation enregistrée pour ${cons.numbLot}`, 'Consultation');
  }

  openReception(numbMarche: string): void {
    const march = this.marcheList.find((item) => item.numbMarche === numbMarche);
    if (!march) {
      throw new Error(`Le marché ${numbMarche} n'existe pas.`);
    }
    march.statut = 'Réception';
    this.logAction(numbMarche, `Réception ouverte pour le marché ${numbMarche}`, 'Réception');
  }

  validatePV(numbLot: string): void {
    const doc = this.documentList.find((item) => item.numbLot === numbLot);
    if (!doc) {
      throw new Error(`Aucun document trouvé pour le lot ${numbLot}.`);
    }
    doc.pvOuverture = 'Oui';
    this.logAction(numbLot, `PV d'ouverture validé pour ${numbLot}`, 'PV');
  }

  addFournisseur(fournisseur: Fournisseur): void {
    if (this.fournisseurList.some((item) => item.idFournisseur === fournisseur.idFournisseur)) {
      throw new Error(`Le fournisseur ${fournisseur.idFournisseur} existe déjà.`);
    }
    this.fournisseurList.push({
      ...fournisseur,
      raisonSociale: fournisseur.raisonSociale || 'N/A',
      domaineActivite: fournisseur.domaineActivite || 'Autre',
      disposeIFU_RCCM: fournisseur.disposeIFU_RCCM ?? false,
      numIFU_RCCM: fournisseur.numIFU_RCCM || 'N/A',
      emailTel: fournisseur.emailTel || 'N/A',
      nomPrenomRepr: fournisseur.nomPrenomRepr || 'N/A',
      statutFourn: fournisseur.statutFourn || 'Externe'
    });
    this.logAction(fournisseur.idFournisseur, `Ajout de fournisseur ${fournisseur.raisonSociale}`, 'Fournisseur');
  }

  addSoumission(data: Omit<Soumission, 'idSoumission' | 'rangClassement'>): void {
    const lot = this.lotList.find((item) => item.numbLot === data.numbLot);
    if (!lot) {
      throw new Error(`Le lot ${data.numbLot} n'existe pas.`);
    }
    const doc = this.documentList.find((item) => item.numbLot === data.numbLot);
    if (!doc || doc.pvOuverture !== 'Oui') {
      throw new Error('Le PV d’ouverture doit être validé avant d’enregistrer une soumission.');
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
    this.logAction(data.numbLot, `Soumission créée par ${data.idFournisseur}`, 'Soumission');
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
    this.logAction(numbMarche, `Analyse lancée pour le marché ${numbMarche}`, 'Analyse');
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
    this.logAction(analyse.numbLot, `Analyse enregistrée pour ${analyse.numbLot}`, 'Analyse');
  }

  validateRapportAnalyse(numbLot: string): void {
    const doc = this.documentList.find((item) => item.numbLot === numbLot);
    if (!doc) {
      throw new Error(`Aucun document trouvé pour le lot ${numbLot}.`);
    }
    doc.rapportAnalyse = 'Oui';
    this.logAction(numbLot, `Rapport d'analyse validé pour ${numbLot}`, 'Rapport');
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
    this.logAction(data.idSoumissionAttribuee, `Attribution enregistrée pour ${data.idSoumissionAttribuee}`, 'Attribution');
  }

  startExecution(numbMarche: string): void {
    const march = this.marcheList.find((item) => item.numbMarche === numbMarche);
    if (!march) {
      throw new Error(`Le marché ${numbMarche} n'existe pas.`);
    }
    march.statut = 'En cours';
    this.logAction(numbMarche, `Exécution démarrée pour ${numbMarche}`, 'Exécution');
  }

  addAvenant(data: Avenant): void {
    const soumission = this.soumissionList.find((item) => item.idSoumission === data.idSoumissionAttribuee);
    if (!soumission) {
      throw new Error(`Soumission ${data.idSoumissionAttribuee} introuvable.`);
    }
    this.avenantList.push(data);
    this.logAction(data.idSoumissionAttribuee, `Avenant ajouté : ${data.numbAvenant}`, 'Avenant');
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
    this.logAction(numbMarche, `Contrat clôturé pour ${numbMarche}`, 'Clôture');
  }
}
