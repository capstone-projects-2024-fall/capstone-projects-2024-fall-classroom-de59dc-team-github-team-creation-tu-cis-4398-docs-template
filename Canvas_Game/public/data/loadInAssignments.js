function loadInAssignments(){
    const email = localStorage.getItem('email')
    fetch("http://127.0.0.1:5000/assignmentFromDb?email="+email)
    .then(response=>{
        if (response.ok){
          return response.json();
        }else{
          throw new Error("Api call failed")
        }
      })
      .then(data=>{
        const container = $("#assignmentsList")
        let assignmentList = $("<table><tr><th>Assignment Name</th><th>Due Date</th><th></th><th>Begin</th></tr></table>").prop('id', 'assignmentTable')
        for(let assignment of data.assignments){
            if(assignment.in_game_status == "Undecided" || assignment.in_game_statue == "To Do"){
                const startBtn = $("<button type='button' class='btn'>Start Assignment</button>").on('click', function(){
                    const data = {
                        taskId: assignment.id,
                        status: "In Progress",
                        email: email
                      }
                      const requestOptions = {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                      }
                      fetch("http://127.0.0.1:5000/api/updateTaskStatus", requestOptions)
                        .then(response=>{
                          if(!response.ok){
                            throw new Error('Bad Response');
                          }
                          return response.json();
                        })
                        .then(data=>{
                          $("#dialogueText").html("Congratulations, you started the assignment! Thank you, this will be a great help to our village!")
                          startBtn.html('Started')
                          startBtn.prop("disabled", true)
                        })
                        .catch(error=>{
                          console.log(error)
                        })
                })
                const doneBtn = $("<button type='button' class='btn'>Mark As Done</button>").on('click', function(){
                  const data = {
                      taskId: assignment.id,
                      status: "Done",
                      email: email
                    }
                    const requestOptions = {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(data)
                    }
                    fetch("http://127.0.0.1:5000/api/updateTaskStatus", requestOptions)
                      .then(response=>{
                        if(!response.ok){
                          throw new Error('Bad Response');
                        }
                        return response.json();
                      })
                      .then(data=>{
                        $("#dialogueText").html("Congratulations, you finished an assignment! Your reward will be: ")
                        doneBtn.prop("disabled", true)
                        if(data.worldStateUpdated){
                          localStorage.setItem("worldStateUpdated", true)
                          localStorage.setItem("worldState", parseInt(localStorage.getItem("worldState"))+1)
                          window.location.href = window.location.href
                        }
                      })
                      .catch(error=>{
                        console.log(error)
                      })
              })
                let assignmentLineItem = $("<tr><td>"+ assignment.assignment_name + "</td><td>"+ assignment.due_at +"</td><td id='button'></td></tr>").prop('id', assignment.id)
                $(assignmentLineItem).children()[2].append(startBtn[0])
                $(assignmentLineItem).children()[2].append(doneBtn[0])
                $(assignmentList).append(assignmentLineItem)
            }
        }
        $(container).append(assignmentList)
      })
      
}
