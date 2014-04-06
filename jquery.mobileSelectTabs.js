/*
 * jQuery Mobile Select Tabs; v0.1
 * http://www.ashleyhitchcock.co.uk
 * Copyright (c) 2013 Ashley Hitchcock; licensed: Apache License
 */
! function (win, doc, $, console, undefined) {
    "use strict";

    var $win = $(win),
        $doc = $(doc);

    $.fn.mobileSelectTabs = function (options) {

        // Default options.
        var settings = $.extend({
            // These are the defaults.
            labelText: "view:",
            activeClass: ".active",
            snapPoint: 480
        }, options);

        var tabMenu = $(this);

        function changeMenu() {

            var winWidth = $win.width();

            if (winWidth < settings.snapPoint) {
                tabMenu.hide();
                $(".select-tabs-inserted").show();
            } else {
                tabMenu.show();
                $(".select-tabs-inserted").hide();
            }
        }

        //For each set of tabs
        this.each(function () {
            var tabs = $(this);
            //create form
            $("<form />").addClass("select-tabs-inserted").insertBefore(tabs);
            $("<fieldset />").appendTo(".select-tabs-inserted");

            var selectMenu = '<select></select>';

            if (settings.labelText !== '') {
                selectMenu = '<label class="control-label">' + settings.labelText + '</label><select></select>';
            }

            $(".select-tabs-inserted fieldset").append(selectMenu);

            var selectedItem;

            //Find each tab
            $(this).find(" li a").each(function () {
                var el = $(this);
                if (el.parent('li').hasClass(settings.activeClass)) {
                    selectedItem = el.text();
                }
                $("<option />", {
                    "value": el.attr("href"),
                    "text": el.text()
                }).appendTo(".select-tabs-inserted fieldset select");

            });

            //set selected tab
            $(".select-tabs-inserted fieldset select option").filter(function () {
                return $(this).text() === selectedItem;
            }).prop('selected', true);

        });

        //Bind to resize
        $win.bind("resize", changeMenu);
        //Set wheich menu is used
        changeMenu();
    };

    $doc.ready(function () {
        //hide tabs or select

        //If option selected go to tab or link
        $doc.on("change", ".property-tabs select", function () {

            var selectedItem = $(this).find("option:selected").val();

            // If tab goto it else goto link
            if (selectedItem.substring(0, 1) === "#") {
                //bootstrap tab change
                $('a[href="' + selectedItem + '"]').tab('show');
                return false;
            } else {
                window.location = selectedItem;
            }
        });
    });

}(window, document, window.jQuery, window.console);

// Usage example:
// $( ".tabs" ).mobileSelectTabs();