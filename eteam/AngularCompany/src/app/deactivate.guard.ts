import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanDeactivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HrJobPositionFormEditorComponent } from './hr-job-position-form-editor/hr-job-position-form-editor.component';
import { HrEmailsEditorComponent } from './hr-emails-editor/hr-emails-editor.component';
import { HrJobPositionsFormMedalsComponent } from './hr-job-positions-form-medals/hr-job-positions-form-medals.component';
import { FastInterviewComponent } from './fast-interview/fast-interview.component';

declare const Swal: any;

@Injectable({
  providedIn: 'root',
})
export class DeactivateFormEditorGuard
  implements CanDeactivate<HrJobPositionFormEditorComponent> {
  async canDeactivate(
    component: HrJobPositionFormEditorComponent,
  ): Promise<boolean> {
    if (!component.didChange) {
      return true;
    }

    const res = await Swal.fire({
      title: 'Are you sure?',
      text: 'You have some unsaved work..',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No, stay here!',
      confirmButtonText: 'Yes, leave page!',
    });

    if (!res.value) {
      return false;
    }

    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class DeactivateFormMedalsGuard
  implements CanDeactivate<HrJobPositionsFormMedalsComponent> {
  async canDeactivate(
    component: HrJobPositionsFormMedalsComponent,
  ): Promise<boolean> {
    if (!component.didChange) {
      return true;
    }

    const res = await Swal.fire({
      title: 'Are you sure?',
      text: 'You have some unsaved work..',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No, stay here!',
      confirmButtonText: 'Yes, leave page!',
    });

    if (!res.value) {
      return false;
    }

    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class DeactivateEmailEditorGuard
  implements CanDeactivate<HrEmailsEditorComponent> {
  async canDeactivate(component: HrEmailsEditorComponent): Promise<boolean> {
    if (!component.didChange) {
      return true;
    }

    const res = await Swal.fire({
      title: 'Are you sure?',
      text: 'You have some unsaved work..',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No, stay here!',
      confirmButtonText: 'Yes, leave page!',
    });

    if (!res.value) {
      return false;
    }

    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class DeactivateFastInterviewGuard
  implements CanDeactivate<FastInterviewComponent> {
  async canDeactivate(component: FastInterviewComponent): Promise<boolean> {
    if (component.canLeave) {
      return true;
    }

    const res = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will have to start over if you leave..',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No, stay here!',
      confirmButtonText: 'Yes, leave page!',
    });

    if (!res.value) {
      return false;
    }

    return true;
  }
}
