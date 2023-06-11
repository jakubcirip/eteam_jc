import { Column, Table } from '@wwwouter/typed-knex';

@Table('company')
export class TableCompany {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'email' })
  email: string;
  @Column({ name: 'tokens' })
  tokens: number;
  @Column({ name: 'pass' })
  pass: string;
  @Column({ name: 'sub_model' })
  subModel: number;
  @Column({ name: 'domain' })
  domain: string;
  @Column({ name: 'auth_key' })
  authKey: string | null;
  @Column({ name: 'activation_code' })
  activationCode: string | null;
  @Column({ name: 'reset_pass_at' })
  resetPassAt: string | null;
  @Column({ name: 'reset_pass_key' })
  resetPassKey: string | null;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('hr_email_templates')
export class TableHrEmailTemplates {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'type' })
  type: string;
  @Column({ name: 'content' })
  content: string;
}
@Table('hr_email_templates_catalog')
export class TableHrEmailTemplatesCatalog {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'cat_id' })
  catId: string;
  @Column({ name: 'plan_id' })
  planId: number;
  @Column({ name: 'likes' })
  likes: number;
  @Column({ name: 'downloads' })
  downloads: number;
  @Column({ name: 'desc' })
  desc: string;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('hr_form_templates_catalog')
export class TableHrFormTemplatesCatalog {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'cat_id' })
  catId: string;
  @Column({ name: 'plan_id' })
  planId: number;
  @Column({ name: 'likes' })
  likes: number;
  @Column({ name: 'downloads' })
  downloads: number;
  @Column({ name: 'desc' })
  desc: string;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('interview_delete')
export class TableInterviewDelete {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'delete_at' })
  deleteAt: Date | null;
  @Column({ name: 'folder_name' })
  folderName: string;
}
@Table('job_positions_forms_templates')
export class TableJobPositionsFormsTemplates {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'data' })
  data: string;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('knex_migrations')
export class TableKnexMigrations {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'name' })
  name: string | null;
  @Column({ name: 'batch' })
  batch: number | null;
  @Column({ name: 'migration_time' })
  migrationTime: Date;
}
@Table('knex_migrations_lock')
export class TableKnexMigrationsLock {
  @Column({ name: 'index', primary: true })
  index: number;
  @Column({ name: 'is_locked' })
  isLocked: number | null;
}
@Table('medals')
export class TableMedals {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'tag' })
  tag: string;
  @Column({ name: 'type' })
  type: string;
  @Column({ name: 'plan_id' })
  planId: number;
  @Column({ name: 'is_global' })
  isGlobal: number;
  @Column({ name: 'default_weight' })
  defaultWeight: number;
  @Column({ name: 'is_countable' })
  isCountable: number;
}
@Table('division')
export class TableDivision {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'company_id' })
  companyId: TableCompany;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'tag' })
  tag: string;
  @Column({ name: 'mail_pass' })
  mailPass: string;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('hr_email_templates_catalog_data')
export class TableHrEmailTemplatesCatalogData {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'catalog_id' })
  catalogId: TableHrEmailTemplatesCatalog;
  @Column({ name: 'type' })
  type: string;
  @Column({ name: 'subject' })
  subject: string;
  @Column({ name: 'email' })
  email: string;
  @Column({ name: 'attachments' })
  attachments: string;
}
@Table('hr_form_templates_catalog_data')
export class TableHrFormTemplatesCatalogData {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'catalog_id' })
  catalogId: TableHrFormTemplatesCatalog;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'lang_code' })
  langCode: string;
  @Column({ name: 'data' })
  data: string;
}
@Table('support')
export class TableSupport {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'company_id' })
  companyId: TableCompany;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'email' })
  email: string;
  @Column({ name: 'subject' })
  subject: string;
  @Column({ name: 'description' })
  description: string;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('hr_emails')
export class TableHrEmails {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'division_id' })
  divisionId: TableDivision;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'type' })
  type: string | null;
  @Column({ name: 'subject' })
  subject: string | null;
  @Column({ name: 'content' })
  content: string | null;
  @Column({ name: 'attachments' })
  attachments: string;
}
@Table('hrs')
export class TableHrs {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'company_id' })
  companyId: TableCompany;
  @Column({ name: 'division_id' })
  divisionId: TableDivision;
  @Column({ name: 'time_tracker' })
  timeTracker: number;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'email' })
  email: string;
  @Column({ name: 'pass' })
  pass: string | null;
  @Column({ name: 'activation_code' })
  activationCode: string | null;
  @Column({ name: 'auth_key' })
  authKey: string | null;
  @Column({ name: 'reset_pass_at' })
  resetPassAt: string | null;
  @Column({ name: 'reset_pass_key' })
  resetPassKey: string | null;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('job_interviews_people')
