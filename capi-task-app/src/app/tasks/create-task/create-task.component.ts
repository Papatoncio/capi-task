import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.taskForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      prioridad: ['', Validators.required],
      categoria: ['', Validators.required],
      estado: ['pendiente'],
      fecha_limite: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.loadTaskData();
    }
  }

  // Cargar los datos de la tarea para editar
  loadTaskData() {
    this.taskService.getTaskById(this.taskId!).subscribe(
      (task) => {
        this.taskForm.patchValue({
          titulo: task.titulo,
          descripcion: task.descripcion,
          prioridad: task.prioridad,
          categoria: task.categoria,
          estado: task.estado,
          fecha_limite: this.formatDate(task.fecha_limite),
        });
      },
      (error) => {
        this.toastr.error('Error al cargar la tarea', 'Error');
        this.router.navigate(['/tasks']);
      }
    );
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.taskForm.valid) {
      if (this.taskId) {
        this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe(
          (response) => {
            this.toastr.success('Tarea actualizada con éxito!', 'Éxito');
            this.router.navigate(['/tasks']);
          },
          (error) => {
            this.toastr.error('Error al actualizar la tarea', 'Error');
          }
        );
      } else {
        // Lógica para crear una nueva tarea si taskId no está presente
        this.taskService.createTask(this.taskForm.value).subscribe(
          (response) => {
            this.toastr.success('Tarea creada con éxito!', 'Éxito');
            this.router.navigate(['/tasks']);
          },
          (error) => {
            this.toastr.error('Error al crear la tarea', 'Error');
          }
        );
      }
    } else {
      this.toastr.warning(
        'Por favor, complete todos los campos correctamente',
        'Advertencia'
      );
    }
  }

  // Método para cancelar y redirigir a la lista de tareas
  onCancel() {
    this.router.navigate(['/tasks']);
  }

  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
