import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import API, { Mail, MailPlaceholder } from 'src/services/API';
import { Utils } from 'src/services/Utils';

declare var Swal: any;
declare var $: any;

@Component({
  selector: 'app-hr-emails-editor',
  templateUrl: './hr-emails-editor.component.html',
  styleUrls: ['./hr-emails-editor.component.scss'],
})
export class HrEmailsEditorComponent implements OnInit {
  emailData: Mail = null;
  name: string = null;
  didChange = false;
  saveText: string = null;

  placeholders: MailPlaceholder[] = [];
  isFirstEdit = true;

  attach = [];

  newSubject = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    const emailId = this.route.snapshot.params.emailId;
    this.emailData = await API.getHrEmail(emailId);
    this.attach = this.emailData.attachments;
    this.newSubject = this.emailData.subject;
    this.placeholders = (
      await API.getHrEmailPlaceholders(this.emailData.type)
    ).placeholders;
    this.name = this.emailData.name;

    setTimeout(() => {
      this.initEditor();
      $('#summernote').summernote('code', this.emailData.content);
    });
  }

  onSubjectChange(e) {
    this.newSubject = e.target.value;
    this.onChange();
  }

  onAddAttachment() {
    Swal.fire({
      title: 'Add New Attachment',
      input: 'text',
      inputPlaceholder: 'Enter attachment URL',
      showCancelButton: true,
      confirmButtonText: 'Add',
    }).then((result) => {
      if (result.value) {
        this.attach.push(result.value);
        this.onChange();
      }
    });
  }

  onRemoveAttachment(i: number) {
    this.attach.splice(i, 1);
    this.onChange();
  }

  initEditor() {
    const PlaceholderButton = (context) => {
      const ui = $.summernote.ui;

      const placeholderArr = this.placeholders.map((p) => {
        return `<div data-pholder="${p.name}" style="border-bottom: 1px solid rgba(255,255,255,0.7); cursor: pointer; padding: 10px 0; width: 100%; text-align: center;" class="dd-item">${p.title}</div>`;
      });

      const res = ui.buttonGroup([
        ui.button({
          className: 'dropdown-toggle',
          contents: 'Placeholders',
          tooltip: 'Insert Placeholder',
          data: {
            toggle: 'dropdown',
          },
        }),

        ui.dropdown({
          className: 'drop-default summernote-list',
          contents: `<div style="width: 300px; flex-direction: column; display: flex; align-items: center; justify-content: center; padding: 0px;"> ${placeholderArr.join(
            '',
          )} </div>`,
          callback: function ($dropdown) {
            $dropdown.find('.dd-item').each(function () {
              $(this).click(function () {
                $('#summernote').summernote('editor.restoreRange');
                $('#summernote').summernote('editor.focus');

                // $('#summernote').summernote('insertText', 'Hello, world');
                context.invoke(
                  'editor.insertText',
                  $(this).attr('data-pholder'),
                );
              });
            });
          },
        }),
      ]);

      return res.render();
    };

    $('#summernote').summernote({
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['fontname', ['fontname']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['insert', ['link', 'picture', 'video']],
        ['table', ['table']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['placeholders', ['placeholders']],
        ['view', ['fullscreen', 'codeview', 'help']],
      ],

      buttons: {
        placeholders: PlaceholderButton,
      },
      height: 250,
    });

    $('#summernote').on('summernote.change', (we, contents, $editable) => {
      this.onChange();
    });

    $('#summernote').on('summernote.keyup', (we, e) => {
      $('#summernote').summernote('editor.saveRange');
    });

    $('#summernote').on('summernote.onmouseup', (we, e) => {
      $('#summernote').summernote('editor.saveRange');
    });
    $('#summernote').on('summernote.focus', (we, e) => {
      $('#summernote').summernote('editor.saveRange');
    });

    $('.note-editing-area').on('click', () => {
      $('#summernote').summernote('editor.saveRange');
    });
  }

  onChange() {
    if (this.isFirstEdit) {
      this.isFirstEdit = false;
      return;
    }

    this.didChange = true;
  }

  async save() {
    if (this.didChange === false) {
      return;
    }

    this.didChange = false;
    this.saveText = 'Saving..';
    const content = $('#summernote').summernote('code');

    const res = await Utils.sendRequest(
      'Save Email Template',
      API.editHrEmailContent(
        this.emailData.id,
        {},
        {
          content,
          subject: this.newSubject ? this.newSubject : undefined,
          attachments: this.attach,
        },
      ),
    );

    if (res) {
      this.leavePage();
      this.saveText = null;
      this.didChange = false;
    }
  }

  clear() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to clear the email?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes, clear it!',
    }).then((result) => {
      if (result.value) {
        $('#summernote').summernote('code', '<p></p>');
      }
    });
  }

  leavePage() {
    this.router.navigate(['/hr', 'emails']);
  }

  goBack() {
    this.leavePage();
    // if (this.didChange) {
    //   Swal.fire({
    //     title: 'Are you sure?',
    //     text: 'You have some unsaved work..',
    //     type: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     cancelButtonText: 'No, stay here!',
    //     confirmButtonText: 'Yes, leave page!',
    //   }).then(result => {
    //     if (result.value) {
    //       this.leavePage();
    //     }
    //   });
    // } else {
    //   this.leavePage();
    // }
  }
}
