import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('job_positions_forms')
    .del()
    .then(() => {
      return knex('job_positions_forms').insert([
        {
          id: 1,
          job_position_id: 1,
          division_id: 1,
          name: 'JD - Node.JS',
          created_at: new Date(),
          lang_code: 'en-GB',
          data:
            '{"pairs":[{"uuid":"d055b6f6-f3f6-47f6-8f3f-d4503def6dc4","name":"QP1","q":{"langObj":{"default":{"value":"en-GB","displayValue":"English (United Kingdom)"},"langs":[{"code":"af-ZA","name":"Afrikaans"},{"code":"sq","name":"Albanian"},{"code":"ar-AE","name":"Arabic"},{"code":"hy","name":"Armenian"},{"code":"bn-BD","name":"Bengali (Bangladesh)"},{"code":"bn-IN","name":"Bengali (India)"},{"code":"bs","name":"Bosnian"},{"code":"my","name":"Burmese (Myanmar)"},{"code":"ca-ES","name":"Catalan"},{"code":"cmn-Hant-TW","name":"Chinese"},{"code":"hr-HR","name":"Croatian"},{"code":"cs-CZ","name":"Czech"},{"code":"da-DK","name":"Danish"},{"code":"nl-NL","name":"Dutch"},{"code":"en-AU","name":"English (Australia)"},{"code":"en-GB","name":"English (United Kingdom)"},{"code":"en-US","name":"English (United States)"},{"code":"eo","name":"Esperanto"},{"code":"fil-PH","name":"Filipino"},{"code":"fi-FI","name":"Finnish"},{"code":"fr-FR","name":"French"},{"code":"fr-CA","name":"French (Canada)"},{"code":"de-DE","name":"German"},{"code":"el-GR","name":"Greek"},{"code":"hi-IN","name":"Hindi"},{"code":"hu-HU","name":"Hungarian"},{"code":"is-IS","name":"Icelandic"},{"code":"id-ID","name":"Indonesian"},{"code":"it-IT","name":"Italian"},{"code":"ja-JP","name":"Japanese (Japan)"},{"code":"km","name":"Khmer"},{"code":"ko-KR","name":"Korean"},{"code":"la","name":"Latin"},{"code":"lv","name":"Latvian"},{"code":"mk","name":"Macedonian"},{"code":"ne","name":"Nepali"},{"code":"nb-NO","name":"Norwegian"},{"code":"pl-PL","name":"Polish"},{"code":"pt-BR","name":"Portuguese"},{"code":"ro-RO","name":"Romanian"},{"code":"ru-RU","name":"Russian"},{"code":"sr-RS","name":"Serbian"},{"code":"si","name":"Sinhala"},{"code":"sk-SK","name":"Slovak"},{"code":"es-MX","name":"Spanish (Mexico)"},{"code":"es-ES","name":"Spanish (Spain)"},{"code":"sw","name":"Swahili"},{"code":"sv-SE","name":"Swedish"},{"code":"ta","name":"Tamil"},{"code":"te","name":"Telugu"},{"code":"th-TH","name":"Thai"},{"code":"tr-TR","name":"Turkish"},{"code":"uk-UA","name":"Ukrainian"},{"code":"vi-VN","name":"Vietnamese"},{"code":"cy","name":"Welsh"}]},"type":{"verboseName":"Text Question","id":"text_question"},"data":[{"isTemplate":false,"isSet":true,"data":{"type":"question_text_message"},"type":0,"value":"How many hours a day have you been coding the most? Did you enjoy it?","displayValue":"How many hours a day have you been coding the most? Did you enjoy it?","required":true,"title":"Question Text"},{"isTemplate":false,"isSet":false,"data":{"type":"question_text_readtime"},"type":3,"value":"5","displayValue":"5 seconds","required":true,"title":"Read Question Time"},{"isTemplate":false,"isSet":false,"data":{"type":"question_text_language","options":["Afrikaans (af-ZA)","Albanian (sq)","Arabic (ar-AE)","Armenian (hy)","Bengali (Bangladesh) (bn-BD)","Bengali (India) (bn-IN)","Bosnian (bs)","Burmese (Myanmar) (my)","Catalan (ca-ES)","Chinese (cmn-Hant-TW)","Croatian (hr-HR)","Czech (cs-CZ)","Danish (da-DK)","Dutch (nl-NL)","English (Australia) (en-AU)","English (United Kingdom) (en-GB)","English (United States) (en-US)","Esperanto (eo)","Filipino (fil-PH)","Finnish (fi-FI)","French (fr-FR)","French (Canada) (fr-CA)","German (de-DE)","Greek (el-GR)","Hindi (hi-IN)","Hungarian (hu-HU)","Icelandic (is-IS)","Indonesian (id-ID)","Italian (it-IT)","Japanese (Japan) (ja-JP)","Khmer (km)","Korean (ko-KR)","Latin (la)","Latvian (lv)","Macedonian (mk)","Nepali (ne)","Norwegian (nb-NO)","Polish (pl-PL)","Portuguese (pt-BR)","Romanian (ro-RO)","Russian (ru-RU)","Serbian (sr-RS)","Sinhala (si)","Slovak (sk-SK)","Spanish (Mexico) (es-MX)","Spanish (Spain) (es-ES)","Swahili (sw)","Swedish (sv-SE)","Tamil (ta)","Telugu (te)","Thai (th-TH)","Turkish (tr-TR)","Ukrainian (uk-UA)","Vietnamese (vi-VN)","Welsh (cy)"]},"type":6,"value":"en-GB","displayValue":"English (United Kingdom)","required":true,"title":"Question Text Language"}]},"a":{"langObj":{"default":{"value":"en-GB","displayValue":"English (United Kingdom)"},"langs":[{"code":"af-ZA","name":"Afrikaans"},{"code":"sq","name":"Albanian"},{"code":"ar-AE","name":"Arabic"},{"code":"hy","name":"Armenian"},{"code":"bn-BD","name":"Bengali (Bangladesh)"},{"code":"bn-IN","name":"Bengali (India)"},{"code":"bs","name":"Bosnian"},{"code":"my","name":"Burmese (Myanmar)"},{"code":"ca-ES","name":"Catalan"},{"code":"cmn-Hant-TW","name":"Chinese"},{"code":"hr-HR","name":"Croatian"},{"code":"cs-CZ","name":"Czech"},{"code":"da-DK","name":"Danish"},{"code":"nl-NL","name":"Dutch"},{"code":"en-AU","name":"English (Australia)"},{"code":"en-GB","name":"English (United Kingdom)"},{"code":"en-US","name":"English (United States)"},{"code":"eo","name":"Esperanto"},{"code":"fil-PH","name":"Filipino"},{"code":"fi-FI","name":"Finnish"},{"code":"fr-FR","name":"French"},{"code":"fr-CA","name":"French (Canada)"},{"code":"de-DE","name":"German"},{"code":"el-GR","name":"Greek"},{"code":"hi-IN","name":"Hindi"},{"code":"hu-HU","name":"Hungarian"},{"code":"is-IS","name":"Icelandic"},{"code":"id-ID","name":"Indonesian"},{"code":"it-IT","name":"Italian"},{"code":"ja-JP","name":"Japanese (Japan)"},{"code":"km","name":"Khmer"},{"code":"ko-KR","name":"Korean"},{"code":"la","name":"Latin"},{"code":"lv","name":"Latvian"},{"code":"mk","name":"Macedonian"},{"code":"ne","name":"Nepali"},{"code":"nb-NO","name":"Norwegian"},{"code":"pl-PL","name":"Polish"},{"code":"pt-BR","name":"Portuguese"},{"code":"ro-RO","name":"Romanian"},{"code":"ru-RU","name":"Russian"},{"code":"sr-RS","name":"Serbian"},{"code":"si","name":"Sinhala"},{"code":"sk-SK","name":"Slovak"},{"code":"es-MX","name":"Spanish (Mexico)"},{"code":"es-ES","name":"Spanish (Spain)"},{"code":"sw","name":"Swahili"},{"code":"sv-SE","name":"Swedish"},{"code":"ta","name":"Tamil"},{"code":"te","name":"Telugu"},{"code":"th-TH","name":"Thai"},{"code":"tr-TR","name":"Turkish"},{"code":"uk-UA","name":"Ukrainian"},{"code":"vi-VN","name":"Vietnamese"},{"code":"cy","name":"Welsh"}]},"type":"Text Answer","data":[{"isTemplate":false,"isSet":false,"data":{"type":"answer_type_preparationtime"},"type":3,"value":"5","displayValue":"5 seconds","required":true,"title":"Preparation Time"},{"isTemplate":false,"isSet":false,"data":{"type":"answer_type_keywords"},"type":4,"value":["Perfect","Great"],"displayValue":"Perfect,Great","required":true,"title":"Keywords"}]},"answerTime":10},{"uuid":"053b616b-6da3-4b5b-aa50-caa511598228","name":"Question Pair Without Internal Name","q":{"langObj":{"default":{"value":"en-GB","displayValue":"English (United Kingdom)"},"langs":[{"code":"af-ZA","name":"Afrikaans"},{"code":"sq","name":"Albanian"},{"code":"ar-AE","name":"Arabic"},{"code":"hy","name":"Armenian"},{"code":"bn-BD","name":"Bengali (Bangladesh)"},{"code":"bn-IN","name":"Bengali (India)"},{"code":"bs","name":"Bosnian"},{"code":"my","name":"Burmese (Myanmar)"},{"code":"ca-ES","name":"Catalan"},{"code":"cmn-Hant-TW","name":"Chinese"},{"code":"hr-HR","name":"Croatian"},{"code":"cs-CZ","name":"Czech"},{"code":"da-DK","name":"Danish"},{"code":"nl-NL","name":"Dutch"},{"code":"en-AU","name":"English (Australia)"},{"code":"en-GB","name":"English (United Kingdom)"},{"code":"en-US","name":"English (United States)"},{"code":"eo","name":"Esperanto"},{"code":"fil-PH","name":"Filipino"},{"code":"fi-FI","name":"Finnish"},{"code":"fr-FR","name":"French"},{"code":"fr-CA","name":"French (Canada)"},{"code":"de-DE","name":"German"},{"code":"el-GR","name":"Greek"},{"code":"hi-IN","name":"Hindi"},{"code":"hu-HU","name":"Hungarian"},{"code":"is-IS","name":"Icelandic"},{"code":"id-ID","name":"Indonesian"},{"code":"it-IT","name":"Italian"},{"code":"ja-JP","name":"Japanese (Japan)"},{"code":"km","name":"Khmer"},{"code":"ko-KR","name":"Korean"},{"code":"la","name":"Latin"},{"code":"lv","name":"Latvian"},{"code":"mk","name":"Macedonian"},{"code":"ne","name":"Nepali"},{"code":"nb-NO","name":"Norwegian"},{"code":"pl-PL","name":"Polish"},{"code":"pt-BR","name":"Portuguese"},{"code":"ro-RO","name":"Romanian"},{"code":"ru-RU","name":"Russian"},{"code":"sr-RS","name":"Serbian"},{"code":"si","name":"Sinhala"},{"code":"sk-SK","name":"Slovak"},{"code":"es-MX","name":"Spanish (Mexico)"},{"code":"es-ES","name":"Spanish (Spain)"},{"code":"sw","name":"Swahili"},{"code":"sv-SE","name":"Swedish"},{"code":"ta","name":"Tamil"},{"code":"te","name":"Telugu"},{"code":"th-TH","name":"Thai"},{"code":"tr-TR","name":"Turkish"},{"code":"uk-UA","name":"Ukrainian"},{"code":"vi-VN","name":"Vietnamese"},{"code":"cy","name":"Welsh"}]},"type":{"verboseName":"Video Question","id":"mp4_question"},"data":[{"isTemplate":false,"isSet":true,"data":{"type":"question_mp4_source"},"type":2,"value":"mxsT2p0a","displayValue":"moje video (mxsT2p0a)","required":true,"title":"Question MP4 Source"},{"isTemplate":false,"isSet":true,"data":{"type":"question_mp4_beforetext"},"type":0,"value":"Watch video and focus on informations. We will ask question related to some of them later.","displayValue":"Watch video and focus on informations. We will ask question related to some of them later.","required":false,"title":"Text Before Question"},{"isTemplate":false,"isSet":false,"data":{"type":"question_mp4_beforetextlang","options":["Afrikaans (af-ZA)","Albanian (sq)","Arabic (ar-AE)","Armenian (hy)","Bengali (Bangladesh) (bn-BD)","Bengali (India) (bn-IN)","Bosnian (bs)","Burmese (Myanmar) (my)","Catalan (ca-ES)","Chinese (cmn-Hant-TW)","Croatian (hr-HR)","Czech (cs-CZ)","Danish (da-DK)","Dutch (nl-NL)","English (Australia) (en-AU)","English (United Kingdom) (en-GB)","English (United States) (en-US)","Esperanto (eo)","Filipino (fil-PH)","Finnish (fi-FI)","French (fr-FR)","French (Canada) (fr-CA)","German (de-DE)","Greek (el-GR)","Hindi (hi-IN)","Hungarian (hu-HU)","Icelandic (is-IS)","Indonesian (id-ID)","Italian (it-IT)","Japanese (Japan) (ja-JP)","Khmer (km)","Korean (ko-KR)","Latin (la)","Latvian (lv)","Macedonian (mk)","Nepali (ne)","Norwegian (nb-NO)","Polish (pl-PL)","Portuguese (pt-BR)","Romanian (ro-RO)","Russian (ru-RU)","Serbian (sr-RS)","Sinhala (si)","Slovak (sk-SK)","Spanish (Mexico) (es-MX)","Spanish (Spain) (es-ES)","Swahili (sw)","Swedish (sv-SE)","Tamil (ta)","Telugu (te)","Thai (th-TH)","Turkish (tr-TR)","Ukrainian (uk-UA)","Vietnamese (vi-VN)","Welsh (cy)"]},"type":6,"value":"en-GB","displayValue":"English (United Kingdom)","required":true,"title":"Text Before Language"},{"isTemplate":false,"isSet":true,"data":{"type":"question_mp4_aftertext"},"type":0,"value":"How much money did client had to pay?","displayValue":"How much money did client had to pay?","required":false,"title":"Text After Question"},{"isTemplate":false,"isSet":false,"data":{"type":"question_mp4_aftertextlang","options":["Afrikaans (af-ZA)","Albanian (sq)","Arabic (ar-AE)","Armenian (hy)","Bengali (Bangladesh) (bn-BD)","Bengali (India) (bn-IN)","Bosnian (bs)","Burmese (Myanmar) (my)","Catalan (ca-ES)","Chinese (cmn-Hant-TW)","Croatian (hr-HR)","Czech (cs-CZ)","Danish (da-DK)","Dutch (nl-NL)","English (Australia) (en-AU)","English (United Kingdom) (en-GB)","English (United States) (en-US)","Esperanto (eo)","Filipino (fil-PH)","Finnish (fi-FI)","French (fr-FR)","French (Canada) (fr-CA)","German (de-DE)","Greek (el-GR)","Hindi (hi-IN)","Hungarian (hu-HU)","Icelandic (is-IS)","Indonesian (id-ID)","Italian (it-IT)","Japanese (Japan) (ja-JP)","Khmer (km)","Korean (ko-KR)","Latin (la)","Latvian (lv)","Macedonian (mk)","Nepali (ne)","Norwegian (nb-NO)","Polish (pl-PL)","Portuguese (pt-BR)","Romanian (ro-RO)","Russian (ru-RU)","Serbian (sr-RS)","Sinhala (si)","Slovak (sk-SK)","Spanish (Mexico) (es-MX)","Spanish (Spain) (es-ES)","Swahili (sw)","Swedish (sv-SE)","Tamil (ta)","Telugu (te)","Thai (th-TH)","Turkish (tr-TR)","Ukrainian (uk-UA)","Vietnamese (vi-VN)","Welsh (cy)"]},"type":6,"value":"en-GB","displayValue":"English (United Kingdom)","required":true,"title":"Text After Language"}]},"a":{"langObj":{"default":{"value":"en-GB","displayValue":"English (United Kingdom)"},"langs":[{"code":"af-ZA","name":"Afrikaans"},{"code":"sq","name":"Albanian"},{"code":"ar-AE","name":"Arabic"},{"code":"hy","name":"Armenian"},{"code":"bn-BD","name":"Bengali (Bangladesh)"},{"code":"bn-IN","name":"Bengali (India)"},{"code":"bs","name":"Bosnian"},{"code":"my","name":"Burmese (Myanmar)"},{"code":"ca-ES","name":"Catalan"},{"code":"cmn-Hant-TW","name":"Chinese"},{"code":"hr-HR","name":"Croatian"},{"code":"cs-CZ","name":"Czech"},{"code":"da-DK","name":"Danish"},{"code":"nl-NL","name":"Dutch"},{"code":"en-AU","name":"English (Australia)"},{"code":"en-GB","name":"English (United Kingdom)"},{"code":"en-US","name":"English (United States)"},{"code":"eo","name":"Esperanto"},{"code":"fil-PH","name":"Filipino"},{"code":"fi-FI","name":"Finnish"},{"code":"fr-FR","name":"French"},{"code":"fr-CA","name":"French (Canada)"},{"code":"de-DE","name":"German"},{"code":"el-GR","name":"Greek"},{"code":"hi-IN","name":"Hindi"},{"code":"hu-HU","name":"Hungarian"},{"code":"is-IS","name":"Icelandic"},{"code":"id-ID","name":"Indonesian"},{"code":"it-IT","name":"Italian"},{"code":"ja-JP","name":"Japanese (Japan)"},{"code":"km","name":"Khmer"},{"code":"ko-KR","name":"Korean"},{"code":"la","name":"Latin"},{"code":"lv","name":"Latvian"},{"code":"mk","name":"Macedonian"},{"code":"ne","name":"Nepali"},{"code":"nb-NO","name":"Norwegian"},{"code":"pl-PL","name":"Polish"},{"code":"pt-BR","name":"Portuguese"},{"code":"ro-RO","name":"Romanian"},{"code":"ru-RU","name":"Russian"},{"code":"sr-RS","name":"Serbian"},{"code":"si","name":"Sinhala"},{"code":"sk-SK","name":"Slovak"},{"code":"es-MX","name":"Spanish (Mexico)"},{"code":"es-ES","name":"Spanish (Spain)"},{"code":"sw","name":"Swahili"},{"code":"sv-SE","name":"Swedish"},{"code":"ta","name":"Tamil"},{"code":"te","name":"Telugu"},{"code":"th-TH","name":"Thai"},{"code":"tr-TR","name":"Turkish"},{"code":"uk-UA","name":"Ukrainian"},{"code":"vi-VN","name":"Vietnamese"},{"code":"cy","name":"Welsh"}]},"type":"Select One","data":[{"isTemplate":false,"isSet":false,"data":{"joinInfo":"selectAnswerArr","type":"answer_selectone_options"},"type":4,"value":["Yes","No","Maybe"],"displayValue":"Yes, No, Maybe","required":true,"title":"Possible Options"},{"isTemplate":false,"isSet":false,"data":{"joinInfo":"selectAnswerRes","options":["Yes","No","Maybe","Meh"],"type":"answer_selectone_correct"},"type":5,"value":"Yes","displayValue":"Yes","required":true,"title":"Correct Option"}]},"answerTime":10},{"uuid":"7ac7aa96-6c06-425c-8522-b645a6580569","name":"Question Pair Without Internal Name","q":{"langObj":{"default":{"value":"en-GB","displayValue":"English (United Kingdom)"},"langs":[{"code":"af-ZA","name":"Afrikaans"},{"code":"sq","name":"Albanian"},{"code":"ar-AE","name":"Arabic"},{"code":"hy","name":"Armenian"},{"code":"bn-BD","name":"Bengali (Bangladesh)"},{"code":"bn-IN","name":"Bengali (India)"},{"code":"bs","name":"Bosnian"},{"code":"my","name":"Burmese (Myanmar)"},{"code":"ca-ES","name":"Catalan"},{"code":"cmn-Hant-TW","name":"Chinese"},{"code":"hr-HR","name":"Croatian"},{"code":"cs-CZ","name":"Czech"},{"code":"da-DK","name":"Danish"},{"code":"nl-NL","name":"Dutch"},{"code":"en-AU","name":"English (Australia)"},{"code":"en-GB","name":"English (United Kingdom)"},{"code":"en-US","name":"English (United States)"},{"code":"eo","name":"Esperanto"},{"code":"fil-PH","name":"Filipino"},{"code":"fi-FI","name":"Finnish"},{"code":"fr-FR","name":"French"},{"code":"fr-CA","name":"French (Canada)"},{"code":"de-DE","name":"German"},{"code":"el-GR","name":"Greek"},{"code":"hi-IN","name":"Hindi"},{"code":"hu-HU","name":"Hungarian"},{"code":"is-IS","name":"Icelandic"},{"code":"id-ID","name":"Indonesian"},{"code":"it-IT","name":"Italian"},{"code":"ja-JP","name":"Japanese (Japan)"},{"code":"km","name":"Khmer"},{"code":"ko-KR","name":"Korean"},{"code":"la","name":"Latin"},{"code":"lv","name":"Latvian"},{"code":"mk","name":"Macedonian"},{"code":"ne","name":"Nepali"},{"code":"nb-NO","name":"Norwegian"},{"code":"pl-PL","name":"Polish"},{"code":"pt-BR","name":"Portuguese"},{"code":"ro-RO","name":"Romanian"},{"code":"ru-RU","name":"Russian"},{"code":"sr-RS","name":"Serbian"},{"code":"si","name":"Sinhala"},{"code":"sk-SK","name":"Slovak"},{"code":"es-MX","name":"Spanish (Mexico)"},{"code":"es-ES","name":"Spanish (Spain)"},{"code":"sw","name":"Swahili"},{"code":"sv-SE","name":"Swedish"},{"code":"ta","name":"Tamil"},{"code":"te","name":"Telugu"},{"code":"th-TH","name":"Thai"},{"code":"tr-TR","name":"Turkish"},{"code":"uk-UA","name":"Ukrainian"},{"code":"vi-VN","name":"Vietnamese"},{"code":"cy","name":"Welsh"}]},"type":{"verboseName":"Audio Question","id":"mp3_question"},"data":[{"isTemplate":false,"isSet":true,"data":{"type":"question_mp3_source"},"type":1,"value":"f6AfIf6g","displayValue":"moj nazov (f6AfIf6g)","required":true,"title":"Question MP3 Source"},{"isTemplate":false,"isSet":true,"data":{"type":"question_mp3_beforetext"},"type":0,"value":"Listen to the audio and focus on the client. We will ask question after the video.","displayValue":"Listen to the audio and focus on the client. We will ask question after the video.","required":false,"title":"Text Before Question"},{"isTemplate":false,"isSet":false,"data":{"type":"question_mp3_beforetextlang","options":["Afrikaans (af-ZA)","Albanian (sq)","Arabic (ar-AE)","Armenian (hy)","Bengali (Bangladesh) (bn-BD)","Bengali (India) (bn-IN)","Bosnian (bs)","Burmese (Myanmar) (my)","Catalan (ca-ES)","Chinese (cmn-Hant-TW)","Croatian (hr-HR)","Czech (cs-CZ)","Danish (da-DK)","Dutch (nl-NL)","English (Australia) (en-AU)","English (United Kingdom) (en-GB)","English (United States) (en-US)","Esperanto (eo)","Filipino (fil-PH)","Finnish (fi-FI)","French (fr-FR)","French (Canada) (fr-CA)","German (de-DE)","Greek (el-GR)","Hindi (hi-IN)","Hungarian (hu-HU)","Icelandic (is-IS)","Indonesian (id-ID)","Italian (it-IT)","Japanese (Japan) (ja-JP)","Khmer (km)","Korean (ko-KR)","Latin (la)","Latvian (lv)","Macedonian (mk)","Nepali (ne)","Norwegian (nb-NO)","Polish (pl-PL)","Portuguese (pt-BR)","Romanian (ro-RO)","Russian (ru-RU)","Serbian (sr-RS)","Sinhala (si)","Slovak (sk-SK)","Spanish (Mexico) (es-MX)","Spanish (Spain) (es-ES)","Swahili (sw)","Swedish (sv-SE)","Tamil (ta)","Telugu (te)","Thai (th-TH)","Turkish (tr-TR)","Ukrainian (uk-UA)","Vietnamese (vi-VN)","Welsh (cy)"]},"type":6,"value":"en-GB","displayValue":"English (United Kingdom)","required":true,"title":"Text Before Language"},{"isTemplate":false,"isSet":true,"data":{"type":"question_mp3_aftertext"},"type":0,"value":"How many kinds does the man have?","displayValue":"How many kinds does the man have?","required":false,"title":"Text After Question"},{"isTemplate":false,"isSet":false,"data":{"type":"question_mp3_aftertextlang","options":["Afrikaans (af-ZA)","Albanian (sq)","Arabic (ar-AE)","Armenian (hy)","Bengali (Bangladesh) (bn-BD)","Bengali (India) (bn-IN)","Bosnian (bs)","Burmese (Myanmar) (my)","Catalan (ca-ES)","Chinese (cmn-Hant-TW)","Croatian (hr-HR)","Czech (cs-CZ)","Danish (da-DK)","Dutch (nl-NL)","English (Australia) (en-AU)","English (United Kingdom) (en-GB)","English (United States) (en-US)","Esperanto (eo)","Filipino (fil-PH)","Finnish (fi-FI)","French (fr-FR)","French (Canada) (fr-CA)","German (de-DE)","Greek (el-GR)","Hindi (hi-IN)","Hungarian (hu-HU)","Icelandic (is-IS)","Indonesian (id-ID)","Italian (it-IT)","Japanese (Japan) (ja-JP)","Khmer (km)","Korean (ko-KR)","Latin (la)","Latvian (lv)","Macedonian (mk)","Nepali (ne)","Norwegian (nb-NO)","Polish (pl-PL)","Portuguese (pt-BR)","Romanian (ro-RO)","Russian (ru-RU)","Serbian (sr-RS)","Sinhala (si)","Slovak (sk-SK)","Spanish (Mexico) (es-MX)","Spanish (Spain) (es-ES)","Swahili (sw)","Swedish (sv-SE)","Tamil (ta)","Telugu (te)","Thai (th-TH)","Turkish (tr-TR)","Ukrainian (uk-UA)","Vietnamese (vi-VN)","Welsh (cy)"]},"type":6,"value":"en-GB","displayValue":"English (United Kingdom)","required":true,"title":"Text After Language"}]},"a":{"langObj":{"default":{"value":"en-GB","displayValue":"English (United Kingdom)"},"langs":[{"code":"af-ZA","name":"Afrikaans"},{"code":"sq","name":"Albanian"},{"code":"ar-AE","name":"Arabic"},{"code":"hy","name":"Armenian"},{"code":"bn-BD","name":"Bengali (Bangladesh)"},{"code":"bn-IN","name":"Bengali (India)"},{"code":"bs","name":"Bosnian"},{"code":"my","name":"Burmese (Myanmar)"},{"code":"ca-ES","name":"Catalan"},{"code":"cmn-Hant-TW","name":"Chinese"},{"code":"hr-HR","name":"Croatian"},{"code":"cs-CZ","name":"Czech"},{"code":"da-DK","name":"Danish"},{"code":"nl-NL","name":"Dutch"},{"code":"en-AU","name":"English (Australia)"},{"code":"en-GB","name":"English (United Kingdom)"},{"code":"en-US","name":"English (United States)"},{"code":"eo","name":"Esperanto"},{"code":"fil-PH","name":"Filipino"},{"code":"fi-FI","name":"Finnish"},{"code":"fr-FR","name":"French"},{"code":"fr-CA","name":"French (Canada)"},{"code":"de-DE","name":"German"},{"code":"el-GR","name":"Greek"},{"code":"hi-IN","name":"Hindi"},{"code":"hu-HU","name":"Hungarian"},{"code":"is-IS","name":"Icelandic"},{"code":"id-ID","name":"Indonesian"},{"code":"it-IT","name":"Italian"},{"code":"ja-JP","name":"Japanese (Japan)"},{"code":"km","name":"Khmer"},{"code":"ko-KR","name":"Korean"},{"code":"la","name":"Latin"},{"code":"lv","name":"Latvian"},{"code":"mk","name":"Macedonian"},{"code":"ne","name":"Nepali"},{"code":"nb-NO","name":"Norwegian"},{"code":"pl-PL","name":"Polish"},{"code":"pt-BR","name":"Portuguese"},{"code":"ro-RO","name":"Romanian"},{"code":"ru-RU","name":"Russian"},{"code":"sr-RS","name":"Serbian"},{"code":"si","name":"Sinhala"},{"code":"sk-SK","name":"Slovak"},{"code":"es-MX","name":"Spanish (Mexico)"},{"code":"es-ES","name":"Spanish (Spain)"},{"code":"sw","name":"Swahili"},{"code":"sv-SE","name":"Swedish"},{"code":"ta","name":"Tamil"},{"code":"te","name":"Telugu"},{"code":"th-TH","name":"Thai"},{"code":"tr-TR","name":"Turkish"},{"code":"uk-UA","name":"Ukrainian"},{"code":"vi-VN","name":"Vietnamese"},{"code":"cy","name":"Welsh"}]},"type":"Select Multiple","data":[{"isTemplate":false,"isSet":false,"data":{"joinInfo":"selectAnswerArr","type":"answer_selectmany_options"},"type":4,"value":["Yes","No","Maybe","Meh"],"displayValue":"Yes, No, Maybe, Meh","required":true,"title":"Possible Options"},{"isTemplate":false,"isSet":false,"data":{"joinInfo":"selectAnswerRes","options":["Yes","No","Maybe","Meh"],"type":"answer_selectmany_correct"},"type":7,"value":["Yes","Meh"],"displayValue":"Yes, Meh","required":true,"title":"Correct Options"}]},"answerTime":10},{"uuid":"cc3accd3-8a1a-435e-b61f-7e065b00852a","name":"Question Pair Without Internal Name","q":{"langObj":{"default":{"value":"en-GB","displayValue":"English (United Kingdom)"},"langs":[{"code":"af-ZA","name":"Afrikaans"},{"code":"sq","name":"Albanian"},{"code":"ar-AE","name":"Arabic"},{"code":"hy","name":"Armenian"},{"code":"bn-BD","name":"Bengali (Bangladesh)"},{"code":"bn-IN","name":"Bengali (India)"},{"code":"bs","name":"Bosnian"},{"code":"my","name":"Burmese (Myanmar)"},{"code":"ca-ES","name":"Catalan"},{"code":"cmn-Hant-TW","name":"Chinese"},{"code":"hr-HR","name":"Croatian"},{"code":"cs-CZ","name":"Czech"},{"code":"da-DK","name":"Danish"},{"code":"nl-NL","name":"Dutch"},{"code":"en-AU","name":"English (Australia)"},{"code":"en-GB","name":"English (United Kingdom)"},{"code":"en-US","name":"English (United States)"},{"code":"eo","name":"Esperanto"},{"code":"fil-PH","name":"Filipino"},{"code":"fi-FI","name":"Finnish"},{"code":"fr-FR","name":"French"},{"code":"fr-CA","name":"French (Canada)"},{"code":"de-DE","name":"German"},{"code":"el-GR","name":"Greek"},{"code":"hi-IN","name":"Hindi"},{"code":"hu-HU","name":"Hungarian"},{"code":"is-IS","name":"Icelandic"},{"code":"id-ID","name":"Indonesian"},{"code":"it-IT","name":"Italian"},{"code":"ja-JP","name":"Japanese (Japan)"},{"code":"km","name":"Khmer"},{"code":"ko-KR","name":"Korean"},{"code":"la","name":"Latin"},{"code":"lv","name":"Latvian"},{"code":"mk","name":"Macedonian"},{"code":"ne","name":"Nepali"},{"code":"nb-NO","name":"Norwegian"},{"code":"pl-PL","name":"Polish"},{"code":"pt-BR","name":"Portuguese"},{"code":"ro-RO","name":"Romanian"},{"code":"ru-RU","name":"Russian"},{"code":"sr-RS","name":"Serbian"},{"code":"si","name":"Sinhala"},{"code":"sk-SK","name":"Slovak"},{"code":"es-MX","name":"Spanish (Mexico)"},{"code":"es-ES","name":"Spanish (Spain)"},{"code":"sw","name":"Swahili"},{"code":"sv-SE","name":"Swedish"},{"code":"ta","name":"Tamil"},{"code":"te","name":"Telugu"},{"code":"th-TH","name":"Thai"},{"code":"tr-TR","name":"Turkish"},{"code":"uk-UA","name":"Ukrainian"},{"code":"vi-VN","name":"Vietnamese"},{"code":"cy","name":"Welsh"}]},"type":{"verboseName":"Text Question","id":"text_question"},"data":[{"isTemplate":false,"isSet":true,"data":{"type":"question_text_message"},"type":0,"value":"Is this the last question?","displayValue":"Is this the last question?","required":true,"title":"Question Text"},{"isTemplate":false,"isSet":false,"data":{"type":"question_text_readtime"},"type":3,"value":"5","displayValue":"5 seconds","required":true,"title":"Read Question Time"},{"isTemplate":false,"isSet":false,"data":{"type":"question_text_language","options":["Afrikaans (af-ZA)","Albanian (sq)","Arabic (ar-AE)","Armenian (hy)","Bengali (Bangladesh) (bn-BD)","Bengali (India) (bn-IN)","Bosnian (bs)","Burmese (Myanmar) (my)","Catalan (ca-ES)","Chinese (cmn-Hant-TW)","Croatian (hr-HR)","Czech (cs-CZ)","Danish (da-DK)","Dutch (nl-NL)","English (Australia) (en-AU)","English (United Kingdom) (en-GB)","English (United States) (en-US)","Esperanto (eo)","Filipino (fil-PH)","Finnish (fi-FI)","French (fr-FR)","French (Canada) (fr-CA)","German (de-DE)","Greek (el-GR)","Hindi (hi-IN)","Hungarian (hu-HU)","Icelandic (is-IS)","Indonesian (id-ID)","Italian (it-IT)","Japanese (Japan) (ja-JP)","Khmer (km)","Korean (ko-KR)","Latin (la)","Latvian (lv)","Macedonian (mk)","Nepali (ne)","Norwegian (nb-NO)","Polish (pl-PL)","Portuguese (pt-BR)","Romanian (ro-RO)","Russian (ru-RU)","Serbian (sr-RS)","Sinhala (si)","Slovak (sk-SK)","Spanish (Mexico) (es-MX)","Spanish (Spain) (es-ES)","Swahili (sw)","Swedish (sv-SE)","Tamil (ta)","Telugu (te)","Thai (th-TH)","Turkish (tr-TR)","Ukrainian (uk-UA)","Vietnamese (vi-VN)","Welsh (cy)"]},"type":6,"value":"en-GB","displayValue":"English (United Kingdom)","required":true,"title":"Question Text Language"}]},"a":{"langObj":{"default":{"value":"en-GB","displayValue":"English (United Kingdom)"},"langs":[{"code":"af-ZA","name":"Afrikaans"},{"code":"sq","name":"Albanian"},{"code":"ar-AE","name":"Arabic"},{"code":"hy","name":"Armenian"},{"code":"bn-BD","name":"Bengali (Bangladesh)"},{"code":"bn-IN","name":"Bengali (India)"},{"code":"bs","name":"Bosnian"},{"code":"my","name":"Burmese (Myanmar)"},{"code":"ca-ES","name":"Catalan"},{"code":"cmn-Hant-TW","name":"Chinese"},{"code":"hr-HR","name":"Croatian"},{"code":"cs-CZ","name":"Czech"},{"code":"da-DK","name":"Danish"},{"code":"nl-NL","name":"Dutch"},{"code":"en-AU","name":"English (Australia)"},{"code":"en-GB","name":"English (United Kingdom)"},{"code":"en-US","name":"English (United States)"},{"code":"eo","name":"Esperanto"},{"code":"fil-PH","name":"Filipino"},{"code":"fi-FI","name":"Finnish"},{"code":"fr-FR","name":"French"},{"code":"fr-CA","name":"French (Canada)"},{"code":"de-DE","name":"German"},{"code":"el-GR","name":"Greek"},{"code":"hi-IN","name":"Hindi"},{"code":"hu-HU","name":"Hungarian"},{"code":"is-IS","name":"Icelandic"},{"code":"id-ID","name":"Indonesian"},{"code":"it-IT","name":"Italian"},{"code":"ja-JP","name":"Japanese (Japan)"},{"code":"km","name":"Khmer"},{"code":"ko-KR","name":"Korean"},{"code":"la","name":"Latin"},{"code":"lv","name":"Latvian"},{"code":"mk","name":"Macedonian"},{"code":"ne","name":"Nepali"},{"code":"nb-NO","name":"Norwegian"},{"code":"pl-PL","name":"Polish"},{"code":"pt-BR","name":"Portuguese"},{"code":"ro-RO","name":"Romanian"},{"code":"ru-RU","name":"Russian"},{"code":"sr-RS","name":"Serbian"},{"code":"si","name":"Sinhala"},{"code":"sk-SK","name":"Slovak"},{"code":"es-MX","name":"Spanish (Mexico)"},{"code":"es-ES","name":"Spanish (Spain)"},{"code":"sw","name":"Swahili"},{"code":"sv-SE","name":"Swedish"},{"code":"ta","name":"Tamil"},{"code":"te","name":"Telugu"},{"code":"th-TH","name":"Thai"},{"code":"tr-TR","name":"Turkish"},{"code":"uk-UA","name":"Ukrainian"},{"code":"vi-VN","name":"Vietnamese"},{"code":"cy","name":"Welsh"}]},"type":"Microphone + Video","data":[{"isTemplate":false,"isSet":false,"data":{"type":"answer_speak_preparationtime"},"type":3,"value":"5","displayValue":"5 seconds","required":true,"title":"Preparation Time"},{"isTemplate":false,"isSet":false,"data":{"type":"answer_speak_keywords"},"type":4,"value":["Perfect","Great"],"displayValue":"Perfect,Great","required":true,"title":"Keywords"}]},"answerTime":10}]}',
        },
      ]);
    });
}