import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  handleClick() {
    fetch('/api/v1/hello')
    .then((res) => res.json())
    .then((json) => console.log({ json }))
  }
}
