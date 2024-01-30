/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.txt
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to a newer
 * versions in the future. If you wish to customize this module for your
 * needs please refer to CustomizationPolicy.txt file inside our module for more information.
 *
 * @author Webkul IN
 * @copyright Since 2010 Webkul
 * @license https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */

$(document).ready(function () {
    $('#calendar_form button[type="submit"]').on('click', function (elt) {
        if (elt.currentTarget.name !== "submitDateRange") {
            elt.preventDefault();
        }
    });
    google.charts.load('current', { 'packages': ['corechart'] });
    setDashboardGraph(graphData.sales, wkSalesGraphText, graphColors['sales']);
    $('.wkpos-sales').addClass('active');

    var type, contentType;
    $('.wk-dashboard-details').on('click', function () {
        // $('.wkpos-toggle-graph .btn').removeClass('btn-primary').addClass('btn-default');
        // $('#hidePrestashop').addClass('btn-primary');
        $('.wk-dashboard-details').removeClass('active');
        $(this).addClass('active');
        type = $(this).attr('data-type');
        contentType = $(this).attr('data-type-trans');
        setDashboardGraph(graphData[type], contentType, graphColors[type]);
        $('.wkpos-panel-heading').text(contentType);
    });

    $('#wk_selected_outlet').on('change', function () {
        $('form#calendar_form').append('<input type="hidden" name="changeOutlet" value="1">');
        $('form#calendar_form').submit();
    })

    function resize() {
        if (type == undefined) {
            type = 'sales';
            contentType = wkSalesGraphText;
        }
        setDashboardGraph(graphData[type], contentType, graphColors[type]);
    }
    if (window.addEventListener) {
        window.addEventListener('resize', resize);
    }
    else {
        window.attachEvent('onresize', resize);
    }

    if ($("#table-wkpos_order").length > 0) {
        $("#table-wkpos_order > thead > tr.nodrag.nodrop.filter.row_hover > th:nth-child(5) > input").attr('pattern', '[0-9]+([\.][0-9]{0,2})?').attr('title', 'Please enter numbers only.');
    }

});

function drawAreaChart(graphData, type, graphCol, dataType = false) {
    var data = google.visualization.arrayToDataTable(graphData);
    var options = {
        hAxis: {
            format: 'M/d/yy',
            title: graphData[0][0],
        },
        vAxis: {
            title: type,
            minValue: 0,
        },

        colors: graphCol
    };

    var chart = new google.visualization.AreaChart(document.getElementById('wkpos_dashboard_graph'));
    view = new google.visualization.DataView(data);
    if (!dataType) {
        dataType = $('.wkpos-toggle-graph .btn.btn-primary').data('type');
    }
    if (dataType == 'pos') {
        view.hideColumns([1]);
        options['colors'] = [graphCol[1]];
    } else if (dataType == 'ps') {
        view.hideColumns([2]);
        options['colors'] = [graphCol[0]];
    } else {
        options['colors'] = graphCol;
    }
    chart.draw(view, options);

    var hideSal = document.getElementById("hidePrestashop");
    if (typeof hideSal != 'undefined' && hideSal) {
        hideSal.onclick = function () {
            $('.wkpos-toggle-graph .btn').removeClass('btn-primary').addClass('btn-default');
            hideSal.classList.add("btn-primary");
            hideSal.classList.remove("btn-default");
            view = new google.visualization.DataView(data);
            view.hideColumns([1]);
            options['colors'] = [graphCol[1]];
            chart.draw(view, options);
        }
    }
    var hideExp = document.getElementById("hidePos");
    if (typeof hideExp != 'undefined' && hideExp) {
        hideExp.onclick = function () {
            $('.wkpos-toggle-graph .btn').removeClass('btn-primary').addClass('btn-default');
            hideExp.classList.add("btn-primary");
            hideExp.classList.remove("btn-default");
            view = new google.visualization.DataView(data);
            view.hideColumns([2]);
            options['colors'] = [graphCol[0]];
            chart.draw(view, options);
        }
    }

    var toggleSales = document.getElementById("togglePrestashop");
    var salesHidden = false;
    if (typeof toggleSales != 'undefined' && toggleSales) {
        toggleSales.onclick = function () {
            $('.wkpos-toggle-graph .btn').removeClass('btn-primary').addClass('btn-default');
            toggleSales.classList.add("btn-primary");
            toggleSales.classList.remove("btn-default");
            salesHidden = !salesHidden;
            view = new google.visualization.DataView(data);
            options['colors'] = graphCol;
            chart.draw(view, options);
        }
    }
}

function uppercase(str) {
    var array1 = str.split('_');
    var newarray1 = [];

    for (var x = 0; x < array1.length; x++) {
        newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
    }
    return newarray1.join(' ');
}

function setDashboardGraph(graphData, contentType, graphColors, dataType = false) {
    if (graphData.length > 1) {
        $("#hidePrestashop").show();
        $("#hidePos").show();
        $("#togglePrestashop").show();
        $('#wkpos_dashboard_graph').height('500px');
        google.charts.setOnLoadCallback(function () { drawAreaChart(graphData, contentType, graphColors, dataType); });
    } else {
        $('#wkpos_dashboard_graph').html('<div class="alert alert-info">' + noDataFound + '</div>');
        $('#wkpos_dashboard_graph').height('auto');
        $("#hidePrestashop").hide();
        $("#hidePos").hide();
        $("#togglePrestashop").hide();
    }
}
