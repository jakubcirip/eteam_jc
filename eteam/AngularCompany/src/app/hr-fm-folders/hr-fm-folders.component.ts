import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-fm-folders',
  templateUrl: './hr-fm-folders.component.html',
  styleUrls: ['./hr-fm-folders.component.scss'],
})
export class HrFmFoldersComponent implements OnInit {
  folders = [
    {
      icon:
        // tslint:disable-next-line:max-line-length
        '<b>MP3</b>',
      title: 'Voice Questions',
      description:
        'Put your mp3 files of voice questions here and use them when creating question in job form',
      url: ['/hr', 'files', 'mp3'],
      color: 'info',
      tooltip: 'Enter MP3 Folder',
    },
    {
      icon:
        // tslint:disable-next-line:max-line-length
        '<b>MP4</b>',
      title: 'Video Question',
      description:
        'Put your mp4 fiiles of video questions here and use them when creating question in job form',
      url: ['/hr', 'files', 'mp4'],
      color: 'success',
      tooltip: 'Enter MP4 Folder',
    },
    {
      icon:
        // tslint:disable-next-line:max-line-length
        '<b>IMG</b>',
      title: 'Image Question',
      description:
        'Put your image fiiles of image questions here and use them when creating question in job form',
      url: ['/hr', 'files', 'img'],
      color: 'primary',
      tooltip: 'Enter Images Folder',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
