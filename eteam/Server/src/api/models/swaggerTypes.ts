export type GetHrEmailCatalogResponse = {
    'catalogs': {
            'id': number;
            'name': string;
            'catId': string;
            'planId': string;
            'likes': number;
            'downloads': number;
            'createdAt': string;
            'desc': string;
            'groups': {
                    'id': string;
                    'title': string;
                    'html': string;
                    'subject': string;
                    'attachments': string[]
                    ;
                }[]
            ;
        }[]
    ;
};
export type ImportHrEmailCatalogParamBody = {
    'catalogId': number;
};
export type LikeHrEmailCatalogParamEmailId = number;
export type GetHrFormCatalogResponse = {
    'catalogs': {
            'id': number;
            'name': string;
            'catId': string;
            'planId': string;
            'likes': number;
            'downloads': number;
            'createdAt': string;
            'desc': string;
            'groups': {
                    'lang_code': string;
                    'name': string;
                    'pairs': {}[]
                    ;
                }[]
            ;
        }[]
    ;
};
export type ImportHrFormCatalogParamBody = {
    'catalogId': number;
};
export type LikeHrFormCatalogParamEmailId = number;
export type CreateFastInterviewParamBody = {
    'emailId': number;
    'formId': number;
    'imageType': string;
    'imageData': string;
    'name': string;
    'color': string;
    'isDark': boolean;
    'prelog': string;
    'startDate': string;
    'endDate': string;
    'remindDate': string;
};
export type DivisionList = {
        'name': string;
        'id': number;
        'hrs': number;
        'mail': string;
    }[]
;
export type Division = {
    'name': string;
    'id': number;
    'hrs': number;
    'mail': string;
};
export type HRPerson = {
    'id': number;
    'name': string;
    'email': string;
    'isRegistered': boolean;
};
export type DivisionDetail = {
    'name': string;
    'id': number;
    'hrs': {
            'id': number;
            'name': string;
            'email': string;
            'isRegistered': boolean;
        }[]
    ;
};
export type CompanySettings = {
    'name': string;
    'email': string;
    'plan': string;
    'tokens': number;
    'domain': string;
};
export type CompanyIndexData = {
    'tokens': number;
    'plan': {
        'id': number;
        'name': string;
        'color': string;
        'colorHex': string;
    };
    'divs': number;
    'hrs': number;
    'inactiveHrs': number;
};
export type MeInfoCompany = {
    'name': string;
};
export type TokensInfoCompany = {
    'amount': number;
};
export type GetCompanyTokensStatsResponse = {
    'stats': {
            'text': string;
            'amount': number;
            'isRed': boolean;
        }[]
    ;
};
export type GetCompanyInterviewHistoryResponse = {
    'ints': {
            'id': number;
            'divName': string;
            'hrName': string;
            'status': string;
        }[]
    ;
};
export type GetCompanyInterviewHistoryDetailParamHistoryIntId = number;
export type GetCompanyInterviewHistoryDetailResponse = {
    'id': number;
    'divName': string;
    'divId': number;
    'hrName': string;
    'hrId': number;
    'status': string;
    'createdAt': string;
    'endedAt': string;
    'startedAt': string;
    'candidatesAmount': number;
    'planUsed': string;
    'tokensSpent': number;
};
export type FormTemplatesObject = {
    'templates': {
            'id': number;
            'name': string;
        }[]
    ;
};
export type FormTemplate = {
    'id': number;
    'name': string;
};
export type Mp3Array = {
        'id': string;
        'name': string;
        'src': string;
    }[]
;
export type ImgArray = {
        'id': string;
        'name': string;
        'src': string;
    }[]
;
export type Mp4Array = {
        'id': string;
        'name': string;
        'src': string;
    }[]
