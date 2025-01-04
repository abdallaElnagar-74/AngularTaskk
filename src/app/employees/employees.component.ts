import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Employees } from '../core/employees';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  employees: Employees[] = [
    {
      id: 1,
      deptId: 1,
      name: 'Ahmed Hassan',
      age: 24,
      gender: 'male',
    },
    {
      id: 2,
      deptId: 1,
      name: 'Ahmed Essam',
      age: 28,
      gender: 'male',
    },
    {
      id: 3,
      deptId: 1,
      name: 'Aya Essam',
      age: 26,
      gender: 'female',
    },
    {
      id: 4,
      deptId: 2,
      name: 'Aya Samir',
      age: 26,
      gender: 'female',
    },
    {
      id: 5,
      deptId: 2,
      name: 'Ahmed Hamdy',
      age: 24,
      gender: 'male',
    },
    {
      id: 6,
      deptId: 2,
      name: 'Ahmed Farouk',
      age: 26,
      gender: 'male',
    },
    {
      id: 7,
      deptId: 2,
      name: 'Ahmed Hamada',
      age: 30,
      gender: 'male',
    },
    {
      id: 8,
      deptId: 3,
      name: 'Eman Ahmed',
      age: 35,
      gender: 'female',
    },
    {
      id: 9,
      deptId: 3,
      name: 'Eman Elsayed',
      age: 35,
      gender: 'female',
    },
    {
      id: 10,
      deptId: 3,
      name: 'Ahmed Elsayed',
      age: 30,
      gender: 'male',
    },
    {
      id: 11,
      deptId: 4,
      name: 'Ahmed Waheed',
      age: 29,
      gender: 'male',
    },
    {
      id: 12,
      deptId: 4,
      name: 'Asmaa Hamada',
      age: 28,
      gender: 'female',
    },
    {
      id: 13,
      deptId: 4,
      name: 'Esraa Hamada',
      age: 27,
      gender: 'female',
    },
    {
      id: 14,
      deptId: 5,
      name: 'Mohamed Sheref',
      age: 27,
      gender: 'male',
    },
    {
      id: 15,
      deptId: 5,
      name: 'Khaled Romeh',
      age: 30,
      gender: 'male',
    },
    {
      id: 16,
      deptId: 6,
      name: 'Khaled Salah',
      age: 32,
      gender: 'male',
    },
    {
      id: 17,
      deptId: 6,
      name: 'Eman Salah',
      age: 32,
      gender: 'female',
    },
    {
      id: 18,
      deptId: 7,
      name: 'Omnia Ahmed',
      age: 30,
      gender: 'female',
    },
    {
      id: 19,
      deptId: 7,
      name: 'Mostafa Ahmed',
      age: 25,
      gender: 'male',
    },
  ];
  addEmployeeForm: FormGroup = this._FormBuilder.group({
    id: [Number('')],
    deptId: [Number(this._ActivatedRoute.snapshot.paramMap.get('id'))],
    name: ['', [Validators.required]],
    age: ['', [Validators.required]],
    gender: ['', [Validators.required, Validators.pattern(/^(male|female)$/i)]],
  });
  filteredData: Employees[] = [];
  departId: any;
  deptName: any;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.departId = this._ActivatedRoute.snapshot.paramMap.get('id');
    this.deptName = this._ActivatedRoute.snapshot.paramMap.get('name');
    this.filterData();
    this.getData();
  }

  filterData(): void {
    let employees: any = localStorage.getItem('employees');
    let data: Employees[] = JSON.parse(employees);
    for (let index = 0; index < data.length; index++) {
      if (data[index].deptId == this.departId) {
        this.filteredData.push(data[index]);
      }
    }
    console.log(this.filteredData);
  }

  addEmployee(): void {
    if (this.addEmployeeForm.valid) {
      let dateNow = new Date()
      this.addEmployeeForm.value.id= dateNow.getTime();
      console.log('Added', this.addEmployeeForm.value);
      this.employees.push(this.addEmployeeForm.value);
      this.filteredData.push(this.addEmployeeForm.value);
      console.log(this.employees);
      console.log(this.filteredData);
      localStorage.setItem('employees', JSON.stringify(this.employees));
      this.addEmployeeForm.reset();
      this.successMessege();
    } else {
      this.failMessege();
    }
  }

  getData(): void {
    let data: any = localStorage.getItem('employees');
    this.employees = JSON.parse(data);
    
  }

  isInvalidInput(value: string): boolean | undefined {
    const nameControl = this.addEmployeeForm.get(value);
    return (
      nameControl?.hasError('required') &&
      nameControl?.value === '' &&
      nameControl?.touched
    );
  }

  successMessege(): void {
    this._ToastrService.success('Employee Added Successfully');
  }
  failMessege(): void {
    this._ToastrService.error('All Inputs are required');
  }
  
  onDelete( id: number, filterIndex: number): void {
    let result = this.employees.findIndex(
      (item) => item.id == id 
    );
    this.employees.splice(result, 1);
    this.filteredData.splice(filterIndex, 1);
    localStorage.setItem('employees', JSON.stringify(this.employees));
    this.getData();
  }
}
