fetch('events').then(function (r){
    return r.json();
}).then(function(data){
    console.log('volunteers: ', data);
})