;
export type PublicInterviewResponse = {
    'dark': boolean;
    'prelog': string;
    'color': string;
    'image': string;
    'pairs': {
            'answerTime': number;
            'uuid': string;
            'q': {};
            'a': {};
            'response': {
                'rating': number;
                'data': {};
            };
        }[]
    ;
};
export type HrSettings = {
    'name': string;
    'email': string;
    'company': string;
    'plan': string;
    'tokens': number;
    'domain': string;
    'divName': string;
    'divMail': string;
};
export type JobPositionForms = {
    'name': string;
    'forms': {
            'defaultLanguage': string;
            'id': number;
            'name': string;
            'questions': number;
        }[]
    ;
};
export type JobPositionForm = {
    'defaultLanguage': string;
    'name': string;
    'data': string;
    'medalCategories': {
            'name': string;
            'medals': {
                    'name': string;
                    'tag': string;
                    'weight': number;
                    'medalId': number;
                    'qpUuid': string;
                }[]
            ;
        }[]
    ;
};
export type JobPositions = {
    'positions': {
            'id': number;
            'name': string;
            'forms': number;
        }[]
    ;
};
export type MeInfoHr = {
    'name': string;
};
export type PreconfirmHr = {
    'email': string;
};
export type HrGetCalendarResponse = {
    'events': {
            'title': string;
            'start': string;
            'end': string;
            'color': string;
        }[]
    ;
};
export type HrCanEditPersonParamPersonId = number;
export type HrCanEditPersonResponse = {
    'canEdit': boolean;
    'canDelete': boolean;
};
export type HrCanEditEmailParamEmailId = number;
export type HrCanEditEmailResponse = {
    'canEdit': boolean;
    'canDelete': boolean;
};
export type HrCanEditJobPositionParamPositionId = number;
export type HrCanEditJobPositionResponse = {
    'canEdit': boolean;
    'canDelete': boolean;
};
export type HrCanEditJobFormularParamPositionId = number;
export type HrCanEditJobFormularParamFormId = number;
export type HrCanEditJobFormularResponse = {
    'canEdit': boolean;
    'canDelete': boolean;
};
export type HrCanEditMp3ParamMp3Id = string;
export type HrCanEditMp3Response = {
    'canEdit': boolean;
    'canDelete': boolean;
};
export type HrCanEditMp4ParamMp4Id = string;
export type HrCanEditMp4Response = {
    'canEdit': boolean;
    'canDelete': boolean;
};
export type EditHrInterviewPrelogParamIntId = number;
export type EditHrInterviewPrelogParamBody = {
    'prelog': string;
};
export type UpdateHrJobPositiomFormMedalsParamPositionId = number;
export type UpdateHrJobPositiomFormMedalsParamFormId = number;
export type UpdateHrJobPositiomFormMedalsParamBody = {
    'medals': {
            'medalId': number;
            'qpUuid' ? : string;
            'weight': number;
        }[]
    ;
};
export type TestHrInterviewParamIntId = number;
export type SetHrInterviewBackgroundColorParamIntId = number;
export type SetHrInterviewBackgroundColorParamBody = {
    'isDark': boolean;
};
export type GetSharedVideoTutorialsResponse = {
    'paths': {
            'pth': string;
            'video': string;
            'title': string;
            'text': string;
        }[]
    ;
};
export type MailPlaceholderRes = {
    'placeholders': {
            'name': string;
            'title': string;
        }[]
    ;
};
export type MailPlaceholder = {
    'name': string;
    'title': string;
};
export type MailTypes = {
    'types': {
            'usages': string[]
            ;
            'staticDate': boolean;
            'name': string;
            'title': string;
        }[]
    ;
};
export type MailTypeArray = {
        'usages': string[]
        ;
        'staticDate': boolean;
        'name': string;
        'title': string;
    }[]
;
export type MailType = {
    'usages': string[]
    ;
    'staticDate': boolean;
    'name': string;
    'title': string;
};
export type MailsResponse = {
    'mails': {
            'id': number;
            'name': string;
            'type': string;
            'content': string;
            'subject': string;
            'attachments': string[]
            ;
        }[]
    ;
};
export type MailArray = {
        'id': number;
        'name': string;
        'type': string;
        'content': string;
        'subject': string;
        'attachments': string[]
        ;
    }[]
