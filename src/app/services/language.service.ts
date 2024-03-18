// language.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  // Déclarez votre variable BehaviorSubject
  private maVariableSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private currentLang: string = 'fr';
  public translations: any = {};
  langue_en_cours: any = 'fr';
  // language
  welcome_message: string = '';
  welcome_message_sub_title: string = '';
  bloc_title: string = '';
  bloc_sub_title: string = '';
  stat_title_1: string = '';
  stat_title_2: string = '';
  stat_title_3: string = '';
  stat_title_4: string = '';
  footer_1: string = '';
  footer_2: string = '';
  header_search_bar: string = '';
  header_brightness_btn_title: string = '';
  header_brightness_btn_sub_title_1: string = '';
  header_brightness_btn_sub_title_2: string = '';
  header_brightness_btn_sub_title_3: string = '';
  header_notification_btn_title: string = '';
  header_notification_nbre_title: string = '';
  header_notification_empty: string = '';
  header_disconnection: string = '';
  header_badge_1: string = '';
  header_badge_2: string = '';
  sidebar_menu_1: string = '';
  sidebar_menu_2: string = '';
  sidebar_menu_3: string = '';
  sidebar_menu_4: string = '';
  sidebar_menu_5: string = '';
  reclam_title: string = '';
  reclam_sub_title_op: string = '';
  reclam_sub_title_list_op: string = '';
  reclam_sub_title_list_op_2: string = '';
  reclam_placeholder_search_bar_op: string = '';
  reclam_list_title: string = '';
  reclam_engr_title: string = '';
  reclam_engr_bloc_title: string = '';
  reclam_engr_bloc_title_2: string = '';
  type_reclam: string = '';
  mode_collecte: string = '';
  descript_reclam: string = '';
  suivi_reclam: string = '';
  suivi_reclam_sub_tutle: string = '';
  traitement_requete: string = '';
  champ_obj_title: string = '';
  fichier_joint_req: string = '';
  btn_valider: string = '';
  info_sur_client_title: string = '';
  consult_avis: string = '';
  form: string = '';
  info_perso: string = '';
  num_cpte_client: string = '';
  placeholder_nom_prenoms: string = '';
  chmp_telephone: string = '';
  chmp_locate: string = '';
  chmp_nom_agent: string = '';
  champ_satisfaction_title: string = '';
  reclam_engr_sub_title: string = '';
  reclam_list_sub_title: string = '';
  Preview: string = '';
  reclam_list_group_title_1: string = '';
  reclam_list_group_title_2: string = '';
  reclam_list_group_title_3: string = '';
  reclam_list_group_title_4: string = '';
  reclam_action_engr_1: string = '';
  reclam_action_engr_2: string = '';
  reclam_action_encrs_1: string = '';
  reclam_action_encrs_2: string = '';
  reclam_action_encrs_3: string = '';
  reclam_action_clo_1: string = '';
  reclam_action_clo_2: string = '';
  reclam_action_clo_3: string = '';
  relance_title: string = '';
  relance_sub_title: string = '';
  relance_list_title: string = '';
  relance_table_title_1: string = '';
  relance_table_title_2: string = '';
  relance_table_title_3: string = '';
  relance_table_title_4: string = '';
  export_btn: string = '';
  op_title: string = '';
  op_btn_title_1: string = '';
  op_btn_title_2: string = '';
  op_chmp_title_1: string = '';
  op_chmp_title_2: string = '';
  op_chmp_title_3: string = '';
  op_chmp_title_4: string = '';
  op_chmp_title_5: string = '';
  op_chmp_title_6: string = '';
  op_chmp_title_7: string = '';
  op_btn_engr_1: string = '';
  op_btn_engr_2: string = '';
  op_table_title_1: string = '';
  op_table_title_2: string = '';
  op_table_title_3: string = '';
  op_table_title_4: string = '';
  op_list_title: string = '';
  op_plus_title: string = '';
  op_plus_sub_title: string = '';
  op_plus_status: string = '';
  edit_title: string = '';
  edit_sub_title: string = '';
  edit_list_title: string = '';
  edit_btn_confirm: string = '';
  avis_recev_title: string = '';
  avis_recev_sub_title: string = '';
  avis_recev_chmp_title_1: string = '';
  avis_recev_chmp_title_2_placeholder: string = '';
  chmp_date_start: string = '';
  chmp_date_start_placeholder: string = '';
  chmp_date_end: string = '';
  chmp_date_end_placeholder: string = '';
  btn_title_submit: string = '';
  btn_title_reset: string = '';
  btn_title_to_modify: string = '';
  btn_title_cancel: string = '';
  info_cli_title: string = '';
  info_cli_sub_title_1: string = '';
  info_cli_sub_title_2: string = '';
  info_cli_sub_title_3: string = '';
  attr_reclam_title: string = '';
  attr_reclam_sub_title: string = '';
  attr_reclam_message_1: string = '';
  attr_reclam_message_1_btn: string = '';
  attr_chmp_title_1: string = '';
  attr_chmp_title_2: string = '';
  attr_reclam_message_2: string = '';
  consult_trai_title: string = '';
  consult_trai_sub_title: string = '';
  consult_trai_message: string = '';
  consult_trai_message_empty: string = '';
  step_treatment_1: string = '';
  step_treatment_2: string = '';
  step_treatment_3: string = '';
  step_treatment_4: string = '';
  step_treatment_5: string = '';
  step_treatment_6: string = '';
  step_treatment_7: string = '';
  step_treatment_8: string = '';
  step_treatment_9: string = '';
  clo_def_title: string = '';
  clo_def_sub_title: string = '';
  clo_def_title_step: string = '';
  chmp_observation: string = '';
  placeholder_description: string = '';
  btn_title_to_enclose: string = '';
  ann_clo_def_title: string = '';
  ann_clo_def_sub_title: string = '';
  ann_clo_def_chmp_title: string = '';
  ann_clo_def_btn_title: string = '';
  btn_consult: string = '';
  btn_engr: string = '';

  constructor(private http: HttpClient) {
    this.setLanguage('fr'); // Set default language
    this.updateTranslations();
  }

  public setLanguage(lang: string): void {
    this.currentLang = lang;
    this.langue_en_cours = lang;
    this.loadTranslations();
  }

  public getTranslation(key: string): string {
    return this.translations[key] || key;
  }

  private loadTranslations(): void {
    this.http.get(`assets/i18n/${this.currentLang}.json`).subscribe(
      (translations: any) => {
        this.translations = translations;

        this.setMaVariable(true);

        this.updateTranslations();
      },
      (error) => {
        console.error(
          `Failed to load translations for ${this.currentLang}.`,
          error
        );
      }
    );
  }

  public loadTranslations_2(current_lang: any): void {
    this.http.get(`assets/i18n/${current_lang}.json`).subscribe(
      (translations: any) => {
        return (this.translations = translations);

        // this.updateTranslations();
      },
      (error) => {
        console.error(
          `Failed to load translations for ${this.currentLang}.`,
          error
        );
      }
    );
  }

  // language
  changeLanguage(lang: string): void {
    this.langue_en_cours = lang;
    this.setLanguage(lang);
    // this.updateTranslations();
  }

  private updateTranslations(): void {
    this.welcome_message = this.getTranslation('welcome_message');
    this.welcome_message_sub_title = this.getTranslation(
      'welcome_message_sub_title'
    );
    this.bloc_title = this.getTranslation('bloc_title');
    this.bloc_sub_title = this.getTranslation('bloc_sub_title');
    this.stat_title_1 = this.getTranslation('stat_title_1');
    this.stat_title_2 = this.getTranslation('stat_title_2');
    this.stat_title_3 = this.getTranslation('stat_title_3');
    this.stat_title_4 = this.getTranslation('stat_title_4');
    this.footer_1 = this.getTranslation('footer_1');
    this.footer_2 = this.getTranslation('footer_2');
    this.header_search_bar = this.getTranslation('header_search_bar');
    this.header_brightness_btn_title = this.getTranslation(
      'header_brightness_btn_title'
    );
    this.header_brightness_btn_sub_title_1 = this.getTranslation(
      'header_brightness_btn_sub_title_1'
    );
    this.header_brightness_btn_sub_title_2 = this.getTranslation(
      'header_brightness_btn_sub_title_2'
    );
    this.header_brightness_btn_sub_title_3 = this.getTranslation(
      'header_brightness_btn_sub_title_3'
    );
    this.header_notification_btn_title = this.getTranslation(
      'header_notification_btn_title'
    );
    this.header_notification_nbre_title = this.getTranslation(
      'header_notification_nbre_title'
    );
    this.header_notification_empty = this.getTranslation(
      'header_notification_empty'
    );
    this.header_disconnection = this.getTranslation('header_disconnection');
    this.header_badge_1 = this.getTranslation('header_badge_1');
    this.header_badge_2 = this.getTranslation('header_badge_2');
    this.sidebar_menu_1 = this.getTranslation('sidebar_menu_1');
    this.sidebar_menu_2 = this.getTranslation('sidebar_menu_2');
    this.sidebar_menu_3 = this.getTranslation('sidebar_menu_3');
    this.sidebar_menu_4 = this.getTranslation('sidebar_menu_4');
    this.sidebar_menu_5 = this.getTranslation('sidebar_menu_5');
    this.reclam_title = this.getTranslation('reclam_title');
    this.reclam_sub_title_op = this.getTranslation('reclam_sub_title_op');
    this.reclam_sub_title_list_op = this.getTranslation(
      'reclam_sub_title_list_op'
    );
    this.reclam_sub_title_list_op_2 = this.getTranslation(
      'reclam_sub_title_list_op_2'
    );
    this.reclam_placeholder_search_bar_op = this.getTranslation(
      'reclam_placeholder_search_bar_op'
    );
    this.reclam_engr_title = this.getTranslation('reclam_engr_title');
    this.reclam_engr_bloc_title = this.getTranslation('reclam_engr_bloc_title');
    this.reclam_engr_bloc_title_2 = this.getTranslation(
      'reclam_engr_bloc_title_2'
    );
    this.type_reclam = this.getTranslation('type_reclam');
    this.mode_collecte = this.getTranslation('mode_collecte');
    this.descript_reclam = this.getTranslation('descript_reclam');
    this.suivi_reclam = this.getTranslation('suivi_reclam');
    this.suivi_reclam_sub_tutle = this.getTranslation('suivi_reclam_sub_tutle');
    this.traitement_requete = this.getTranslation('traitement_requete');
    this.champ_obj_title = this.getTranslation('champ_obj_title');
    this.fichier_joint_req = this.getTranslation('fichier_joint_req');
    this.btn_valider = this.getTranslation('btn_valider');
    this.info_sur_client_title = this.getTranslation('info_sur_client_title');
    this.consult_avis = this.getTranslation('consult_avis');
    this.form = this.getTranslation('form');
    this.info_perso = this.getTranslation('info_perso');
    this.num_cpte_client = this.getTranslation('num_cpte_client');
    this.placeholder_nom_prenoms = this.getTranslation(
      'placeholder_nom_prenoms'
    );
    this.chmp_telephone = this.getTranslation('chmp_telephone');
    this.chmp_locate = this.getTranslation('chmp_locate');
    this.chmp_nom_agent = this.getTranslation('chmp_nom_agent');
    this.champ_satisfaction_title = this.getTranslation(
      'champ_satisfaction_title'
    );
    this.reclam_engr_sub_title = this.getTranslation('reclam_engr_sub_title');
    this.reclam_list_title = this.getTranslation('reclam_list_title');
    this.reclam_list_sub_title = this.getTranslation('reclam_list_sub_title');
    this.Preview = this.getTranslation('Preview');
    this.reclam_list_group_title_1 = this.getTranslation(
      'reclam_list_group_title_1'
    );
    this.reclam_list_group_title_2 = this.getTranslation(
      'reclam_list_group_title_2'
    );
    this.reclam_list_group_title_3 = this.getTranslation(
      'reclam_list_group_title_3'
    );
    this.reclam_list_group_title_4 = this.getTranslation(
      'reclam_list_group_title_4'
    );
    this.reclam_action_engr_1 = this.getTranslation('reclam_action_engr_1');
    this.reclam_action_engr_2 = this.getTranslation('reclam_action_engr_2');
    this.reclam_action_encrs_1 = this.getTranslation('reclam_action_encrs_1');
    this.reclam_action_encrs_2 = this.getTranslation('reclam_action_encrs_2');
    this.reclam_action_encrs_3 = this.getTranslation('reclam_action_encrs_3');
    this.reclam_action_clo_1 = this.getTranslation('reclam_action_clo_1');
    this.reclam_action_clo_2 = this.getTranslation('reclam_action_clo_2');
    this.reclam_action_clo_3 = this.getTranslation('reclam_action_clo_3');
    this.relance_title = this.getTranslation('relance_title');
    this.relance_sub_title = this.getTranslation('relance_sub_title');
    this.relance_list_title = this.getTranslation('relance_list_title');
    this.relance_table_title_1 = this.getTranslation('relance_table_title_1');
    this.relance_table_title_2 = this.getTranslation('relance_table_title_2');
    this.relance_table_title_3 = this.getTranslation('relance_table_title_3');
    this.relance_table_title_4 = this.getTranslation('relance_table_title_4');
    this.export_btn = this.getTranslation('export_btn');
    this.op_title = this.getTranslation('op_title');
    this.op_btn_title_1 = this.getTranslation('op_btn_title_1');
    this.op_btn_title_2 = this.getTranslation('op_btn_title_2');
    this.op_chmp_title_1 = this.getTranslation('op_chmp_title_1');
    this.op_chmp_title_2 = this.getTranslation('op_chmp_title_2');
    this.op_chmp_title_3 = this.getTranslation('op_chmp_title_3');
    this.op_chmp_title_4 = this.getTranslation('op_chmp_title_4');
    this.op_chmp_title_5 = this.getTranslation('op_chmp_title_5');
    this.op_chmp_title_6 = this.getTranslation('op_chmp_title_6');
    this.op_chmp_title_7 = this.getTranslation('op_chmp_title_7');
    this.op_btn_engr_1 = this.getTranslation('op_btn_engr_1');
    this.op_btn_engr_2 = this.getTranslation('op_btn_engr_2');
    this.op_table_title_1 = this.getTranslation('op_table_title_1');
    this.op_table_title_2 = this.getTranslation('op_table_title_2');
    this.op_table_title_3 = this.getTranslation('op_table_title_3');
    this.op_table_title_4 = this.getTranslation('op_table_title_4');
    this.op_list_title = this.getTranslation('op_list_title');
    this.op_plus_title = this.getTranslation('op_plus_title');
    this.op_plus_sub_title = this.getTranslation('op_plus_sub_title');
    this.op_plus_status = this.getTranslation('op_plus_status');
    this.edit_title = this.getTranslation('edit_title');
    this.edit_sub_title = this.getTranslation('edit_sub_title');
    this.edit_list_title = this.getTranslation('edit_list_title');
    this.edit_btn_confirm = this.getTranslation('edit_btn_confirm');
    this.avis_recev_title = this.getTranslation('avis_recev_title');
    this.avis_recev_sub_title = this.getTranslation('avis_recev_sub_title');
    this.avis_recev_chmp_title_1 = this.getTranslation(
      'avis_recev_chmp_title_1'
    );
    this.avis_recev_chmp_title_2_placeholder = this.getTranslation(
      'avis_recev_chmp_title_2_placeholder'
    );
    this.chmp_date_start = this.getTranslation('chmp_date_start');
    this.chmp_date_start_placeholder = this.getTranslation(
      'chmp_date_start_placeholder'
    );
    this.chmp_date_end = this.getTranslation('chmp_date_end');
    this.chmp_date_end_placeholder = this.getTranslation(
      'chmp_date_end_placeholder'
    );
    this.btn_title_submit = this.getTranslation('btn_title_submit');
    this.btn_title_reset = this.getTranslation('btn_title_reset');
    this.btn_title_to_modify = this.getTranslation('btn_title_to_modify');
    this.btn_title_cancel = this.getTranslation('btn_title_cancel');
    this.info_cli_title = this.getTranslation('info_cli_title');
    this.info_cli_sub_title_1 = this.getTranslation('info_cli_sub_title_1');
    this.info_cli_sub_title_2 = this.getTranslation('info_cli_sub_title_2');
    this.info_cli_sub_title_3 = this.getTranslation('info_cli_sub_title_3');
    this.attr_reclam_title = this.getTranslation('attr_reclam_title');
    this.attr_reclam_sub_title = this.getTranslation('attr_reclam_sub_title');
    this.attr_reclam_message_1 = this.getTranslation('attr_reclam_message_1');
    this.attr_reclam_message_1_btn = this.getTranslation(
      'attr_reclam_message_1_btn'
    );
    this.attr_chmp_title_1 = this.getTranslation('attr_chmp_title_1');
    this.attr_chmp_title_2 = this.getTranslation('attr_chmp_title_2');
    this.attr_reclam_message_2 = this.getTranslation('attr_reclam_message_2');
    this.consult_trai_title = this.getTranslation('consult_trai_title');
    this.consult_trai_sub_title = this.getTranslation('consult_trai_sub_title');
    this.consult_trai_message = this.getTranslation('consult_trai_message');
    this.consult_trai_message_empty = this.getTranslation(
      'consult_trai_message_empty'
    );
    this.step_treatment_1 = this.getTranslation('step_treatment_1');
    this.step_treatment_2 = this.getTranslation('step_treatment_2');
    this.step_treatment_3 = this.getTranslation('step_treatment_3');
    this.step_treatment_4 = this.getTranslation('step_treatment_4');
    this.step_treatment_5 = this.getTranslation('step_treatment_5');
    this.step_treatment_6 = this.getTranslation('step_treatment_6');
    this.step_treatment_7 = this.getTranslation('step_treatment_7');
    this.step_treatment_8 = this.getTranslation('step_treatment_8');
    this.step_treatment_9 = this.getTranslation('step_treatment_9');
    this.clo_def_title = this.getTranslation('clo_def_title');
    this.clo_def_sub_title = this.getTranslation('clo_def_sub_title');
    this.clo_def_title_step = this.getTranslation('clo_def_title_step');
    this.chmp_observation = this.getTranslation('chmp_observation');
    this.placeholder_description = this.getTranslation(
      'placeholder_description'
    );
    this.btn_title_to_enclose = this.getTranslation('btn_title_to_enclose');
    this.ann_clo_def_title = this.getTranslation('ann_clo_def_title');
    this.ann_clo_def_sub_title = this.getTranslation('ann_clo_def_sub_title');
    this.ann_clo_def_chmp_title = this.getTranslation('ann_clo_def_chmp_title');
    this.ann_clo_def_btn_title = this.getTranslation('ann_clo_def_btn_title');
    this.btn_consult = this.getTranslation('btn_consult');
    this.btn_engr = this.getTranslation('btn_engr');
  }
  // language

  // Méthode pour modifier la variable
  setMaVariable(value: boolean): void {
    this.maVariableSubject.next(value);
  }

  // Méthode pour obtenir le flux observable de la variable
  getMaVariableObservable(): Observable<boolean> {
    return this.maVariableSubject.asObservable();
  }
}
