$(function() {
    var searchField = $('#query');
    var icon = $('#search-btn');
    var q = $('#query').val();

    $('#search-btn').on('click', search);
    $('#search-form').submit(function(e) {
        e.preventDefault();
    });


    function search () {
        $('#results').html('');
        $('#buttons').html('');

        var q = $('#query').val();

        if ( q==="") {
            return alert("Заполните пожалуйста поле!");
        };

        $.get (
            "https://www.googleapis.com/youtube/v3/search",{
                part:'snippet, id',
                q: q,
                maxResults: 4,
                type: 'video',
                key: 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y'},
                function (data) {
                    var nextPageToken = data.nextPageToken;
                    var prevPageToken = data.prevPageToken;

                    console.log(data);

                    $.each(data.items, function(i, item) {
                        var output = getOutput(item);

                        $('#results').append(output);
                    });

                    var buttons = getButtons(prevPageToken, nextPageToken);

                    $('#buttons').append(buttons);
                    $('#next-button').on('click', nextPage);
                    $('#prev-button').on('click', prevPage);
                }
        );
    }


    function nextPage () {
        var token = $('#next-button').data('token');
        var q = $('#next-button').data('query');

        $('#results').html('');
        $('#buttons').html('');

        var q = $('#query').val();

        $.get (
            "https://www.googleapis.com/youtube/v3/search",{
                part:'snippet, id',
                q: q,
                pageToken: token,
                maxResults: 4,
                type: 'video',
                key: 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y'},
                function (data) {
                    var nextPageToken = data.nextPageToken;
                    var prevPageToken = data.prevPageToken;

                    console.log(data);

                    $.each(data.items, function(i, item) {
                        var output = getOutput(item);

                        $('#results').append(output);
                    });

                    var buttons = getButtons(prevPageToken, nextPageToken);

                    $('#buttons').append(buttons);
                    $('#next-button').on('click', nextPage);
                    $('#prev-button').on('click', prevPage);
                }
        );
    }

    function prevPage () {
        var token = $('#prev-button').data('token');
        var q = $('#prev-button').data('query');

        $('#results').html('');
        $('#buttons').html('');

        var q = $('#query').val();

        $.get (
            "https://www.googleapis.com/youtube/v3/search",{
                part:'snippet, id',
                q: q,
                pageToken: token,
                maxResults: 4,
                type: 'video',
                key: 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y'},
                function (data) {
                    var nextPageToken = data.nextPageToken;
                    var prevPageToken = data.prevPageToken;

                    console.log(data);

                    $.each(data.items, function(i, item) {
                        var output = getOutput(item);

                        $('#results').append(output);
                    });

                    var buttons = getButtons(prevPageToken, nextPageToken);

                    $('#buttons').append(buttons);
                    $('#next-button').on('click', nextPage);
                    $('#prev-button').on('click', prevPage);
                }
        );
    }

    function getOutput(item) {
        var videoId = item.id.videoId;
        var title = item.snippet.title;
        var description = item.snippet.description;
        var thumb = item.snippet.thumbnails.medium.url;
        var channelTitle = item.snippet.channelTitle;
        var videoDate = new Date(Date.parse(item.snippet.publishedAt));

        var output = '<li>' +
        '<div class="list-left">' +
        '<img src="'+thumb+'">' +
        '<h3><a clas="title" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
        '</div>' +
        '<div class="list-right">' +
        '<div class="main-part">Author: </div><span class="cTitle content">'+channelTitle+'</span><br><div class="wrapper"><div class="date-video main-part">Publication date: </div><span class="content">'+videoDate+'</span></div>' +
        '<div class="descr main-part">Description: </div><p class="content">'+description+'</p><br>' +
        '</div>' +
        '</li>' +
        '<div class="clearfix"></div>' +
        '';

        return output;
    };

    function getButtons(prevPageToken, nextPageToken) {
        if(!prevPageToken) {
            var btnoutput = '<div class="button-container">'+'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'">Next Page</button></div>';
        } else {
            var btnoutput = '<div class="button-container">'+
            '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'">Prev Page</button>' +
            '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'">Next Page</button></div>';
        }
        
        return btnoutput;
    };

});