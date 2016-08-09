(function () {
    var currentToll;
    window.TollDetail = {
        show: function () {
//            Pull the ISBN number from the query string
            var location = window.location.toString();
            var isbn = location.substring(location.lastIndexOf('?')+4);

//            Filter the DataSource bt ISBN to get the selected record
            window.Tolls.data.filter({ field: "isbn", operator: "eq", value: isbn });
            currentToll = window.Tolls.data.view()[0];

//            Create a model for the page and bind it to the view
            var toll = {
                title: currentToll.name + " by " + currentToll.author,
                image_url: currentToll.image_url,
                amazon_url: currentToll.amazon_url,
                is_favorite: currentToll.is_favorite
            };
            kendo.bind($('#tollContent'), toll, kendo.mobile.ui);
            // If the current toll is a favorited item, toggle the switch on the view
            if (currentToll.is_favorite) {
                $('#favorite').data('kendoMobileSwitch').toggle();
            }

        },
        hide: function () {
            // When the user navigates away from the page, remove the filter
            window.Tolls.data.filter([]);
        },
        openLink: function () {
            // Will use the Cordova InAppBrowser plugin when deployed to a device. Opens a new window in
            // the simulator
            window.open(currentToll.amazon_url, '_blank', 'location=yes');
        },
        setIsFavorite: function () {
            Tolls.data.fetch(function () {
                var dataItem = currentToll;

                // dataItem.set("is_favorite", !dataItem.get("is_favorite"));
                Tolls.data.sync();
            });
        }
    };
}());