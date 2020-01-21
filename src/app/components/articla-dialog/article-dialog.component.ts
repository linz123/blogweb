import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-articla-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.less']
})
export class ArticleDialogComponent implements OnInit {


  selectable = true;

  removable = true;

  addOnBlur = true;

  labels: string[] = ['JavaScript'];

  separatorKeysCodes: number[] = [ENTER, COMMA];

  filteredLabels: Observable<string[]>;

  allLabels: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];


  @ViewChild('labelInput', {static: false}) labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  labelCtrl = new FormControl('', {});

  constructor(@Inject(MAT_DIALOG_DATA) public data) {


    this.filteredLabels = this.labelCtrl.valueChanges.pipe(
      startWith(null),
      map((label: string | null) => label ? this._filter(label) : this.allLabels.slice()));

  }


  remove(label: string): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    this.labels.push(event.option.viewValue);
    this.labelInput.nativeElement.value = '';
    this.labelCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLabels.filter(label => label.toLowerCase().indexOf(filterValue) === 0);
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        console.log(this.labels)

        this.labels.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.labelCtrl.setValue(null);
    }
  }


  ngOnInit() {
  }

}
