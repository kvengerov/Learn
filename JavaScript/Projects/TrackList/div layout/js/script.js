$(function () {
		$('#btn').on('click', function () {
				var term = $('#artistName').val();
				$.ajax({
						url: 'https://itunes.apple.com/search?term=' + term + '&entity=song',
						type: 'GET',
						dataType: 'jsonp',
						success: function (result) {
								showResults(result);
						},
						error: function () {
								alert('Failed!');
						}
				});
		});
});

function showResults(json) {
		var milMin = 60000;
		var main = document.getElementById("divHead");
		var divHead =
				'<div class="table-item-row">' +
				'<div class="table-item left">Album Cover</div>' +
				'<div class="table-item">Artist</div>' +
				'<div class="table-item">Track</div>' +
				'<div class="table-item">Collection</div>' +
				'<div class="table-item">Genre</div>' +
				'<div class="table-item right"></div>' +
				'</div>';

		for (var i = 0; i < json.results.length; i++) {
				var result = json.results[i];
				$(
						'<div class="table-item-row acc-btn" id="content">' +
						'<div class="table-item left"><img src="' + result.artworkUrl100 + '"></div>' +
						'<div class="table-item">' + result.artistName + '</div>' +
						'<div class="table-item">' + result.trackName + '</div>' +
						'<div class="table-item">' + result.collectionName + '</div>' +
						'<div class="table-item">' + result.primaryGenreName + '</div>' +
						'<div class="table-item right"><i class="fa fa-arrow-down"></i></div>' +
						'</div>' +

						'<div class="collapse">' +
						"<div class='table-item-row' id='content'>" +
						'<div class="artist">' +
						'<p>' + result.artistName + " - " + result.trackName + '<i class="fa fa-music"></i><p>' +
						'</div>' +
						'<div class="info">' +
						'<div class="info-collection">' +
						'<ul>' +
						'<li><p><span>Collection: </span>' + result.collectionName + '</p></li>' +
						'<li><p><span>Track count: </span>' + result.trackCount + '</p></li>' +
						'<li><p><span>Price: </span>' + result.collectionPrice + " " + result.currency + '</p></li>' +
						'</ul>' +
						'</div>' +
						'<div class="info-track">' +
						'<ul>' +
						'<li><p><span>Track duration: </span>' + (result.trackTimeMillis / milMin).toFixed(2) + " min" + '</p></li>' +
						'<li><p><span>Track price: </span>' + result.trackPrice + " " + result.currency + '</p></li>' +
						'</ul>' +
						'</div>' +
						'</div>' +
						"</div>" +
						"</div>"
				).appendTo(main);
		}

		main.innerHTML = divHead + main.innerHTML;

		$('.acc-btn').click(function () {
				if ($(this).next().is(":hidden")) {
						$('.collapse').slideUp('selected');
						$(this).next().slideDown('selected');
				} else {
						$(this).next().slideUp('selected');
				}
				;
		});

}