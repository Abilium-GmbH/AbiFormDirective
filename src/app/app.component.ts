import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Autosaveable Form';

  object: FormGroup = new FormGroup({
    attribute1: new FormControl(''),
    attribute2: new FormControl('')
  });

  constructor(public dataService: DataService) {
    this.dataService.get().then(value => {
      this.dataService.populateForm(value, this.object);
    });
  }

}
