$(document).ready(function () {
    function getUsers() {
        $.get('/getusers', function (data) {
            createTable('#table', data)
        })
    }
    getUsers();
    
    function createTable(element, mas) {
        $(element).empty();
        console.log(mas);
        $('<table>').addClass("table table-bordered table-primary col-6").appendTo(element);
        for (var i = 0; i < mas.length; i++) {
            $('<tr>').addClass('tr').appendTo('.table');
            for (var key in mas[i]) {
                $('<td>').addClass('td').appendTo('.tr:last').text(mas[i][key]);
            }
            $('.tr:last  .td:first').hide(); 
            $('<td>').appendTo('.tr:last'); 
            $('<button>').text('Delete').addClass('btn  btn-danger') .appendTo('td:last').click(function(){ 
                var  id=$(this).parent().parent().find('td:first').text(); 
                console.log(id); 
                deleteUser(id); }); 
            $('.tr:last  .td:first').hide(); 
            $('<td>').appendTo('.tr:last'); 
            $('<button>').text('Update').addClass('btn  btn-primary') .appendTo('td:last').click(function(){ 
                var userIndex =$(this).parent().parent().index();
                var user = mas[userIndex]; 
                UpdateAddButton(user); });
        }
    }

    function addUser(name, age) {
        if (!name || !age)
            return;
        var obj = {
            username: name,
            userage: age
        }
        $.post('/adduser', obj, function (data) {
            console.log(data);
            getUsers();
        })
    }
    
    function deleteUser(id) {
        var obj = { id: id };
        $.post('/deleteuser', obj, function (data) {
            console.log(data);
            getUsers();
        })
    }

    function updateUser(id,name, age) {
        if (!name || !age)
            return;
        var obj = {
            id: id,
            username: name,
            userage: age
        }
        $.post('/updateuser', obj, function (data) {
            console.log(data);
            getUsers();
        })
    }

    $(document).on("click", ".add", function() {
        var name = $('.name').val();
        var age = $('.age').val();
        $('.name').val("");
        $('.age').val("");
        addUser(name, age);
    });

    $(document).on("click", ".update", function() {
        var id = $('#Id').val();
        var name = $('.name').val();
        var age = $('.age').val();
        $('.name').val("");
        $('.age').val("");
        $('#CtrBtn').html('Add');
        $(".update").toggleClass("update add");
        updateUser(id,name, age);
        $('#Id').remove();
    });

    function UpdateAddButton(user){
        $('#CtrBtn').html('Update');
        $('.name').val(user['username']);
        $('.age').val(user['userage']);
        $('<input>').attr({
            type: 'hidden',
            id: 'Id'
        }).appendTo('.myform');
        $('#Id').val(user['_id'])
        $(".add").toggleClass("add update");
    }
})
