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
				'<div class="table-item">Album Cover</div>' +
				'<div class="table-item">Artist</div>' +
				'<div class="table-item">Track</div>' +
				'<div class="table-item">Collection</div>' +
				'<div class="table-item">Genre</div>' +
				'<div class="table-item"></div>' +
				'</div>';

		for (var i = 0; i < json.results.length; i++) {
				var result = json.results[i];

				var tBody = document.createElement("div");
				tBody.append(
						'<div class="table-item-row acc-btn" id="content">' +
						'<div class="table-item"><img src="' + result.artworkUrl100 + '"></div>' +
						'<div class="table-item">' + result.artistName + '</div>' +
						'<div class="table-item">' + result.trackName + '</div>' +
						'<div class="table-item">' + result.collectionName + '</div>' +
						'<div class="table-item">' + result.primaryGenreName + '</div>' +
						'<div class="table-item"><i class="fa fa-arrow-down"></i></div>' +
						'</div>' +
						"<div class='table-item-row collapse' id='content'>" +
						'<p>' + result.artistName + " - " + result.trackName + '<i class="fa fa-music"></i><p>' +
						'<ul>' +
						'<li><p><span>Collection: </span>' + result.collectionName + '</p></li>' +
						'<li><p><span>Track count: </span>' + result.trackCount + '</p></li>' +
						'<li><p><span>Price: </span>' + result.collectionPrice + " " + result.currency + '</p></li>' +
						'<li><p><span>Track duration: </span>' + (result.trackTimeMillis / milMin).toFixed(2) + " min" + '</p></li>' +
						'<li><p><span>Track price: </span>' + result.trackPrice + " " + result.currency + '</p></li>' +
						'</ul>' +
						"</div>"
				)
				main.appendChild(tBody);
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