;
export type Mail = {
    'id': number;
    'name': string;
    'type': string;
    'content': string;
    'subject': string;
    'attachments': string[]
    ;
};
export type MailPreview = {
    'content': string;
    'subject': string;
};
export type InterviewResultsData = {
    'people': {}[]
    ;
};
export type InterviewSummary = {
    'prelog': string;
    'warnings': {
            'type': string;
            'text': string;
        }[]
    ;
    'emails': {
            'id': number;
            'type': string;
            'date': string;
        }[]
    ;
    'testUserTag': string;
    'interviewTag': string;
    'formularName': string;
    'interviewName': string;
    'totalQuestions': number;
    'totalCandidates': number;
    'pricePerSecond': number;
    'interviewSeconds': number;
    'totalPrice': number;
};
export type InterviewSummaryWarning = {
    'type': string;
    'text': string;
};
export type InterviewSummaryEmail = {
    'id': number;
    'type': string;
    'date': string;
};
export type InterviewCandidatesData = {
    'candidates': {
            'email_uid' ? : number;
            'id': number;
            'tag': string;
            'name': string;
            'email': string;
            'type': string;
        }[]
    ;
    'interviewName': string;
};
export type InterviewCandidate = {
    'email_uid' ? : number;
    'id': number;
    'tag': string;
    'name': string;
    'email': string;
    'type': string;
};
export type InterviewData = {
    'basicData': {
        'dark': boolean;
        'name': string;
        'prelog': string;
        'tag': string;
        'state': string;
        'posId': number;
        'formId': number;
        'image': string;
        'color': string;
    };
    'advancedData': {
            'type': string;
            'date': string;
            'mailId': number;
        }[]
    ;
    'settings': {
        'jobs': {
            'positions': {
                    'id': number;
                    'name': string;
                    'forms': {
                            'id': number;
                            'name': string;
                        }[]
                    ;
                }[]
            ;
        };
        'emails': {
                'type': string;
                'values': {
                        'id': number;
                        'name': string;
                    }[]
                ;
            }[]
        ;
    };
    'types': {
            'name': string;
            'title': string;
            'staticDate': boolean;
            'usages': string[]
            ;
        }[]
    ;
};
export type InterviewAdvancedData = {
    'type': string;
    'date': string;
    'mailId': number;
};
export type InterviewBasicData = {
    'dark': boolean;
    'name': string;
    'prelog': string;
    'tag': string;
    'state': string;
    'posId': number;
    'formId': number;
    'image': string;
    'color': string;
};
export type InterviewSettings = {
    'jobs': {
        'positions': {
                'id': number;
                'name': string;
                'forms': {
                        'id': number;
                        'name': string;
                    }[]
                ;
            }[]
        ;
    };
    'emails': {
            'type': string;
            'values': {
                    'id': number;
                    'name': string;
                }[]
            ;
        }[]
    ;
};
export type InterviewSettingsEmail = {
    'type': string;
    'values': {
            'id': number;
            'name': string;
        }[]
    ;
};
export type InterviewSettingsEmailValue = {
    'id': number;
    'name': string;
};
export type InterviewSettingsPosition = {
    'id': number;
    'name': string;
    'forms': {
            'id': number;
            'name': string;
        }[]
    ;
};
export type InterviewSettingsForms = {
    'id': number;
    'name': string;
};
export type InterviewArray = {
    'interviews': {
            'id': number;
            'name': string;
            'tag': string;
            'state': string;
            'startAt': string;
            'finishAt': string;
        }[]
    ;
};
export type Interview = {
    'id': number;
    'name': string;
    'tag': string;
    'state': string;
    'startAt': string;
    'finishAt': string;
};
export type InterviewPeople = {
    'questions': {}[]
    ;
    'failedCandidates': {}[]
    ;
    'candidates': {}[]
    ;
    'medals': {}[]
    ;
    'intName': string;
};
export type ParseEmailPlaceholderResponse = {
    'candidateEmail': string;
    'subject': string;
    'text': string;
};
export type InternalInterviewCandidateStatistics = {
    'submited': {
            'personId': number;
            'canId': number;
            'tag': string;
        }[]
    ;
    'notSubmited': {
            'personId': number;
            'canId': number;
            'tag': string;
        }[]
    ;
};
export type InternalInterviewCandidate = {
    'personId': number;
    'canId': number;
    'tag': string;
};
export type InterviewEmojiObject = {
    'emojis': {
            'name': string;
            'images': string[]
            ;
        }[]
    ;
};
export type InterviewEmoji = {
    'name': string;
    'images': string[]
    ;
};
export type UpdateInterviewMedalsParamIntId = number;
export type SetHrInterviewColorParamIntId = number;
export type SetHrInterviewColorParamBody = {
    'color': string;
};
export type SetHrInterviewImageParamIntId = number;
export type SetHrInterviewImageParamBody = {
    'data': string;
    'type': string;
};
export type GetHrInterviewImagesResponse = {
    'images': {
            'url': string;
            'urlSmall': string;
            'type': string;
            'name': string;
        }[]
    ;
};
export type UpdateInterviewNotesParamIntId = number;
export type UpdateInterviewNotesParamCanId = number;
export type UpdateInterviewNotesResponse = {
    'note': string;
};
export type ExportHrInterviewPdfParamIntId = number;
export type BasicResponse = {
    'success': boolean;
    'message': string;
    'data' ? : {
        'intId' ? : number;
        'formId' ? : number;
        'posId' ? : number;
        'idsArr' ? : {
                'id': number;
                'type': string;
            }[]
        ;
    };
};
export type LoginGlobalResponse = {
    'domain': string;
    'success': boolean;
    'message': string;
    'key': string;
};
export type PlansData = {
    'isCompany': boolean;
    'plans': {
            'id': number;
            'name': string;
            'color': string;
            'colorHex': string;
            'price': string;
            'points': string[]
            ;
            'pointsNo': string[]
            ;
            'pointsAnalysis': string[]
            ;
            'pointsAnalysisNo': string[]
            ;
            'pointsLimits': string[]
            ;
            'active': boolean;
            'upgrade': boolean;
            'recommended': boolean;
        }[]
    ;
};
export type FaqCompany = {
    'categories': {
            'name': string;
            'questions': {
                    'question': string;
                    'answer': string;
                }[]
            ;
        }[]
    ;
};
export type IndexResponse = {
    'success': boolean;
};
export type GetSupportedLanguagesResponse = {
    'languages': {
            'code': string;
            'name': string;
        }[]
    ;
};
export type GenerateInterviewZipParamBody = {
    'data': string;
};
