
$(document).on('click', '.wk-order-detail', function() {

    $('.formReprint').show();

    var id_order = $('.reprint').data('idorder');
    // console.log('reprint id order ' +id_order);

    //le ponemos el id_order al campo form
    $('.orderId').val(id_order);

    //no necesario
    // $('.formReprint').addClass('formReprint_' + id_order);

});

$(document).on('submit', '.formReprint', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var url_action_reprint = $('#url_action_reprint').val();

    enviaEmail($(this), url_action_reprint);
});

function showSuccessMsg(msg) {
    growl.notice({ title: "", message: msg });
}

function enviaEmail(form, url_action_reprint) {

    // var textoAlta = [];
    // textoAlta[1] = 'Yippee! You will start receiving our announcements brimming with surprises!';

    var data = form.serialize();
    console.log('data del form '+data);

    $.ajax({
        type: 'POST',
        url: url_action_reprint,
        data : data,
        dataType: 'json',
    })
        .done(function (data) {
            if(data.status){
                console.log('status ' +data.status);
                showSuccessMsg(data.status);

                setTimeout(function() {
                    $('#reprintModal').modal('hide');
                }, 3000);
                
                // $('#reprintModal #email-reprint').val('');
            }
            
        })
        .fail(function () {
            console.log("Fallo en ajax!");
        })
        ;

}