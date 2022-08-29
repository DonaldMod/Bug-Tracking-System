

function saveIssue(e) {
    let empname = document.getElementById("name").value
    let empid = document.getElementById("empid").value
    let department = document.getElementById("department").value
	let description = document.getElementById("description").value

    let issueId = chance.guid()
	let ticketNo = chance.zip()
	
	let assignedFirst = chance.first()
	let assignedLast = chance.last()
	let assigned = assignedFirst + " " + assignedLast
	let assignedContact = assignedFirst.toLowerCase() + assignedLast.toLowerCase()
    
	let issueStatus = "Open"


    let issue = {
        id: issueId,
        ticket: ticketNo,
		name: empname,
        empid: empid,
        dep: department,
		desc: description,
		assist: assigned,
		assistEmail: assignedContact,
        status: issueStatus
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

let setStatusClosed = (id) => {
    let issues = JSON.parse(localStorage.getItem("issues"))

    for (let i = 0; i < issues.length; i++) {
		if (issues[i].id == id) {
			issues[i].status = "Closed"
		}
    }

    localStorage.setItem("issues", JSON.stringify(issues))

    getAllIssues()
}

let deleteIssue = (id) => {
	let issues = JSON.parse(localStorage.getItem("issues"))

	for (let i = 0; i < issues.length; i++) {
		if (issues[i].id == id) {
			issues.splice(i, 1);
		}
	}

	localStorage.setItem("issues", JSON.stringify(issues))

	getAllIssues()
}

let validateBtn = () => {
	let empname = document.getElementById("name").value
    let empid = document.getElementById("empid").value
    let department = document.getElementById("department").value
	let description = document.getElementById("description").value

	let submitBtn = document.getElementById("mainBtn")
	let mustMessage = document.getElementById("must")

	if(empname != "" && empid != "" && department != "none" && description != "") {
		submitBtn.disabled = false
		mustMessage.innerHTML = ""
	} else {
		submitBtn.disabled = true
		mustMessage.innerHTML = "asterick (*) marked fields are required!"
	}
}

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
											'<p><b>Issued By</b>: ' + issues[i].name + ' - ' + issues[i].empid + '</p>' +
											'<p><b>Assigned To</b>: ' + issues[i].assist + ' (' + issues[i].assistEmail + '@gmail.com)</p>' +
											'<button class="btn btn-warning" onclick="setStatusClosed(\''+ issues[i].id +'\')">Close</button> ' +
											'<button class="btn btn-danger" onclick="deleteIssue(\''+ issues[i].id +'\')">Delete</button> ' +
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