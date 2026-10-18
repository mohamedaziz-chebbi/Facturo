const L = { cur: 'fr' };
const I18N = {
fr: {
nav_dash:'Tableau de bord',nav_docs:'Documents',nav_ninv:'Nouvelle facture',nav_nquo:'Nouveau devis',nav_set:'Paramètres',dev:'Développé par',
s_inv:'Factures',s_quo:'Devis',s_tot:'Total facturé',s_paid:'Payé',s_unpaid:'Impayé',recent:'Documents récents',empty:'Aucun document pour le moment.',
invoice:'Facture',quote:'Devis',st_draft:'Brouillon',st_unpaid:'Impayée',st_paid:'Payée',st_overdue:'En retard',
search:'Rechercher (numéro, client)',all:'Tous',sort_date:'Date',sort_num:'Numéro',sort_amt:'Montant',
edit:'Modifier',dup:'Dupliquer',del:'Supprimer',print:'Imprimer / PDF',markpaid:'Marquer payée',markunpaid:'Marquer impayée',convert:'Convertir en facture',
confirm_del:'Supprimer ce document ?',saved:'Document enregistré.',err_client:'Le nom du client est requis.',err_items:'Ajoutez au moins une ligne valide.',err_dates:'Dates invalides.',err_logo:'Logo invalide (PNG/JPEG/WebP, 500 Ko max).',err_storage:'Échec de l’enregistrement local.',saved_set:'Paramètres enregistrés.',converted:'Devis converti en facture.',
f_company:'Votre entreprise',f_client:'Client',l_name:'Nom',l_company:'Société',l_address:'Adresse',l_email:'E-mail',l_phone:'Téléphone',l_taxId:'Identifiant fiscal',
l_number:'Numéro',l_issue:'Date d’émission',l_due:'Échéance',l_valid:'Valable jusqu’au',l_cur:'Devise',l_status:'Statut',l_paid:'Montant payé',
f_items:'Lignes',f_desc:'Description',f_qty:'Qté',f_price:'Prix unitaire',f_disc:'Remise %',f_tax:'TVA %',f_add:'Ajouter une ligne',l_notes:'Notes et conditions',
subtotal:'Sous-total',discount:'Remises',tax:'Taxes',total:'Total',paidl:'Payé',balance:'Reste à payer',bill_to:'Facturé à',pay_info:'Informations de paiement',
save:'Enregistrer',back:'Retour',set_title:'Paramètres',set_logo:'Logo',set_cur:'Devise par défaut',set_tax:'Taux de taxe par défaut %',set_pi:'Préfixe factures',set_pq:'Préfixe devis',set_terms:'Conditions de paiement par défaut',set_pay:'Informations de paiement',
set_note:'Configurez les taux et informations fiscales selon la réglementation applicable. Facturo ne garantit pas la conformité légale. Les données restent dans ce navigateur (localStorage, non chiffré).',
foot:'Merci de votre confiance.'},
en: {
nav_dash:'Dashboard',nav_docs:'Documents',nav_ninv:'New invoice',nav_nquo:'New quotation',nav_set:'Settings',dev:'Developed by',
s_inv:'Invoices',s_quo:'Quotations',s_tot:'Total invoiced',s_paid:'Paid',s_unpaid:'Unpaid',recent:'Recent documents',empty:'No documents yet.',
invoice:'Invoice',quote:'Quotation',st_draft:'Draft',st_unpaid:'Unpaid',st_paid:'Paid',st_overdue:'Overdue',
search:'Search (number, client)',all:'All',sort_date:'Date',sort_num:'Number',sort_amt:'Amount',
edit:'Edit',dup:'Duplicate',del:'Delete',print:'Print / PDF',markpaid:'Mark paid',markunpaid:'Mark unpaid',convert:'Convert to invoice',
confirm_del:'Delete this document?',saved:'Document saved.',err_client:'Client name is required.',err_items:'Add at least one valid line.',err_dates:'Invalid dates.',err_logo:'Invalid logo (PNG/JPEG/WebP, max 500 KB).',err_storage:'Local save failed.',saved_set:'Settings saved.',converted:'Quotation converted to invoice.',
f_company:'Your company',f_client:'Client',l_name:'Name',l_company:'Company',l_address:'Address',l_email:'Email',l_phone:'Phone',l_taxId:'Tax ID',
l_number:'Number',l_issue:'Issue date',l_due:'Due date',l_valid:'Valid until',l_cur:'Currency',l_status:'Status',l_paid:'Amount paid',
f_items:'Items',f_desc:'Description',f_qty:'Qty',f_price:'Unit price',f_disc:'Discount %',f_tax:'Tax %',f_add:'Add item',l_notes:'Notes & terms',
subtotal:'Subtotal',discount:'Discounts',tax:'Tax',total:'Total',paidl:'Paid',balance:'Balance due',bill_to:'Bill to',pay_info:'Payment information',
save:'Save',back:'Back',set_title:'Settings',set_logo:'Logo',set_cur:'Default currency',set_tax:'Default tax rate %',set_pi:'Invoice prefix',set_pq:'Quotation prefix',set_terms:'Default payment terms',set_pay:'Payment information',
set_note:'Configure tax rates and fiscal information according to your applicable regulations. Facturo does not guarantee legal compliance. Data stays in this browser (localStorage, not encrypted).',
foot:'Thank you for your business.'}
};
const t = k => (I18N[L.cur] && I18N[L.cur][k]) || k;
