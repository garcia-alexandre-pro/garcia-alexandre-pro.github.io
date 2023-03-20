$(document).ready(function (e) {
    const rippleHtml = "<div class='ripple'><span class='ripple-circle'></span></div>";

    $(".btn").each(function (i, obj) {
        if ($(obj).children(".ripple").length === 0) {
            $(obj).append(rippleHtml);
        }
    });

    new MutationObserver(function (mutations) {
        var selector = ".btn";
        // look through all mutations that just occured
        for (var i = 0; i < mutations.length; ++i) {
            // look through all added nodes of this mutation
            for (var j = 0; j < mutations[i].addedNodes.length; ++j) {
                var target = mutations[i].addedNodes[j];

                if (target && target.nodeType === Node.ELEMENT_NODE) {
                    var children = $(target).find(selector);

                    if (target.matches(selector)) {
                        if ($(target).children(".ripple").length === 0) {
                            $(target).append(rippleHtml);
                        }
                    }
                    else if (children.length > 0) {
                        children.each(function () {
                            if ($(this).children(".ripple").length === 0) {
                                $(this).append(rippleHtml);
                            }
                        });
                    }
                }
            }
        }
    }).observe(document.querySelector("body"), {
        childList: true,
        subtree: true
    });

    new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === "class") {
                //var attributeValue = $(mutation.target).prop(mutation.attributeName);
                if ($(mutation.target).hasClass("btn") && $(mutation.target).children(".ripple").length === 0) {
                    $(mutation.target).append(rippleHtml);
                }
            }
        });
    }).observe(document.querySelector("body"), {
        attributes: true,
        attributeFilter: ["class"]
    });
});

(function ($, window, document, undefined) {
    $(document).on('click', '.btn', function (e) {
        var $ripple = $(this).find(".ripple");
        var $offset = $ripple.parent().offset();
        var $circle = $ripple.find('.ripple-circle');

        if ($ripple && $offset && $circle) {
            var x = e.pageX - $offset.left;
            var y = e.pageY - $offset.top;

            $circle.css({
                top: y + 'px',
                left: x + 'px'
            });

            $ripple.addClass('is-active');
        }
    });

    $(document).on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', '.ripple', function (e) {
        $(this).removeClass('is-active');
    });
})(jQuery, window, document);