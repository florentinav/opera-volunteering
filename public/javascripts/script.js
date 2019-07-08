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
        return `<tr data-id="${event.id}">
        <td>${event.name}</td>
        <td>${event.date}</td>
        <td>${event.needed}</td>
        <td>${event.applied}</td>
        <td>
                <button type="submit" a href="#" class="apply">Apply</a></button>
            </td>
    </tr>`;
    });
    document.querySelector("#event tbody").innerHTML = list.join("");
}

