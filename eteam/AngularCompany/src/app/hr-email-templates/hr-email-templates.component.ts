import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import API, { GetHrEmailCatalogResponse } from 'src/services/API';
import { Utils } from 'src/services/Utils';

declare const $: any;

@Component({
  selector: 'app-hr-email-templates',
  templateUrl: './hr-email-templates.component.html',
  styleUrls: ['./hr-email-templates.component.scss'],
})
export class HrEmailTemplatesComponent implements OnInit {
  @Output() onImportEvent = new EventEmitter<number>();
  isImported = false;
  importText = '';

  filters = {
    plans: ['Basic', 'Advanced', 'Enterprise'],
    cats: ['formal', 'informal', 'funny'],
    sorter: 'created-at',
    sorterDir: 'desc',
    search: null,
  };

  sorters = [
    { name: 'Create Date', id: 'created-at', classes: ['text-primary'] },
    { name: 'Amount of downloads', id: 'downloads', classes: ['text-success'] },
    { name: 'Amount of likes', id: 'liked', classes: ['text-info'] },
  ];

  sortDirs = [
    { text: 'Descending', id: 'desc', classes: ['text-primary'] },
    { text: 'Ascending', id: 'asc', classes: ['text-success'] },
  ];

  categories = [
    { classes: ['text-primary'], text: 'Formal Emails', id: 'formal' },
    { classes: ['text-success'], text: 'Informal Emails', id: 'informal' },
    { classes: ['text-info'], text: 'Funny Emails', id: 'funny' },
    {
      classes: ['text-danger'],
      text: 'Student-Targetted Emails',
      id: 'students',
    },
  ];

  plans = [
    { classes: ['text-primary'], text: 'Basic', id: 'Basic' },
    { classes: ['text-success'], text: 'Advanced', id: 'Advanced' },
    { classes: ['text-info'], text: 'Enterprise', id: 'Enterprise' },
  ];

  templates: GetHrEmailCatalogResponse['catalogs'] = null;

  constructor(private router: Router) {}

  async onLike(tId: number) {
    const res = await Utils.sendRequest(
      'Like Template',
      API.likeHrEmailCatalog(tId),
    );
    if (res) {
      this.templates.find((a) => a.id === tId).likes++;
    }
  }

  getDate(date: string): Date {
    return new Date(date);
  }

  onSearch(query: string): void {
    if (query) {
      this.filters.search = query;
    } else {
      this.filters.search = null;
    }
  }

  onSelectSorter(sorterId: string) {
    this.filters.sorter = sorterId;
  }

  onSelectSorterDir(dirId: string) {
    this.filters.sorterDir = dirId;
  }

  async onImport(catalogId: number) {
    if (this.isImported) {
      this.onImportEvent.emit(catalogId);
      return;
    }

    const res = await Utils.sendRequest(
      'Import Email Template',
      API.importHrEmailCatalog(
        {},
        {
          catalogId,
        },
      ),
    );

    if (res) {
      this.router.navigate(['/hr', 'emails']);
    }
  }

  async ngOnInit() {
    this.isImported = this.onImportEvent.observers.length > 0;
    this.importText = this.isImported
      ? 'Use this template'
      : 'Import this template';

    const catalog = await Utils.sendRequestFullSilent(
      'Email Template Catalog',
      API.getHrEmailCatalog(),
    );

    this.templates = catalog.catalogs;
  }

  goBack() {
    this.router.navigate(['/hr', 'emails']);
  }

  _getCatClassAttr(id: string, attr: string): any {
    return this.categories.find((c) => c.id === id)[attr];
  }

  _getPlanClassAttr(id: string, attr: string): any {
    return this.plans.find((c) => c.id === id)[attr];
  }

  onLoadCat(i: number) {
    const cat = this.categories[i];
  }

  onExpand(i) {
    const className = '.qp-' + i;

    $(className).slideToggle(500, () => {});
  }

  onSelectCat(catId: string) {
    if (this.filters.cats.includes(catId)) {
      this.filters.cats = this.filters.cats.filter((c) => c !== catId);
    } else {
      this.filters.cats = [...this.filters.cats, catId];
    }
  }

  onSelectPlan(pId: string) {
    if (this.filters.plans.includes(pId)) {
      this.filters.plans = this.filters.plans.filter((c) => c !== pId);
    } else {
      this.filters.plans = [...this.filters.plans, pId];
    }
  }
}
