function runPriorityScheduling() {
    // Define the process data
    const processes = [
        { process: 'P1', priority: 2, burstTime: 5 },
        { process: 'P2', priority: 1, burstTime: 3 },
        { process: 'P3', priority: 3, burstTime: 4 },
        { process: 'P4', priority: 2, burstTime: 2 },
    ];

    // Sort the processes by priority (highest first)
    processes.sort((a, b) => b.priority - a.priority);

    // Calculate the waiting and turnaround times for each process
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
    for (let i = 0; i < processes.length; i++) {
        const process = processes[i];
        const previousProcess = processes[i - 1] || { turnaroundTime: 0 };
        const waitingTime = previousProcess.turnaroundTime;
        const turnaroundTime = waitingTime + process.burstTime;
        process.waitingTime = waitingTime;
        process.turnaroundTime = turnaroundTime;
        totalWaitingTime += waitingTime;
        totalTurnaroundTime += turnaroundTime;
    }

    // Display the results in the table
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    for (let i = 0; i < processes.length; i++) {
        const process = processes[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${process.process}</td>
            <td>${process.priority}</td>
            <td>${process.burstTime}</td>
            <td>${process.waitingTime}</td>
            <td>${process.turnaroundTime}</td>
        `;
        tableBody.appendChild(row);
    }

    // Display the average waiting and turnaround times
    const averageWaitingTime = totalWaitingTime / processes.length;
    const averageTurnaroundTime = totalTurnaroundTime / processes.length;
    alert(`Average waiting time: ${averageWaitingTime}\nAverage turnaround time: ${averageTurnaroundTime}`);
}