export class TableJobInterviewsPeople {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'division_id' })
  divisionId: TableDivision;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'tag' })
  tag: string;
  @Column({ name: 'email' })
  email: string;
  @Column({ name: 'type' })
  type: string;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('job_positions')
export class TableJobPositions {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'company_id' })
  companyId: TableCompany;
  @Column({ name: 'division_id' })
  divisionId: TableDivision;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('hr_email_templates_catalog_likes')
export class TableHrEmailTemplatesCatalogLikes {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'catalog_id' })
  catalogId: TableHrEmailTemplatesCatalog;
  @Column({ name: 'hr_id' })
  hrId: TableHrs;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('hr_form_templates_catalog_likes')
export class TableHrFormTemplatesCatalogLikes {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'catalog_id' })
  catalogId: TableHrFormTemplatesCatalog;
  @Column({ name: 'hr_id' })
  hrId: TableHrs;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('job_positions_forms')
export class TableJobPositionsForms {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'job_position_id' })
  jobPositionId: TableJobPositions;
  @Column({ name: 'division_id' })
  divisionId: TableDivision;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'lang_code' })
  langCode: string;
  @Column({ name: 'data' })
  data: string;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('mails')
export class TableMails {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'email' })
  email: string;
  @Column({ name: 'attempt' })
  attempt: number;
  @Column({ name: 'type' })
  type: string;
  @Column({ name: 'data' })
  data: string;
  @Column({ name: 'success' })
  success: number | null;
  @Column({ name: 'hr_email_id' })
  hrEmailId: TableHrEmails | null;
  @Column({ name: 'division_sender_id' })
  divisionSenderId: TableDivision | null;
}
@Table('job_interviews')
export class TableJobInterviews {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'division_id' })
  divisionId: TableDivision;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'tag' })
  tag: string;
  @Column({ name: 'test_user_tag' })
  testUserTag: string;
  @Column({ name: 'prelog' })
  prelog: string | null;
  @Column({ name: 'job_position_id' })
  jobPositionId: TableJobPositions | null;
  @Column({ name: 'job_position_form_id' })
  jobPositionFormId: TableJobPositionsForms | null;
  @Column({ name: 'dark' })
  dark: number;
  @Column({ name: 'color' })
  color: string;
  @Column({ name: 'image' })
  image: string;
  @Column({ name: 'state' })
  state: string;
  @Column({ name: 'start_at' })
  startAt: Date | null;
  @Column({ name: 'finish_at' })
  finishAt: Date | null;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('job_interviews_weight')
export class TableJobInterviewsWeight {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'form_id' })
  formId: TableJobPositionsForms;
  @Column({ name: 'medal_id' })
  medalId: TableMedals;
  @Column({ name: 'qp_uuid' })
  qpUuid: string | null;
  @Column({ name: 'weight' })
  weight: number;
}
@Table('division_intwerview_history')
export class TableDivisionIntwerviewHistory {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'company_id' })
  companyId: TableCompany;
  @Column({ name: 'division_id' })
  divisionId: TableDivision;
  @Column({ name: 'hr_id' })
  hrId: TableHrs;
  @Column({ name: 'int_id' })
  intId: TableJobInterviews;
  @Column({ name: 'tokens_spent' })
  tokensSpent: number;
  @Column({ name: 'plan_used' })
  planUsed: number;
  @Column({ name: 'candidates_amount' })
  candidatesAmount: number;
  @Column({ name: 'started_at' })
  startedAt: Date;
  @Column({ name: 'ended_at' })
  endedAt: Date | null;
  @Column({ name: 'status' })
  status: string;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('job_interviews_candidates')
export class TableJobInterviewsCandidates {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'division_id' })
  divisionId: TableDivision;
  @Column({ name: 'job_interview_id' })
  jobInterviewId: TableJobInterviews;
  @Column({ name: 'job_interview_person_id' })
  jobInterviewPersonId: TableJobInterviewsPeople;
  @Column({ name: 'type' })
  type: string;
  @Column({ name: 'email_uid' })
  emailUid: string | null;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
@Table('job_interviews_data')
export class TableJobInterviewsData {
  @Column({ name: 'id', primary: true })
  id: number;
  @Column({ name: 'int_id' })
  intId: TableJobInterviews;
  @Column({ name: 'type' })
  type: string;
  @Column({ name: 'date' })
  date: Date | null;
  @Column({ name: 'mail_id' })
  mailId: TableHrEmails | null;
  @Column({ name: 'created_at' })
  createdAt: Date;
}
