import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('medals')
    .del()
    .then(() => {
      return knex('medals').insert([
        // GLOBAL
        {
          tag: 'global_answer_submit_speed',
          type: 'global',
          plan_id: 0,
          is_global: true,
          default_weight: 5,
          is_countable: true,
        },
        {
          tag: 'global_camera_over_mic',
          type: 'global',
          plan_id: 0,
          is_global: true,
          default_weight: 4,
          is_countable: false,
        },

        // TEXT ANSWER text_writing_speed text_keywords text_self_review did_skip_self_review
        {
          tag: 'text_writing_speed',
          type: 'text_answer',
          plan_id: 0,
          is_global: false,
          default_weight: 6,
          is_countable: true,
        },
        {
          tag: 'text_keywords',
          type: 'text_answer',
          plan_id: 0,
          is_global: false,
          default_weight: 6,
          is_countable: true,
        },
        {
          tag: 'text_self_review',
          type: 'text_answer',
          plan_id: 0,
          is_global: false,
          default_weight: 6,
          is_countable: true,
        },
        {
          tag: 'text_did_skip_self_review',
          type: 'text_answer',
          plan_id: 0,
          is_global: false,
          default_weight: 2,
          is_countable: false,
        },

        // AUDIO ANSWER audio_face_emotions audio_talking_speed audio_talking_pauses audio_keywords audio_self_review
        {
          tag: 'audio_face_emotions',
          type: 'speak_answer',
          plan_id: 0,
          is_global: false,
          default_weight: 6,
          is_countable: true,
        },
        {
          tag: 'audio_talking_speed',
          type: 'speak_answer',
          plan_id: 0,
          is_global: false,
          default_weight: 6,
          is_countable: true,
        },
        {
          tag: 'audio_talking_pauses',
          type: 'speak_answer',
          plan_id: 0,
          is_global: false,
          default_weight: 6,
          is_countable: true,
        },
        {
          tag: 'audio_keywords',
          type: 'speak_answer',
          plan_id: 0,
          is_global: false,
          default_weight: 6,
          is_countable: true,
        },
        {
          tag: 'audio_self_review',
          type: 'speak_answer',
          plan_id: 0,
          is_global: false,
          default_weight: 6,
          is_countable: true,
        },
        {
          tag: 'audio_did_skip_self_review',
          type: 'speak_answer',
          plan_id: 0,
          is_global: false,
          default_weight: 2,
          is_countable: false,
        },

        // SELECT ONE ANSWER select_one_correct_option select_one_did_skip select_one_self_review did_skip_self_review
        {
          tag: 'select_one_correct_option',
          type: 'select_one',
          plan_id: 0,
          is_global: false,
          default_weight: 6,
          is_countable: true,
        },
        {
          tag: 'select_one_did_skip',
          type: 'select_one',
          plan_id: 0,
          is_global: false,
          default_weight: 2,
          is_countable: false,
        },
        {
          tag: 'select_one_self_review',
          type: 'select_one',
          plan_id: 0,
          is_global: false,
          default_weight: 6,
          is_countable: true,
        },
        {
          tag: 'select_one_did_skip_self_review',
          type: 'select_one',
          plan_id: 0,
          is_global: false,
          default_weight: 2,
          is_countable: false,
        },

        // SELECT MANY ANSWER select_many_correct_option select_many_did_skip select_many_self_review did_skip_self_review
        {
          tag: 'select_many_correct_option',
          type: 'select_many',
          plan_id: 0,
          is_global: false,
          default_weight: 6,
          is_countable: true,
        },
        {
          tag: 'select_many_did_skip',
          type: 'select_many',
          plan_id: 0,
          is_global: false,
          default_weight: 2,
          is_countable: false,
        },
        {
          tag: 'select_many_self_review',
          type: 'select_many',
          plan_id: 0,
          is_global: false,
          default_weight: 6,
          is_countable: true,
        },
        {
          tag: 'select_many_did_skip_self_review',
          type: 'select_many',
          plan_id: 0,
          is_global: false,
          default_weight: 2,
          is_countable: false,
        },
      ]);
    });
}
