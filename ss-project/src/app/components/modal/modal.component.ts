import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  title: string;
  validators: Validators[];
  type: 'input' | 'warning';
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  readonly dialogRef = inject(MatDialogRef<ModalComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    console.log(this.data.validators);
    this.form = this.fb.group({
      control: ['', [...this.data.validators]],
    });
  }

  get control() {
    return this.form.get('control');
  }

  // This method will close the dialog and send the value when form is valid
  closeDialog() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.get('control')?.value);
    }
  }
}
