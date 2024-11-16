import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  task: any;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.loadTaskDetails(taskId);
    }
  }

  loadTaskDetails(taskId: string) {
    this.taskService.getTaskById(taskId).subscribe(
      (response) => {
        this.task = response;
      },
      (error) => {
        this.toastr.error('Error al cargar los detalles de la tarea', 'Error');
        this.router.navigate(['/tasks']); // Redirige a la lista si ocurre un error
      }
    );
  }
}
