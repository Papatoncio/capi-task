import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmationComponent } from '../../modals/modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (response) => {
        this.tasks = response;
      },
      (error) => {
        this.toastr.error('Error al cargar las tareas', 'Error');
      }
    );
  }

  viewDetails(taskId: string) {
    this.router.navigate([`/tasks/task-details/${taskId}`]); // Redirige a los detalles de la tarea
  }

  deleteTask(taskId: string) {
    const modalRef = this.modalService.open(ModalConfirmationComponent); // Abrir el modal

    modalRef.result.then(
      (result) => {
        if (result === 'delete') {
          this.taskService.deleteTask(taskId).subscribe(
            (response) => {
              this.toastr.success('Tarea eliminada con éxito', 'Éxito');
              this.loadTasks(); // Recarga las tareas después de eliminar
            },
            (error) => {
              this.toastr.error('Error al eliminar la tarea', 'Error');
            }
          );
        }
      },
      (reason) => {
        // Si el usuario cierra el modal, no hace nada
      }
    );
  }

  goBack() {
    this.router.navigate(['/dashboard']); // Vuelve al dashboard
  }
}
