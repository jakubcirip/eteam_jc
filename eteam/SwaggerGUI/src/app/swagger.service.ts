import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SwaggerService {
  data: any;
  onData: Subject<any> = new Subject();

  constructor(private http: HttpClient, private router: Router) {
    this.http.get('http://be.localhost/public/swagger.json').subscribe(
      (res) => {
        this.data = res;
        this.onData.next(this.data);
      },
      (err) => {
        this.router.navigate(['/error']);
      },
    );
  }

  async isReady(): Promise<void> {
    if (this.data) {
      return;
    }

    await new Promise((r) => {
      const sub = this.onData.subscribe((newD) => {
        r();

        sub.unsubscribe();
      });
    });
  }
}
