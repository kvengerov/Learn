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
    var table = $('#table');
    table.addClass("table");
    table.html(
        "<tr style = 'font-weight: bold'>" +
        "<td align = 'center'>Album Cover</td>" +
        "<td align = 'center'>Artist</td>" +
        "<td align = 'center'>Track</td>" +
        "<td align = 'center'>Collection</td>" +
        "<td align = 'center'>Genre</td>" +
        "</tr>");
    for (var i = 0; i < json.results.length; i++)
        table.append("<tr id = 'row'>" +
            "<td align = 'center'><img src=" + json.results[i].artworkUrl100 + "></td>" +
            "<td align = 'center'>" + json.results[i].artistName + "</td>" +
            "<td align = 'center'>" + json.results[i].trackName + "</td>" +
            "<td align = 'center'>" + json.results[i].collectionName + "</td>" +
            "<td align = 'center'>" + json.results[i].primaryGenreName + "</td>" +
            "</tr>"
        )
}