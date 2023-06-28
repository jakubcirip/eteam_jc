import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailTemplate',
})
export class EmailTemplatePipe implements PipeTransform {
  transform(oldVal: any[], ...args: any[]): any {
    const plans: string[] = args[0].plans;
    const categories: string[] = args[0].categories;

    const sorter = args[0].sorter;
    const sorterDir = args[0].sorterDir;
    let search: string = args[0].search;

    const value = oldVal.filter((v) => {
      if (!categories.includes(v.catId)) {
        return false;
      }

      if (!plans.includes(v.planId)) {
        return false;
      }

      if (search) {
        let includes = false;

        search = search.toLowerCase();

        if (search.includes(' ')) {
          search.split(' ').forEach((s) => {
            if (includes) {
              return;
            }

            if (
              v.desc.toLowerCase().includes(s) ||
              v.name.toLowerCase().includes(s)
            ) {
              includes = true;
            }
          });
        } else {
          if (
            v.desc.toLowerCase().includes(search) ||
            v.name.toLowerCase().includes(search)
          ) {
            includes = true;
          }
        }

        return includes ? true : false;
      }

      return true;
    });

    value.sort((a, b) => {
      const mainVal = sorterDir === 'asc' ? 1 : -1;
      const secondaryVal = mainVal === 1 ? -1 : 1;

      if (sorter === 'liked') {
        return a.likes > b.likes ? mainVal : secondaryVal;
      } else if (sorter === 'downloads') {
        return a.downloads > b.downloads ? mainVal : secondaryVal;
      } else if (sorter === 'created-at') {
        return a.createdAt > b.createdAt ? mainVal : secondaryVal;
      } else {
        return 1;
      }
    });

    return value;
  }
}
