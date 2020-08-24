import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingScreenService} from "./servicios/loading-screen.service";
import {debounceTime} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private loadingScreenService: LoadingScreenService) {
  }


  loading = false;
  loadingSubscription: Subscription;

  ngOnInit() {
    console.log('APP');
    this.loadingSubscription = this.loadingScreenService.loadingStatus.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      this.loading = value as boolean;
    });

  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
