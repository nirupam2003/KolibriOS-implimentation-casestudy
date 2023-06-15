var processes = [];

function addProcess() {
  // Retrieve values from input fields
  var arrivalTime = parseInt(document.getElementById("arrivalTime").value);
  var burstTime = parseInt(document.getElementById("burstTime").value);
  var processId = document.getElementById("processId").value;
  var priority = parseInt(document.getElementById("priority").value);

  // Create new process object
  var newProcess = {
    arrivalTime: arrivalTime,
    burstTime: burstTime,
    processId: processId,
    priority: priority,
    remainingTime: burstTime // add remainingTime to process object
  };

  // Add new process object to processes array
  processes.push(newProcess);

  // Add new row to process table
  var table = document.getElementById("processTable");
  var row = table.insertRow(-1);
  var idCell = row.insertCell(0);
  var arrivalCell = row.insertCell(1);
  var burstCell = row.insertCell(2);
  var priorityCell = row.insertCell(3);
  idCell.innerHTML = newProcess.processId;
  arrivalCell.innerHTML = newProcess.arrivalTime;
  burstCell.innerHTML = newProcess.burstTime;
  priorityCell.innerHTML = newProcess.priority;

  // Clear input fields
  document.getElementById("arrivalTime").value = "";
  document.getElementById("burstTime").value = "";
  document.getElementById("processId").value = "";
  document.getElementById("priority").value = "";
}

function clearTable() {
  // Clear all rows from process table
  var table = document.getElementById("processTable");
  while (table.rows.length > 1) {
    table.deleteRow(-1);
  }

  // Clear processes array
  processes = [];
}

function calculateSchedule() {
  // Sort processes array by arrival time
  processes.sort(function(a, b) {
    return a.arrivalTime - b.arrivalTime;
  });

  // Initialize variables
  var currentTime = processes[0].arrivalTime;
  var completedProcesses = 0;
  var totalWaitingTime = 0;
  var totalTurnaroundTime = 0;

  while (completedProcesses < processes.length) {
    // Find the process with the highest priority that has arrived and has remaining time
    var highestPriorityProcess = null;
    for (var i = 0; i < processes.length; i++) {
      var process = processes[i];
      if (process.arrivalTime <= currentTime && process.remainingTime > 0) {
        if (highestPriorityProcess == null || process.priority < highestPriorityProcess.priority) {
          highestPriorityProcess = process;
        }
      }
    }

    // If a process was found, execute one time unit and update statistics
    if (highestPriorityProcess != null) {
      highestPriorityProcess.remainingTime--;
      currentTime++;

      // If the process has completed, update completion time, waiting time, and turnaround time
      if (highestPriorityProcess.remainingTime == 0) {
        highestPriorityProcess.completionTime = currentTime;
        highestPriorityProcess.waitingTime = highestPriorityProcess.completionTime - highestPriorityProcess.burstTime - highestPriorityProcess.arrivalTime;
        highestPriorityProcess.turnaroundTime = highestPriorityProcess.completionTime - highestPriorityProcess.arrivalTime;
        totalWaitingTime += highestPriorityProcess.waitingTime;
        totalTurnaroundTime += highestPriorityProcess.turnaroundTime;
        completedProcesses++;
      }
    } else {
      currentTime++;
    }
  }

  // Calculate average waiting time and turnaround time
  var avgWaitingTime = totalWaitingTime / processes.length;
  var avgTurnaroundTime = totalTurnaroundTime / processes.length;

  // Update table with completion time, waiting time, and turnaround time for each process
var table = document.getElementById("processTable");
var headerRow = table.rows[0];

for (var i = 1; i < table.rows.length; i++) {
  var process = processes[i - 1];
  var completionCell = table.rows[i].insertCell(4);
  var waitingCell = table.rows[i].insertCell(5);
  var turnaroundCell = table.rows[i].insertCell(6);
  completionCell.innerHTML = process.completionTime;
  waitingCell.innerHTML = process.waitingTime;
  turnaroundCell.innerHTML = process.turnaroundTime;
 
}

  // Update average waiting time and turnaround time in table footer
  var footerRow = table.insertRow(-1);
  var footerCell = footerRow.insertCell(0);
  footerCell.colSpan = "7";
  footerCell.innerHTML = "Average Waiting Time: " + avgWaitingTime.toFixed(2) + ", Average Turnaround Time: " + avgTurnaroundTime.toFixed(2);
  footerCell.style.border = "1px solid white";

}
