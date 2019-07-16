fetch('events').then(function (r) {
    return r.json();
}).then(function (events) {
    console.log('events: ', events);
    //TODO - display events
    display(events);
});

//TODO - create display function
//TODO - parse every event and create row
//TODO - save every row in list of rows
//TODO - query and get empty table
//TODO - add list of rows to empty table
function display(events) {
    var list = events.map(function(event) {
        const date = event.date.replace('T', ' ').replace(':00.000Z', '');
        return `<tr data-id="${event.id}">
        <td>${event.name}</td>
        <td>${date}</td>
        <td>${event.needed}</td>
        <td>${event.applied}</td>
        <td>
            <button onClick="applyVolunteer(${event.id})" href="#" class="apply">Apply</a></button>
        </td>
    </tr>`;
    });
    document.querySelector("#event tbody").innerHTML = list.join("");
}


function applyVolunteer(eventId){
    //console.log('eventId: ', eventId);
    var input = document.getElementsByName('eventId')[0];
    input.value = eventId;
}