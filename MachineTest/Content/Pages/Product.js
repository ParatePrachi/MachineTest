$(document).ready(function () {
    getlist();
});
var saveproduct = function () {
    debugger

    $formData = new FormData();
    var img = document.getElementById("File1");;
    if (img.files.length > 0) {
        for (var i = 0; i < img.files.length; i++) {
            $formData.append('file-' + i, img.files[i]);
        }
    }

    var id = $("#hdnid").val();
    var name = $("#txtName").val();
    var amount = $("#txtAmount").val();
    var dis = $("#txtdis").val();

    $formData.append('Id', id);
    $formData.append('Name', name);
    $formData.append('Amount', amount);
    $formData.append('Description', dis);

    $.ajax({
        url: "/Product/SaveProduct",
        method: "post",
        data: $formData,
        contentType: "application/json;charset=utf-8",
        contentType: false,
        processData: false,
        success: function (response) {
            alert("Successfull");
        }
    });
}

var getlist = function () {
    debugger
    {
        $.ajax({
            url: "/Product/Getlist",
            method: "post",
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                tbl(response);
                //var html = "";
                //$.each(response.model, function (index, elementValue) {
                //    html += "<tr><td>" + elementValue.Id + "</td><td>" + elementValue.Name + "</td><td>" + elementValue.Amount + "</td><td>" + elementValue.Description + "</td><td>" + elementValue.Image + "</td></tr>"
                //});
                //$("#tblpro tbody").append(html);
            }
        });
    };
}
   
function tbl(response) {
    debugger;
    var datatableVariable = $("#tblProduct").DataTable(
        {
            "responsive": false, "lengthChange": true, "autoWidth": false,
            "deferRender": true,
            paging: true,
            searching: true,
            destroy: true,
            bottons: [

            ],
            initComplete: function () {
                //apply the search
                this.api()
                    .column()
                    .every(function () {
                        var that = this;

                        $('input', this.header()).on('keyup change clear', function () {
                            if (that.search() !== this.value) {
                                that.search(this.value).draw();
                            }
                        });
                    });
            },
            data: response.model,
            columns: [
                //{
                //    "data": "id", "title": "SNo",
                //    render: function (data, type, row, meta) {
                //        return meta.row + meta.settings._iDisplayStart + 1;
                //    }
                //},
                { 'data': 'Id', 'title': 'Id' },
                { 'data': 'Name', 'title': 'Name' },
                /* { 'data': 'Photo', 'title': 'Photo' },*/
                { 'data': 'Amount', 'title': 'Amount' },
                { 'data': 'Description', 'title': 'Description' },
                /* { 'data': 'Photo', 'title': 'Photo' },*/

                {
                    'title': 'photo',
                    "render": function (data, type, jsonresultrow, meta) {
                        return '<center><img src="../content/img/' + jsonresultrow.Image + '" style="height:80px;width:80px;"/></center>';
                    }
                },

                {
                    'data': null, title: 'Edit', wrap: true, "bAutoWidth": false, "render": function (item) {
                        /* return '<center><div class="btn-group"><button type="button" value="Delete" data-toggle="modal" onclick="DeleteRecord(' + "'" + item.Id + "'" + ')" value="0" class="btn btn-danger btn-sm "  id="btn-sa-confirm"><i class="nav-icon fas fa-trash">Delete</i></button></div>'+'<div class="btn-group"><button type="button" onclick="EditMethod(' + "'" + item.Id + "'" + ');" class="btn btn-secondary btn-sm"><i class="nav-icon fas fa-edit">Edit</i></button></div></center>'*/
                        return '<center><div class="btn-group">&nbsp;&nbsp;<button type="button" onclick="editproduct(' + "'" + item.Id + "'" +','+ "'" + item.Name + "'" +','+ "'" + item.Amount + "'" +','+ "'" +  item.Description + "'"+');" class="btn btn-primary btn-sm"><i class="nav-icon fas fa-edit">Edit</i></button>&nbsp;&nbsp;<button type="button" onclick="getdetails(' + "'" + item.Id + "'" + ');" class="btn btn-primary btn-sm"><i class="nav-icon fas fa-edit">Details</i></button></div></center>'
                    },
                },
            ]
        }).buttons().container().appendTo('#tblProduct_wrapper.col-md-6:eq(0)');

    return datatableVariable;

};
var editproduct = function (id, Name, Amount, Description) {
    debugger;
    var model = { Id: id };

    $.ajax({
        url: "/Product/EditProduct",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/Json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#hdnid").val(response.model.Id);
            $("#txtName").val(response.model.Name);
            $("#txtAmount").val(response.model.Amount);
            $("#txtdis").val(response.model.Description);
            $("#txtimg").val(response.model.Image);
        }
    });
}
var getdetails = function (Id) {
    var model = { Id: Id }
    $.ajax({
        url: "/Product/EditProduct",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#WriteToUsModal").modal('show');
            $("#idmod").empty();
            var html = "";
            html += "<div class='row'>";
            html += "<div class='col-sm-3'>";
            html += "<img src='../Content/img/" + response.model.Image + "'style='height: 100px; width: 120px;'/>";
            html += "</div>";
            html += "<div class='col-sm-6'>";
            html += "<label>Name :&nbsp<span>" + response.model.Name + "</span></label>";
            html += "</br>";
            html += "<label>Amount :&nbsp<span>" + response.model.Amount + "</span></label>";
            html += "</br>";
            html += "<label>Description :&nbsp<span>" + response.model.Description + "</span></label>";
            html += "</div>";
            html += "</div>";
            $("#idmod").append(html);
        }
    })
}