(function () {
    var app;

    window.Tolls = {
        data: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "data/tolls.js",
                    type: "get",
                    dataType: "json"
                }
            },
            schema: {
                data: "tolls"
            }
        }),
        back: function () {
            app.navigate("#:back");
        },
        settings: function () {
            app.navigate("views/settings.html");
        }
    };

    document.addEventListener("deviceready", function () {
        navigator.splashscreen.hide();

        app = new kendo.mobile.Application(document.body, {
            layout: "main-layout",
            // 
            transition: "zoom"
            // transition: "fade"
        });
    }, false);

    window.app = app;
}());