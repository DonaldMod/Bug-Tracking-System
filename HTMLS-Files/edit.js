document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    let empname = document.getElementById("name1").value
	let description = document.getElementById("description1").value
	let getDesc = localStorage.getItem("Descvalue1");

    let issueId = chance.guid()
	let ticketNo = chance.zip()
	
	let assignedFirst = chance.first()
	let assignedLast = chance.last()
	let assigned = assignedFirst + " " + assignedLast
	let assignedContact = assignedFirst.toLowerCase() + assignedLast.toLowerCase()
    
	let issueStatus = "Open"

    let issue = {
		name: empname,
		desc: description,
		assist: assigned,
		assistEmail: assignedContact,
        status: issueStatus,
		getDes: getDesc
    }

    if (localStorage.getItem("issues") == null) {
        let issues = []
        issues.push(issue)
        localStorage.setItem("issues", JSON.stringify(issues))
    } else {
        let issues = JSON.parse(localStorage.getItem("issues"))
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues))
    }

    document.getElementById("issueForm").reset()

	e.preventDefault()

    getAllIssues()
}

// function fetchIssues () {
// 	let issues = JSON.parse(localStorage.getItem('issues'));
// 	let issuesList = document.getElementById('issuesList');
	
// 	issuesList.innerHTML = '';
	
// 	for (let i = 0; i < issues.length; i++) {
// 	  let id = issues[i].id;
// 	  let desc = issues[i].description;
// 	  let severity = issues[i].severity;
// 	  let assignedTo = issues[i].assignedTo;
// 	  let status = issues[i].status;
	  
// 	  issuesList.innerHTML +=   '<div class="well">'+
// 								'<h6>Issue ID: ' + id + '</h6>'+
// 								'<p><span class="label label-info">' + status + '</span></p>'+
// 								'<h3>' + desc + '</h3>'+
// 								'<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
// 								'<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
// 								'<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
// 								'<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
// 								'</div>';
// 	}
//   }


let getAllIssues = () => {
	let issues = JSON.parse(localStorage.getItem("issues"))
	let issuesList = document.getElementById("issuesList")
	

	issuesList.innerHTML = ''

  	for (let i = 0; i < issues.length; i++) {

		if(issues[i].status == "Open") {
			issuesList.innerHTML += '<div class="card">' +
										'<div class="card-body">'+
											'<h6>Issue ID: ' + issues[i].id + '</h6>' +
											'<h5>Ticket No.: <span id="ticket">' + issues[i].ticket + '</span></h5>' +
											'<p><span class="badge rounded-pill bg-success text-light">' + issues[i].status + '</span></p>' +
											'<h3>' + issues[i].desc + '</h3>' +
											'<h1>Update Issue: ' + issues[i].getDes +'</h1>' +
											'<p><b>Issued By</b>: ' + issues[i].name + ' - ' + issues[i].empid + '</p>' +
											'<p><b>Assigned To</b>: ' + issues[i].assist + ' (' + issues[i].assistEmail + '@gmail.com)</p>' +
											'<button class="btn btn-warning" onclick="setStatusClosed(\''+ issues[i].id +'\')">Close</button> ' +
											'<button class="btn btn-danger" onclick="deleteIssue(\''+ issues[i].id +'\')">Delete</button> ' +
											'<a href="edit.html"><button class="btn btn-primary" onclick="editIssue(\''+ issues[i].id +'\')"><i class="fas fa-copy"></i>Edit</button></a>'
										'</div>' +
									'</div><br>'
		} else {
			issuesList.innerHTML += '<div class="card">' + 
										'<div class="card-body">'+
											'<h6>Issue ID: ' + issues[i].id + '</h6>' +
											'<h5>Ticket No.: ' + issues[i].ticket + '</h5>' +
											'<p><span class="badge rounded-pill bg-danger text-light">' + issues[i].status + '</span></p>' +
											'<h3>' + issues[i].desc + '</h3>' +
											'<p><b>Issued By:</b> ' + issues[i].name + ' - ' + issues[i].empid + '</p>' +
											'<p><b>Assigned To</b>: ' + issues[i].assist + ' (' + issues[i].assistEmail + '@gmail.com)</p>' +
											'<button class="btn btn-danger" onclick="deleteIssue(\''+ issues[i].id +'\')">Delete</button>' +
										'</div>' +
									'</div><br>'
		}
  	}
}