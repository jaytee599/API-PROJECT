$(document).ready(function () {
    $(".fa-bars").click(function () {
        $(this).toggleClass("fa-times");
        $(".navbar").toggleClass("nav-toggle");
    });

    $(window).on("load scroll", function () {
        $(".fa-bars").removeClass("fa-times");
        $(".navbar").removeClass("nav-toggle");

        if ($(window).scrollTop() > 30) {
            $("header").addClass("header-active");
        } else {
            $("header").removeClass("header-active");
        }

        $("section").each(function () {
            let id = $(this).attr("id");
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            if (top >= offset && top < offset + height) {
                $(".navbar ul li a").removeClass("active");
                $(".navbar")
                    .find('[data-scroll="' + id + '"]')
                    .addClass("active");
            }
        });
    });

    // Initialize the map once the Google Maps API is loaded
    window.initMap = async function() {
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        map = new Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });

        new AdvancedMarkerElement({
            map: map,
            position: { lat: -34.397, lng: 150.644 },
            title: "Hello World!",
        });
    };

    // Ensure the map is initialized only after the API script has loaded
    // (Do not call initMap here)
});


