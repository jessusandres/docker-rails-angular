import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor() {
    console.log(VERSION.full);
  }

  handleClick() {
    fetch('/api/v1/hello')
    .then((res) => res.json())
    .then((json) => console.log({ json }))
  }
}
