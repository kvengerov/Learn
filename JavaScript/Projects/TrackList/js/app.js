$(function() {
    $('#btn').on('click',function() {
        var term = $('#artistName').val();
        $.ajax( {
            url: 'https://itunes.apple.com/search?term='+term+'&entity=song',
            type: 'GET',
            dataType: 'jsonp',
            success: function(result) {
                showResults(result);
            },
            error: function() {
                alert('Failed!');
            }
        });
    });
});

function showResults(json){
    var milMin = 60000,
        table = $('#table');
    table.addClass("jAccordionTable table");
    table.html(
        "<thead>" +
            "<tr>" +
                "<th>Album Cover</th>" +
                "<th>Artist</th>" +
                "<th>Track</th>" +
                "<th>Collection</th>" +
                "<th>Genre</th>" +
                "<th></th>" +
            "</tr>" +
        "</thead>");
    for (var i = 0; i < json.results.length; i++)
        table.append(
            "<tbody>" +
                "<tr>" +
                    "<td><img src=" + json.results[i].artworkUrl100 + "></td>" +
                    "<td>" + json.results[i].artistName + "</td>" +
                    "<td>" + json.results[i].trackName + "</td>" +
                    "<td>" + json.results[i].collectionName + "</td>" +
                    "<td>" + json.results[i].primaryGenreName + "</td>" +
                    "<td><i class=\"fa fa-arrow-down\"></i></td>" +
                "</tr>" +
                "<tr class=\"collapse\">" +
                    "<td colspan = '6'>" +
                        "<div>" +
                            "<h3>" + json.results[i].artistName + " - " + json.results[i].trackName + " <i class=\"fa fa-music\"></i></h3>" +
                        "</div>" +
                        "<div class=\"info\">" +
                            "<div class=\"info-collection\">" +
                                "<p><span>Collection: </span>" + json.results[i].collectionName + "</p>" +
                                "<p><span>Track count: </span>" + json.results[i].trackCount + "</p>" +
                                "<p><span>Price: </span>" + json.results[i].collectionPrice + " " + json.results[i].currency + "</p>" +
                            "</div>" +
                            "<div class=\"info-track\">" +
                                "<p><span>Track duration: </span>" + (json.results[i].trackTimeMillis / milMin).toFixed(2) + " min" + "</p>" +
                                "<p><span>Track price: </span>" + json.results[i].trackPrice + " " + json.results[i].currency + "</p>" +
                            "</div>" +
                        "</div>" +
                    "</td>" +
                "</tr>" +
            "</tbody>"
        )
}

$('.jAccordionTable').each(accordionTable);

function accordionTable(i,elem) {
		var table = $(elem);
		var tbody = table.find('tbody');

		//accordion on tbody > tr
		tbody.find('tr:first').addClass("table-acc-header");
		tbody.find('tr:last').addClass("table-acc-body");
		$(".table-acc-header").click(function() {
				table.find(".table-acc-body").addClass("collapse");
				$(this).next(".table-acc-body").removeClass("collapse");
		});
}
