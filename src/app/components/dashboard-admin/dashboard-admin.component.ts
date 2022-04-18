import { Component, OnInit, Input } from '@angular/core';
import { get } from "../../../utils/request";


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  userOperationMap: any;
  hasOperations!: Boolean;

  @Input() processDefinitionId!: string;

  @Input()
  set activityId(activityId: string) {
    this._activityId = activityId;
    // make a rest call
    this.getUserOperations();
  }
  get activityId(): string { return this._activityId; }
  _activityId!: string;


  private getUserOperations() {
    this.hasOperations = false;

    const args:any = { maxResults: 500, processDefinitionId: this.processDefinitionId };
    if (this.activityId) {
      args['taskDefinitionKey'] = this.activityId;
    }
    get("%API%/engine/%ENGINE%/task", args)
      .then(async res => {
        const json = await res.json();
        const operationMap = {};
        json.forEach((task:any) => {
          this.hasOperations = true;
          const assignee = task.assignee || 'unassigned';

          const operationPerUser = assignee || {};
          operationPerUser[task.taskDefinitionKey] = operationPerUser[task.taskDefinitionKey] || 0;
          operationPerUser[task.taskDefinitionKey]++;
        });

        this.userOperationMap = operationMap;
      })
  }

  constructor() { }

  ngOnInit() {
    this.getUserOperations();
  }
}
